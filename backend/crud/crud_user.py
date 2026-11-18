from typing import Any, Dict, Optional, Union
from datetime import date
from fastapi import UploadFile, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func
import logging

from crud.base import CRUDBase
from models.user import User
from models.car import Car
from core.exceptions import (
    ValidationError,
    user_username_exists,
    something_went_wrong,
    object_does_not_exist,
    missmatched_password,
)
from core.file_validator import validate_file, sanitize_filename
from core.helpers import remove_single_file, get_random_string, save_image
from core.auth import get_password_hash, verify_password
from core.email import send_email_new_password, new_user_email
from schemas.user import (
    UserCreate,
    UserUpdate,
    UserInDB,
    UserListing,
    UserEmail,
    AdminCounters,
    UserPasswordChange,
)

logger = logging.getLogger(__name__)

ALLOWED_UPLOAD_FIELDS = {'profile_photo', 'document', 'id_photo', 'license_photo'}

class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(func.lower(User.email) == func.lower(email)).first()

    def get_by_id(self, db: Session, current_user: User, id: int):
        self.check_if_user_is_admin(user=current_user)
        return super().get_or_404(db=db, id=id)

    def get_my_zaproszeni(self, db: Session, user_id: int):
        return db.query(User).filter(User.ref_user == user_id).all()

    def get_user_zaproszeni(self, db: Session, current_user: User, user_id: int):
        self.check_if_user_is_admin(user=current_user)
        return self.get_my_zaproszeni(db=db, user_id=user_id)

    def upload_file_as_admin(self, db: Session, current_user: User, user_id: int, file: UploadFile, name: str) -> User:
        db_obj = self.get_by_id(db=db, current_user=current_user, id=user_id)
        if hasattr(User, name):
            previous = getattr(db_obj, name)
            if previous:
                remove_single_file(previous)
            setattr(db_obj, name, file)
            db.add(db_obj)
            db.commit()
            return db_obj
        raise something_went_wrong()

    def upload_file(self, db: Session, current_user: User, file: UploadFile, name: str) -> User:
        """
        Upload and save user file securely.

        ✅ SECURITY FEATURES:
        - File type whitelist validation
        - File size limit (5MB max)
        - MIME type verification
        - Filename sanitization
        - Path traversal prevention
        - Attribute name validation
        - Database transaction safety
        """

        # 1. VALIDATE UPLOAD FIELD NAME
        if name not in ALLOWED_UPLOAD_FIELDS:
            raise ValidationError(
                detail=f"Invalid upload field: {name}. Allowed: {', '.join(ALLOWED_UPLOAD_FIELDS)}",
                error_code="INVALID_FIELD"
            )

        # 2. CHECK IF ATTRIBUTE EXISTS ON USER MODEL
        if not hasattr(User, name):
            raise ValidationError(
                detail=f"User model has no attribute: {name}",
                error_code="INVALID_ATTRIBUTE"
            )

        # 3. VALIDATE AND SAVE FILE
        try:
            file_path = save_image(file, current_user.id)
        except ValidationError:
            raise  # Re-raise validation errors as-is
        except Exception as e:
            logger.error(f"File upload error for user {current_user.id}: {str(e)}")
            raise ValidationError(
                detail="Error processing file",
                error_code="FILE_UPLOAD_ERROR"
            )

        # 4. DELETE PREVIOUS FILE IF EXISTS
        previous = getattr(current_user, name, None)
        if previous:
            try:
                remove_single_file(previous)
            except Exception as e:
                logger.warning(f"Failed to remove previous file for user {current_user.id}: {str(e)}")
                # Don't fail - old file cleanup is non-critical

        # 5. UPDATE USER RECORD
        setattr(current_user, name, file_path)

        # 6. SAVE TO DATABASE
        try:
            db.add(current_user)
            db.commit()
            db.refresh(current_user)
            logger.info(f"File uploaded successfully for user {current_user.id} to field {name}")
        except Exception as e:
            db.rollback()
            logger.error(f"Database error saving file for user {current_user.id}: {str(e)}")

            # Clean up uploaded file if DB transaction failed
            try:
                import os
                if os.path.exists(file_path):
                    os.remove(file_path)
                    logger.info(f"Cleaned up file after failed DB save: {file_path}")
            except Exception as cleanup_error:
                logger.warning(f"Failed to cleanup file {file_path}: {cleanup_error}")

            raise ValidationError(
                detail="Error saving file to database",
                error_code="DB_SAVE_ERROR"
            )

        return current_user

    def get_all(
        self,
        db: Session,
        current_user: User,
        limit: int,
        offset: int,
        email: Optional[str],
        first_name: Optional[str],
        surname: Optional[str],
    ):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(User)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))
        if first_name:
            result = result.filter(User.first_name.ilike(f"%{first_name}%"))
        if surname:
            result = result.filter(User.surname.ilike(f"%{surname}%"))
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(User.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for user in queryset:
            users.append(UserInDB(**user.__dict__))
        return UserListing(counter=total_pages, items=users)

    def create(self, db: Session, background_tasks: BackgroundTasks, obj_in: UserCreate) -> User:
        create_data = obj_in.dict()
        create_data.pop("password")
        create_data.pop("ref_link")
        exists = self.get_by_email(db=db, email=obj_in.email)
        if exists:
            raise user_username_exists()
        db_obj = User(**create_data)
        db_obj.hashed_password = get_password_hash(obj_in.password)
        if obj_in.ref_link:
            _user = db.query(User).filter(User.unique_code == obj_in.ref_link).first()
            if _user:
                db_obj.ref_user = _user.id
        db_obj.unique_code = get_random_string(12)
        db_obj.is_admin = True
        db.add(db_obj)
        db.commit()
        new_user_email(email=db_obj.email, background_tasks=background_tasks)
        return db_obj

    def update(self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if obj_in.email != db_obj.email:
            exists = self.get_by_email(db=db, email=obj_in.email)
            if exists:
                raise user_username_exists()

        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def update_as_admin(
        self,
        db: Session,
        *,
        current_user: User,
        user_id: int,
        obj_in: Union[UserUpdate, Dict[str, Any]],
    ) -> User:
        db_obj = self.get_or_404(db=db, id=user_id)
        self.check_if_user_is_admin(user=current_user)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if obj_in.email != db_obj.email:
            exists = self.get_by_email(db=db, email=obj_in.email)
            if exists:
                raise user_username_exists()

        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def is_superuser(self, user: User) -> bool:
        return user.is_admin

    def delete(self, db: Session, current_user: User, user_id: int):
        self.check_if_user_is_admin(user=current_user)
        user = self.get_or_404(db=db, id=user_id)
        db.delete(user)
        db.commit()
        return user

    def reset_user_password(self, db: Session, user_in: UserEmail, background_tasks: BackgroundTasks):
        user = self.get_by_email(db=db, email=user_in.email)
        if not user:
            raise object_does_not_exist()
        new_password = get_random_string(8)
        user.hashed_password = get_password_hash(new_password)
        send_email_new_password(password=new_password, email=user.email, background_tasks=background_tasks)
        db.add(user)
        db.commit()
        return user

    def activate_user(self, db: Session, user_id: int):
        user = self.get_or_404(db=db, id=user_id)
        user.email_verified = True
        db.add(user)
        db.commit()
        return user

    def send_verification_email(self, db: Session, current_user: User, background_tasks: BackgroundTasks):
        new_user_email(email=current_user.email, background_tasks=background_tasks)
        return current_user

    def do_verificate(self, db: Session, email: str):
        user = self.get_by_email(db=db, email=email)
        if not user:
            raise object_does_not_exist()
        user.email_verified = True
        db.add(user)
        db.commit()
        return True

    def change_password(self, db: Session, current_user: User, user_in: UserPasswordChange) -> User:
        if not verify_password(user_in.password, current_user.hashed_password):
            raise missmatched_password()
        current_user.hashed_password = get_password_hash(user_in.new_password)
        db.add(current_user)
        db.commit()
        return current_user

    def get_line_chart_data(self, db: Session, current_user: User):
        self.check_if_user_is_admin(user=current_user)
        start_date = date.today().replace(day=1).replace(month=1)
        orders_data = [0 for _ in range(1, 13)]

        users_data = (
            db.query(User.date_created)
            .filter(User.date_created >= start_date)  # noqa
            .group_by(User.date_created)
            .all()
        )
        for el in users_data:
            orders_data[el[0].month - 1] += 1
        return orders_data

    def get_admin_data(self, db: Session, current_user: User) -> AdminCounters:
        self.check_if_user_is_admin(user=current_user)
        users = db.query(User).count()
        cars = db.query(Car).count()
        return AdminCounters(users=users, cars=cars)

    def calculate_money(self, db: Session, user_id: int):
        # Calculate user balance
        user = self.get_or_404(db=db, id=user_id)
        _income_netto = 0
        _income_gross = 0
        _sum_vat = 0
        _sum_commission = 0
        _sum_paycheck = 0
        przychody = user.income
        for i in przychody:
            _income_netto += i.netto if i.netto else 0
            _income_gross += i.gross if i.gross else 0
            _sum_vat += i.gross if i.gross else 0 - i.netto if i.netto else 0
        wyplaty = user.paychecks
        for j in wyplaty:
            _sum_commission += j.comission if j.comission else 0
            _sum_commission += j.monthly_comission if j.monthly_comission else 0
            _sum_paycheck += j.withdraw if j.withdraw else 0
        user.income_netto = _income_netto
        user.income_gross = _income_gross
        user.sum_commission = _sum_commission
        user.sum_paycheck = _sum_paycheck
        user.sum_vat = _sum_vat
        user.balance = _income_netto - _sum_paycheck
        db.add(user)
        db.commit()
        return user


crud_user = CRUDUser(User)
