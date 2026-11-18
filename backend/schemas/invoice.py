from typing import Optional, List
from datetime import date, datetime
from pydantic import BaseModel
from schemas.invoiceVAT import InvoiceVATCreate, InvoiceVATInDB  # noqa


class InvoiceBase(BaseModel):
    seller_nip: Optional[str] = ""
    seller_name: Optional[str] = ""
    seller_address: Optional[str] = ""
    type: Optional[str] = ""
    file: Optional[str] = ""
    car_id: Optional[int] = None
    number: Optional[str] = ""
    date: Optional[date]
    invoiceVAT: Optional[List[InvoiceVATCreate]]


# Properties to receive via API on creation
class InvoiceCreate(InvoiceBase):
    ...


# Properties to receive via API on update
class InvoiceUpdate(InvoiceBase):
    ...


# Additional properties stored in DB but not returned by API
class InvoiceInDB(InvoiceBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    date_created: Optional[datetime]

    class Config:
        orm_mode = True


class InvoiceListing(BaseModel):
    counter: int
    items: List[InvoiceInDB]
