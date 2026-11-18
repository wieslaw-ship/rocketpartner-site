from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class IncomeBase(BaseModel):
    user_id: Optional[int] = None
    netto: Optional[float] = 0
    gross: Optional[float] = 0
    provider: Optional[str] = ""
    date_from: Optional[datetime] = ""
    date_to: Optional[datetime] = ""
    przejazdy: Optional[int] = 0
    km: Optional[int] = 0


# Properties to receive via API on creation
class IncomeCreate(IncomeBase):
    ...


# Properties to receive via API on update
class IncomeUpdate(IncomeBase):
    ...


# Additional properties stored in DB but not returned by API
class IncomeInDB(IncomeBase):
    id: Optional[int] = None
    date_created: datetime
    email: Optional[str] = ""

    class Config:
        orm_mode = True


class IncomeListing(BaseModel):
    counter: int
    items: List[IncomeInDB]
