from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.user import User
from models.invoiceVAT import InvoiceVAT
from core.exceptions import no_permission
from schemas.invoiceVAT import InvoiceVATCreate, InvoiceVATUpdate


class CRUDInvoiceVAT(CRUDBase[InvoiceVAT, InvoiceVATCreate, InvoiceVATUpdate]):
    def get_by_invoiceVAT_id(self, db: Session, invoiceVAT_id: int):
        return db.query(InvoiceVAT).filter(InvoiceVAT.id == invoiceVAT_id).all()

    def create(self, db: Session, current_user: User, InvoiceVAT_in: InvoiceVATCreate, invoice_id: int):
        create_data = InvoiceVAT_in.dict()
        db_obj = InvoiceVAT(**create_data)
        db_obj.user_id = current_user.id
        db_obj.invoice_id = invoice_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_as_admin(self, db: Session, user_id: int, InvoiceVAT_in: InvoiceVATCreate, invoice_id: int):
        create_data = InvoiceVAT_in.dict()
        db_obj = InvoiceVAT(**create_data)
        db_obj.user_id = user_id
        db_obj.invoice_id = invoice_id
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, current_user: User, invoiceVAT_id: int, obj_in: Union[InvoiceVATUpdate, Dict[str, Any]]
    ) -> User:
        db_obj = self.get_or_404(db=db, id=invoiceVAT_id)
        return super().update(db=db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, current_user: User, invoiceVAT_id: int):
        db_obj = self.get_or_404(db=db, id=invoiceVAT_id)
        if db_obj.user_id == current_user.id or current_user.is_admin:
            db.delete(db_obj)
            db.commit()
            return db_obj
        raise no_permission()


crud_invoiceVAT = CRUDInvoiceVAT(InvoiceVAT)
