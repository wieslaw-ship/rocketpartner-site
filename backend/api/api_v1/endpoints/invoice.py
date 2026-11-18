from api.deps import get_db, get_current_user
from fastapi import APIRouter
from fastapi import Depends, File, UploadFile
from sqlalchemy.orm import Session
from starlette import status
from models.user import User
from crud.crud_invoice import crud_invoice
from schemas.invoice import InvoiceCreate, InvoiceUpdate, InvoiceListing, InvoiceInDB

router = APIRouter()


@router.get("/", response_model=InvoiceListing, status_code=status.HTTP_200_OK)
def get_my_invoices(
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceListing:
    """
    Admin fetch users
    """

    return crud_invoice.get_my_invoices(
        db=db,
        current_user=current_user,
        limit=limit,
        offset=offset,
    )


@router.get("/all/", response_model=InvoiceListing, status_code=status.HTTP_200_OK)
def get_all_invoices(
    limit: int = 15,
    offset: int = 0,
    email: str = "",
    seller_nip: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceListing:
    """
    Admin fetch users
    """

    return crud_invoice.get_all(
        db=db, current_user=current_user, limit=limit, offset=offset, email=email, seller_nip=seller_nip
    )


@router.get("/{invoice_id}/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def get_single_by_id(
    invoice_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Get invoice by id
    """

    return crud_invoice.get_by_id(db=db, current_user=current_user, invoice_id=invoice_id)


@router.get("/user/{user_id}/", response_model=InvoiceListing, status_code=status.HTTP_200_OK)
def get_user_invoices(
    user_id: int,
    limit: int = 15,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceListing:
    """
    Get car by id
    """

    return crud_invoice.admin_get_by_user_id(
        db=db,
        current_user=current_user,
        user_id=user_id,
        limit=limit,
        offset=offset,
    )


@router.post("/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def create_user_invoice(
    obj_in: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Admin create paycheck
    """

    return crud_invoice.create(db=db, current_user=current_user, invoice_in=obj_in)


@router.post("/{user_id}/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def create_admin_invoice(
    user_id: int,
    obj_in: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Admin create paycheck
    """

    return crud_invoice.create_as_admin(db=db, current_user=current_user, user_id=user_id, invoice_in=obj_in)


@router.post("/file/{invoice_id}/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def upload_invoice_file(
    invoice_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Upload file user
    """
    return crud_invoice.upload_file(db=db, current_user=current_user, invoice_id=invoice_id, file=file)


@router.put("/{invoice_id}/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def update_invoice_admin(
    invoice_id: int,
    obj_in: InvoiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Admin update user
    """

    return crud_invoice.update(db=db, current_user=current_user, invoice_id=invoice_id, obj_in=obj_in)


@router.delete("/{invoice_id}/", response_model=InvoiceInDB, status_code=status.HTTP_200_OK)
def delete_invoice_admin(
    invoice_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> InvoiceInDB:
    """
    Admin delete car
    """

    return crud_invoice.delete(db=db, current_user=current_user, invoice_id=invoice_id)
