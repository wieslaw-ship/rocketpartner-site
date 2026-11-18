from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    first_name: Optional[str] = ""
    surname: Optional[str] = ""
    email: Optional[EmailStr] = None
    phone: Optional[str] = ""
    nationality: Optional[str] = ""
    male: Optional[bool] = False
    workarea: Optional[str] = ""
    mode_of_transport: Optional[str] = ""
    email_verified: Optional[bool] = False
    unique_code: Optional[str] = ""

    coworking_regulations: Optional[int] = 0
    bhp: Optional[int] = 0
    zus: Optional[int] = 0
    zlecenie: Optional[int] = 0
    company: Optional[int] = 0

    income_netto: Optional[float] = 0
    income_gross: Optional[float] = 0
    sum_vat: Optional[float] = 0
    sum_commission: Optional[float] = 0
    sum_paycheck: Optional[float] = 0
    balance: Optional[float] = 0

    is_admin: bool = False
    is_active: bool = False


# Properties to receive via API on creation
class UserCreate(BaseModel):
    first_name: Optional[str] = ""
    surname: Optional[str] = ""
    email: Optional[EmailStr] = None
    phone: Optional[str] = ""
    nationality: Optional[str] = ""
    male: Optional[bool] = False
    workarea: Optional[str] = ""
    mode_of_transport: Optional[str] = ""
    password: str
    ref_link: str


class UserEmail(BaseModel):
    email: EmailStr


class UserPasswordChange(BaseModel):
    password: str
    new_password: str
    re_new_password: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    ...


# Additional properties stored in DB but not returned by API
class UserInDB(UserBase):
    id: Optional[int] = None
    date_created: datetime

    class Config:
        orm_mode = True


class UserListing(BaseModel):
    counter: int
    items: List[UserInDB]


class AdminCounters(BaseModel):
    users: int = 0
    cars: int = 0


class UserShort(BaseModel):
    id: int
    first_name: str
    surname: str
    date_created: datetime
