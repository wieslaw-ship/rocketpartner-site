from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session
from fastapi import UploadFile
from crud.base import CRUDBase
from models.user import User
from crud.crud_invoiceVAT import crud_invoiceVAT
from models.invoice import Invoice
from core.helpers import save_image, remove_single_file
from core.exceptions import no_permission
from schemas.invoice import InvoiceCreate, InvoiceInDB, InvoiceListing, InvoiceUpdate, InvoiceVATCreate


class CRUDInvoice(CRUDBase[Invoice, InvoiceCreate, InvoiceUpdate]):
    def get_all(
        self, db: Session, current_user: User, limit: int, offset: int, email: Optional[str], seller_nip: Optional[str]
    ):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Invoice, User).join(Invoice.user)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))
        if seller_nip:
            result = result.filter(Invoice.seller_nip.ilike(f"%{seller_nip}%"))
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Invoice.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for invoice, user in queryset:
            amounts = []
            for i in invoice.invoiceVAT:
                amounts.append(InvoiceVATCreate(**i.__dict__))
            _list = {**invoice.__dict__}
            _list["invoiceVAT"] = amounts
            users.append(InvoiceInDB(**_list, email=user.email))
        return InvoiceListing(counter=total_pages, items=users)

    def get_by_id(self, db: Session, current_user: User, invoice_id: int):
        db_obj = self.get_or_404(db=db, id=invoice_id)
        self.check_if_user_is_admin(user=current_user)
        return db_obj

    def admin_get_by_user_id(self, db: Session, current_user: User, user_id: int, limit: int, offset: int):
        self.check_if_user_is_admin(user=current_user)
        return self.get_by_user_id(db=db, user_id=user_id, limit=limit, offset=offset)

    def get_by_user_id(self, db: Session, user_id: int, limit: int, offset: int):
        result = db.query(Invoice).filter(Invoice.user_id == user_id)
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Invoice.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        users = []
        for invoice in queryset:
            amounts = []
            for i in invoice.invoiceVAT:
                amounts.append(InvoiceVATCreate(**i.__dict__))
            _list = {**invoice.__dict__}
            _list["invoiceVAT"] = amounts
            users.append(InvoiceInDB(**_list))
        return InvoiceListing(counter=total_pages, items=users)

    def create(self, db: Session, current_user: User, invoice_in: InvoiceCreate):
        create_data = invoice_in.dict()
        amounts = invoice_in.invoiceVAT
        create_data.pop("invoiceVAT")
        db_obj = Invoice(**create_data)
        db_obj.user_id = current_user.id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        for i in amounts:
            crud_invoiceVAT.create(db=db, current_user=current_user, InvoiceVAT_in=i, invoice_id=db_obj.id)
        return db_obj

    def create_as_admin(self, db: Session, current_user: User, user_id: int, invoice_in: InvoiceCreate):
        create_data = invoice_in.dict()
        amounts = invoice_in.invoiceVAT
        create_data.pop("invoiceVAT")
        db_obj = Invoice(**create_data)
        db_obj.user_id = user_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        for i in amounts:
            crud_invoiceVAT.create_as_admin(db=db, current_user=current_user, invoice_in=i, invoice_id=db_obj.id)
        return db_obj

    def get_my_invoices(self, db: Session, current_user: User, limit: int, offset: int):
        return self.get_by_user_id(db=db, user_id=current_user.id, limit=limit, offset=offset)

    def update(
        self, db: Session, current_user: User, invoice_id: int, obj_in: Union[InvoiceUpdate, Dict[str, Any]]
    ) -> User:
        db_obj = self.get_or_404(db=db, id=invoice_id)
        update_data = obj_in.dict()
        amounts = obj_in.invoiceVAT
        update_data.pop("invoiceVAT")
        super().update(db=db, db_obj=db_obj, obj_in=update_data)
        for i in amounts:
            if i.id:
                crud_invoiceVAT.update(db=db, current_user=current_user, obj_in=i, invoiceVAT_id=i.id)
            else:
                crud_invoiceVAT.create(db=db, current_user=current_user, InvoiceVAT_in=i, invoice_id=db_obj.id)
        return db_obj

    def upload_file(self, db: Session, current_user: User, invoice_id: int, file: UploadFile):
        db_obj = self.get_or_404(db=db, id=invoice_id)
        if db_obj.user_id == current_user or current_user.is_admin:
            if db_obj.file:
                remove_single_file(db_obj.file)
            db_obj.file = save_image(file)
            db.add(db_obj)
            db.commit()
            return db_obj
        raise no_permission()

    def delete(self, db: Session, current_user: User, invoice_id: int):
        db_obj = self.get_or_404(db=db, id=invoice_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            db.delete(db_obj)
            db.commit()
            return db_obj
        raise no_permission()


crud_invoice = CRUDInvoice(Invoice)
