from api.deps import get_db, get_current_user
from fastapi import APIRouter
from typing import List
from fastapi import Depends, UploadFile, Form, File, BackgroundTasks
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from crud.crud_user import crud_user
from schemas.user import UserInDB, UserListing, UserUpdate, UserEmail, UserPasswordChange, AdminCounters, UserShort

router = APIRouter()


@router.get("/all/", response_model=UserListing, status_code=status.HTTP_200_OK)
def get_all_users(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    first_name: str = "",
    surname: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserListing:
    """
    Admin fetch users
    """

    return crud_user.get_all(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
        email=email,
        surname=surname,
        first_name=first_name,
    )


@router.get("/line-chart/", status_code=status.HTTP_200_OK)
def get_line_chart_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud_user.get_line_chart_data(db=db, current_user=current_user)


@router.get("/zaproszeni/", response_model=List[UserShort], status_code=status.HTTP_200_OK)
def get_my_zaproszeni(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud_user.get_my_zaproszeni(db=db, user_id=current_user.id)


@router.get("/zaproszeni/{user_id}/", response_model=List[UserShort], status_code=status.HTTP_200_OK)
def get_user_zaproszeni(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud_user.get_user_zaproszeni(db=db, current_user=current_user, user_id=user_id)


@router.get("/admin/", response_model=AdminCounters, status_code=status.HTTP_200_OK)
def get_admin_data(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_user.get_admin_data(db=db, current_user=current_user)


@router.get("/{user_id}/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Admin fetch users
    """

    return crud_user.get_by_id(db=db, current_user=current_user, id=user_id)


@router.post("/file/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def upload_user_file(
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Upload file user
    """
    return crud_user.upload_file(db=db, current_user=current_user, file=file, name=name)


@router.post("/file/{user_id}/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def upload_user_file_as_admin(
    user_id: int,
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Upload file user
    """
    return crud_user.upload_file_as_admin(db=db, current_user=current_user, user_id=user_id, file=file, name=name)


@router.post("/change_password/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def change_user_password(
    user_in: UserPasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Admin fetch users
    """

    return crud_user.change_password(db=db, user_in=user_in, current_user=current_user)


@router.post("/verification-email/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def send_email_again(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Admin fetch users
    """

    return crud_user.send_verification_email(db=db, background_tasks=background_tasks, current_user=current_user)


@router.post("/verification/", response_model=bool, status_code=status.HTTP_200_OK)
def do_verificate(
    email: UserEmail,
    db: Session = Depends(get_db),
) -> UserInDB:
    """
    Admin fetch users
    """

    return crud_user.do_verificate(db=db, email=email.email)


@router.put("/activate/{user_id}/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def user_activate_user(
    user_id: int,
    db: Session = Depends(get_db),
) -> UserInDB:
    """
    Admin update user
    """

    return crud_user.activate_user(db=db, user_id=user_id)


@router.put("/{user_id}/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def update_user_by_admin(
    user_id: int,
    obj_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Admin update user
    """

    return crud_user.update_as_admin(db=db, current_user=current_user, user_id=user_id, obj_in=obj_in)


@router.put("/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def update_user(
    obj_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    User update user
    """

    return crud_user.update(db=db, db_obj=current_user, obj_in=obj_in)


@router.delete("/{user_id}/", response_model=UserInDB, status_code=status.HTTP_200_OK)
def delete_user_by_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserInDB:
    """
    Admin delete user
    """

    return crud_user.delete(db=db, current_user=current_user, user_id=user_id)
