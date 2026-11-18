from crud.crud_document import crud_document
from typing import List
from api.deps import get_db, get_current_user
from fastapi import APIRouter, UploadFile, Form, File
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from schemas.document import DocumentInDB, DocumentListing

router = APIRouter()


@router.get("/", response_model=List[DocumentInDB], status_code=status.HTTP_200_OK)
def get_my_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[DocumentInDB]:
    """
    User fetch my documents
    """

    return crud_document.get_my_documents(
        db=db,
        current_user=current_user,
    )


@router.get("/all/", response_model=DocumentListing, status_code=status.HTTP_200_OK)
def get_all_documents(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentListing:
    """
    Admin fetch documents
    """

    return crud_document.get_all(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
        email=email,
    )


@router.get("/{document_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def get_document_by_id(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Get document by id
    """

    return crud_document.get_by_id(db=db, current_user=current_user, id=document_id)


@router.get("/accept/{document_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def accept_document_as_admin(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud_document.accept_document(db=db, current_user=current_user, document_id=document_id)


@router.get("/user/{user_id}/", response_model=List[DocumentInDB], status_code=status.HTTP_200_OK)
def get_user_cars(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[DocumentInDB]:
    """
    Admin fetch documents
    """

    return crud_document.get_by_user_id(
        db=db,
        current_user=current_user,
        user_id=user_id,
    )


@router.post("/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def create_document(
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Admin update document
    """

    return crud_document.uploadDocument(db=db, current_user=current_user, file=file, name=name)


@router.post("/{user_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def create_document_as_admin(
    user_id: int,
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Admin update document
    """
    return crud_document.uploadDocument_as_admin(
        db=db, current_user=current_user, user_id=user_id, file=file, name=name
    )


@router.put("/{document_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def update_document(
    document_id: int,
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Admin update document
    """

    return crud_document.update_document(
        db=db, current_user=current_user, document_id=document_id, file=file, name=name
    )


@router.put("/admin/{document_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def update_document_as_admin(
    document_id: int,
    file: UploadFile = File(...),
    name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Admin update document
    """

    return crud_document.update_document_as_admin(
        db=db, current_user=current_user, document_id=document_id, file=file, name=name
    )


@router.delete("/{document_id}/", response_model=DocumentInDB, status_code=status.HTTP_200_OK)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentInDB:
    """
    Admin delete document
    """

    return crud_document.delete(db=db, current_user=current_user, document_id=document_id)
