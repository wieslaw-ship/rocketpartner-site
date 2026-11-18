from api.deps import get_db, get_current_user
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from crud.crud_paycheck import crud_paycheck
from schemas.paycheck import PaycheckCreate, PaycheckUpdate, PaycheckInDB, PaycheckListing

router = APIRouter()


@router.get("/", response_model=PaycheckListing, status_code=status.HTTP_200_OK)
def get_my_paychecks(
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckListing:
    """
    Admin fetch users
    """

    return crud_paycheck.get_my_paychecks(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
    )


@router.get("/all/", response_model=PaycheckListing, status_code=status.HTTP_200_OK)
def get_all_paychecks(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckListing:
    """
    Admin fetch users
    """

    return crud_paycheck.get_all(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
        email=email,
    )


@router.get("/{paycheck_id}/", response_model=PaycheckInDB, status_code=status.HTTP_200_OK)
def get_all_users(
    paycheck_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckInDB:
    """
    Get car by id
    """

    return crud_paycheck.get_paycheck_by_id(db=db, current_user=current_user, paycheck_id=paycheck_id)


@router.get("/user/{user_id}/", response_model=PaycheckListing, status_code=status.HTTP_200_OK)
def get_paychech_by_user_id(
    user_id: int,
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckListing:
    """
    Get car by id
    """

    return crud_paycheck.get_by_user_id(
        db=db,
        current_user=current_user,
        user_id=user_id,
        limit=limit,
        offset=offset,
    )


@router.post("/{user_id}/", response_model=PaycheckInDB, status_code=status.HTTP_200_OK)
def create_paycheck_by_admin(
    user_id: int,
    obj_in: PaycheckCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckInDB:
    """
    Admin create paycheck
    """

    return crud_paycheck.create(db=db, current_user=current_user, user_id=user_id, obj_in=obj_in)


@router.put("/{paycheck_id}/", response_model=PaycheckInDB, status_code=status.HTTP_200_OK)
def update_paycheck_admin(
    paycheck_id: int,
    obj_in: PaycheckUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckInDB:
    """
    Admin update user
    """

    return crud_paycheck.update(db=db, current_user=current_user, paycheck_id=paycheck_id, obj_in=obj_in)


@router.delete("/{paycheck_id}/", response_model=PaycheckInDB, status_code=status.HTTP_200_OK)
def delete_user_by_admin(
    paycheck_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PaycheckInDB:
    """
    Admin delete car
    """

    return crud_paycheck.delete(db=db, current_user=current_user, paycheck_id=paycheck_id)
