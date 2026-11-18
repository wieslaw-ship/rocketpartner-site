from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class CarBase(BaseModel):
    type: Optional[str] = ""
    registration_number: Optional[str] = ""
    brand: Optional[str] = ""
    model: Optional[str] = ""
    vin: Optional[str] = ""
    year: Optional[int] = 0
    is_taxi: Optional[bool] = False
    is_active: Optional[bool] = False


# Properties to receive via API on creation
class CarCreate(CarBase):
    ...


# Properties to receive via API on update
class CarUpdate(CarBase):
    ...


# Additional properties stored in DB but not returned by API
class CarInDB(CarBase):
    id: Optional[int] = None
    date_created: datetime
    email: Optional[str] = ""

    class Config:
        orm_mode = True


class CarListing(BaseModel):
    counter: int
    items: List[CarInDB]
