from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models.user import User
from models.income import Income
from core.exceptions import no_permission
from schemas.income import IncomeCreate, IncomeInDB, IncomeListing, IncomeUpdate
from crud.crud_user import crud_user


class CRUDIncome(CRUDBase[Income, IncomeCreate, IncomeUpdate]):
    def get_all(self, db: Session, current_user: User, limit: int, offset: int, email: Optional[str]):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Income, User).join(Income.user)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))

        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Income.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for income, user in queryset:
            users.append(IncomeInDB(**income.__dict__, email=user.email))
        return IncomeListing(counter=total_pages, items=users)

    def get_by_user_id(self, db: Session, current_user: User, user_id: int, limit: int, offset: int):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Income).filter(Income.user_id == user_id)
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Income.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for income in queryset:
            users.append(IncomeInDB(**income.__dict__))
        return IncomeListing(counter=total_pages, items=users)

    def get_my_incomes(self, db: Session, current_user: User, limit: int, offset: int):
        result = db.query(Income).filter(Income.user_id == current_user.id)
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Income.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for income in queryset:
            users.append(IncomeInDB(**income.__dict__))
        return IncomeListing(counter=total_pages, items=users)

    def get_income_by_id(self, db: Session, current_user: User, income_id: int):
        self.check_if_user_is_admin(user=current_user)
        return self.get_or_404(db=db, id=income_id)

    def create(
        self, db: Session, current_user: User, user_id: int, obj_in: Union[IncomeCreate, Dict[str, Any]]
    ) -> User:
        self.check_if_user_is_admin(user=current_user)
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Income(**obj_in_data)  # type: ignore
        db_obj.user_id = user_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        crud_user.calculate_money(db=db, user_id=user_id)
        return db_obj

    def update(
        self, db: Session, current_user: User, income_id: int, obj_in: Union[IncomeUpdate, Dict[str, Any]]
    ) -> User:
        db_obj = self.get_or_404(db=db, id=income_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            super().update(db=db, db_obj=db_obj, obj_in=obj_in)
            crud_user.calculate_money(db=db, user_id=db_obj.user_id)
            return db_obj

        raise no_permission()

    def delete(self, db: Session, current_user: User, income_id: int):
        db_obj = self.get_or_404(db=db, id=income_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            db.delete(db_obj)
            db.commit()
            crud_user.calculate_money(db=db, user_id=db_obj.user_id)
            return db_obj
        raise no_permission()


crud_income = CRUDIncome(Income)
