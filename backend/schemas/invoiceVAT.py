from typing import Optional
from pydantic import BaseModel


class InvoiceVATBase(BaseModel):
    id: Optional[int] = None
    gross: Optional[float] = None
    netto: Optional[float] = None
    vat: Optional[float] = None
    vat_type: Optional[str] = ""


# Properties to receive via API on creation
class InvoiceVATCreate(InvoiceVATBase):
    ...


# Properties to receive via API on update
class InvoiceVATUpdate(InvoiceVATBase):
    ...


# Additional properties stored in DB but not returned by API
class InvoiceVATInDB(InvoiceVATBase):
    user_id: Optional[int] = None
    invoice_id: Optional[int] = None
    # date_created: datetime

    class Config:
        orm_mode = True
