from crud.crud_car import crud_car
from typing import List
from api.deps import get_db, get_current_user
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from schemas.car import CarInDB, CarListing, CarUpdate

router = APIRouter()


@router.get("/", response_model=List[CarInDB], status_code=status.HTTP_200_OK)
def get_my_cars(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[CarInDB]:
    """
    Admin fetch users
    """

    return crud_car.get_my_cars(
        db=db,
        current_user=current_user,
    )


@router.get("/all/", response_model=CarListing, status_code=status.HTTP_200_OK)
def get_all_users(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    registration_number: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarListing:
    """
    Admin fetch users
    """

    return crud_car.get_all(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
        email=email,
        registration_number=registration_number,
    )


@router.get("/{car_id}/", response_model=CarInDB, status_code=status.HTTP_200_OK)
def get_car_by_id(
    car_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarInDB:
    """
    Get car by id
    """

    return crud_car.get_car_by_id(db=db, current_user=current_user, car_id=car_id)


@router.get("/user/{user_id}/", response_model=List[CarInDB], status_code=status.HTTP_200_OK)
def get_user_cars(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[CarInDB]:
    """
    Admin fetch users
    """

    return crud_car.get_by_user_id(
        db=db,
        current_user=current_user,
        user_id=user_id,
    )


@router.post("/", response_model=CarInDB, status_code=status.HTTP_200_OK)
def create_car(
    obj_in: CarUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarInDB:
    """
    Admin update user
    """

    return crud_car.create(db=db, user_id=current_user.id, obj_in=obj_in)


@router.post("/{user_id}/", response_model=CarInDB, status_code=status.HTTP_200_OK)
def create_car_as_admin(
    user_id: int,
    obj_in: CarUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarInDB:
    """
    Admin update user
    """
    return crud_car.create_as_admin(db=db, current_user=current_user, user_id=user_id, obj_in=obj_in)


@router.put("/{car_id}/", response_model=CarInDB, status_code=status.HTTP_200_OK)
def update_car_by_admin(
    car_id: int,
    obj_in: CarUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarInDB:
    """
    Admin update user
    """

    return crud_car.update(db=db, current_user=current_user, car_id=car_id, obj_in=obj_in)


@router.delete("/{car_id}/", response_model=CarInDB, status_code=status.HTTP_200_OK)
def delete_user_by_admin(
    car_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CarInDB:
    """
    Admin delete car
    """

    return crud_car.delete(db=db, current_user=current_user, car_id=car_id)
