from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.user import User
from fastapi.encoders import jsonable_encoder
from models.paycheck import Paycheck
from core.exceptions import no_permission
from schemas.paycheck import PaycheckInDB, PaycheckUpdate, PaycheckCreate, PaycheckListing
from crud.crud_user import crud_user


class CRUDPaycheck(CRUDBase[Paycheck, PaycheckCreate, PaycheckUpdate]):
    def get_all(self, db: Session, current_user: User, limit: int, offset: int, email: Optional[str]):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Paycheck, User).join(Paycheck.user)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))

        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Paycheck.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for paycheck, user in queryset:
            users.append(PaycheckInDB(**paycheck.__dict__, email=user.email))
        return PaycheckListing(counter=total_pages, items=users)

    def get_paycheck_by_id(self, db: Session, current_user: User, paycheck_id: int):
        db_obj = self.get_or_404(db=db, id=paycheck_id)
        self.check_if_user_is_admin(user=current_user)
        return db_obj

    def get_by_user_id(self, db: Session, current_user: User, user_id: int, limit: int, offset: int):
        if not current_user.id == user_id:
            self.check_if_user_is_admin(user=current_user)
        result = db.query(Paycheck).filter(Paycheck.user_id == user_id)
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Paycheck.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for paycheck in queryset:
            users.append(PaycheckInDB(**paycheck.__dict__))
        return PaycheckListing(counter=total_pages, items=users)

    def get_my_paychecks(self, db: Session, current_user: User, limit: int, offset: int):
        return self.get_by_user_id(
            db=db, current_user=current_user, user_id=current_user.id, limit=limit, offset=offset
        )

    def create(
        self, db: Session, current_user: User, user_id: int, obj_in: Union[PaycheckCreate, Dict[str, Any]]
    ) -> User:
        self.check_if_user_is_admin(user=current_user)
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Paycheck(**obj_in_data)  # type: ignore
        db_obj.user_id = user_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        crud_user.calculate_money(db=db, user_id=user_id)
        return db_obj

    def update(
        self, db: Session, current_user: User, paycheck_id: int, obj_in: Union[PaycheckUpdate, Dict[str, Any]]
    ) -> User:
        db_obj = self.get_or_404(db=db, id=paycheck_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            super().update(db=db, db_obj=db_obj, obj_in=obj_in)
            crud_user.calculate_money(db=db, user_id=db_obj.user_id)
            return db_obj
        raise no_permission()

    def delete(self, db: Session, current_user: User, paycheck_id: int):
        db_obj = self.get_or_404(db=db, id=paycheck_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            db.delete(db_obj)
            db.commit()
            crud_user.calculate_money(db=db, user_id=db_obj.user_id)
            return db_obj
        raise no_permission()


crud_paycheck = CRUDPaycheck(Paycheck)
