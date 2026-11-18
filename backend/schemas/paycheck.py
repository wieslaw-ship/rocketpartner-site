from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class PaycheckBase(BaseModel):
    gross: Optional[float] = None
    netto: Optional[float] = None
    provider: Optional[str] = ""
    rental_tax: Optional[float] = 0
    comission: Optional[float] = 0
    monthly_comission: Optional[float] = 0
    umowa_tax: Optional[float] = 0
    employment_costs: Optional[float] = 0
    insurance_community: Optional[float] = 0
    insurance_health: Optional[float] = 0
    pit: Optional[float] = 0
    withdraw: Optional[float] = 0


# Properties to receive via API on creation
class PaycheckCreate(PaycheckBase):
    ...


# Properties to receive via API on update
class PaycheckUpdate(PaycheckBase):
    ...


# Additional properties stored in DB but not returned by API
class PaycheckInDB(PaycheckBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    date_created: datetime

    class Config:
        orm_mode = True


class PaycheckListing(BaseModel):
    counter: int
    items: List[PaycheckInDB]
