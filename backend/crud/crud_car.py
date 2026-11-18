from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models.user import User
from models.car import Car
from core.exceptions import no_permission
from schemas.car import CarCreate, CarInDB, CarListing, CarUpdate


class CRUDCar(CRUDBase[Car, CarCreate, CarUpdate]):
    def get_all(
        self,
        db: Session,
        current_user: User,
        limit: int,
        offset: int,
        email: Optional[str],
        registration_number: Optional[str],
    ):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Car, User).join(Car.user)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))
        if registration_number:
            result = result.filter(Car.registration_number.ilike(f"%{registration_number}%"))
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Car.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for car, user in queryset:
            users.append(CarInDB(**car.__dict__, email=user.email))
        return CarListing(counter=total_pages, items=users)

    def get_car_by_id(self, db: Session, current_user: User, car_id: int):
        result = self.get_or_404(db=db, id=car_id)
        if result.user_id == current_user.id or current_user.is_admin:
            return result
        raise no_permission()

    def get_by_user_id(self, db: Session, current_user: User, user_id: int):
        if current_user.id != user_id:
            self.check_if_user_is_admin(user=current_user)
        return db.query(Car).filter(Car.user_id == user_id).all()

    def get_my_cars(self, db: Session, current_user: User):
        return self.get_by_user_id(db=db, current_user=current_user, user_id=current_user.id)

    def create(self, db: Session, user_id: int, obj_in: CarCreate) -> Car:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Car(**obj_in_data)
        db_obj.user_id = user_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_as_admin(self, db: Session, current_user: User, user_id: int, obj_in: CarCreate) -> Car:
        self.check_if_user_is_admin(user=current_user)
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Car(**obj_in_data)
        db_obj.user_id = user_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, current_user: User, car_id: int, obj_in: Union[CarUpdate, Dict[str, Any]]) -> User:
        db_obj = self.get_or_404(db=db, id=car_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            return super().update(db=db, db_obj=db_obj, obj_in=obj_in)
        raise no_permission()

    def delete(self, db: Session, current_user: User, car_id: int):
        db_obj = self.get_or_404(db=db, id=car_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            db.delete(db_obj)
            db.commit()
            return db_obj
        raise no_permission()


crud_car = CRUDCar(Car)
