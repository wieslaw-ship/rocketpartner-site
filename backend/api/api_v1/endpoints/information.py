from api.deps import get_db, get_current_user
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from crud.crud_information import crud_information
from schemas.information import (
    InformationCreate,
    InformationInDB,
    InformationListing,
    InformationUpdate,
)

router = APIRouter()


@router.get("/all/", response_model=InformationListing, status_code=status.HTTP_200_OK)
def get_all_informations(
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InformationListing:
    """
    Admin fetch informations
    """

    return crud_information.get_all(
        db=db,
        limit=limit,
        offset=offset,
    )


@router.get("/{info_id}/", response_model=InformationInDB, status_code=status.HTTP_200_OK)
def get_single_info(
    info_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InformationInDB:
    """
    Fetch single information from database
    """

    return crud_information.get_or_404(db=db, id=info_id)


@router.post("/", response_model=InformationInDB, status_code=status.HTTP_200_OK)
def create_information_by_admin(
    obj_in: InformationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InformationInDB:
    """
    Admin create information
    """

    return crud_information.create(db=db, current_user=current_user, obj_in=obj_in)


@router.put("/{information_id}/", response_model=InformationInDB, status_code=status.HTTP_200_OK)
def update_information_by_admin(
    information_id: int,
    obj_in: InformationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InformationInDB:
    """
    Admin update user
    """

    return crud_information.update(db=db, current_user=current_user, information_id=information_id, obj_in=obj_in)


@router.delete("/{information_id}/", response_model=InformationInDB, status_code=status.HTTP_200_OK)
def delete_information_by_admin(
    information_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InformationInDB:
    """
    Admin delete information
    """

    return crud_information.delete(db=db, current_user=current_user, information_id=information_id)
