from api.deps import get_db, get_current_user
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from crud.crud_income import crud_income
from schemas.income import IncomeCreate, IncomeInDB, IncomeListing, IncomeUpdate

router = APIRouter()


@router.get("/", response_model=IncomeListing, status_code=status.HTTP_200_OK)
def get_my_income(
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeListing:
    """
    Admin fetch users
    """

    return crud_income.get_my_incomes(db=db, current_user=current_user, limit=limit, offset=offset)


@router.get("/all/", response_model=IncomeListing, status_code=status.HTTP_200_OK)
def get_all_incomes(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeListing:
    """
    Admin fetch users
    """

    return crud_income.get_all(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
        email=email,
    )


@router.get("/{income_id}/", response_model=IncomeInDB, status_code=status.HTTP_200_OK)
def get_all_users(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeInDB:
    """
    Get car by id
    """

    return crud_income.get_income_by_id(db=db, current_user=current_user, income_id=income_id)


@router.get("/user/{user_id}/", response_model=IncomeListing, status_code=status.HTTP_200_OK)
def get_user_income(
    user_id: int,
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeListing:
    """
    Admin fetch users
    """

    return crud_income.get_by_user_id(db=db, current_user=current_user, user_id=user_id, limit=limit, offset=offset)


@router.post("/{user_id}/", response_model=IncomeInDB, status_code=status.HTTP_200_OK)
def create_income_by_admin(
    user_id: int,
    obj_in: IncomeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeInDB:
    """
    Admin update user
    """

    return crud_income.create(db=db, current_user=current_user, user_id=user_id, obj_in=obj_in)


@router.put("/{income_id}/", response_model=IncomeInDB, status_code=status.HTTP_200_OK)
def update_income_by_admin(
    income_id: int,
    obj_in: IncomeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeInDB:
    """
    Admin update user
    """

    return crud_income.update(db=db, current_user=current_user, income_id=income_id, obj_in=obj_in)


@router.delete("/{income_id}/", response_model=IncomeInDB, status_code=status.HTTP_200_OK)
def delete_user_by_admin(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> IncomeInDB:
    """
    Admin delete car
    """

    return crud_income.delete(db=db, current_user=current_user, income_id=income_id)
