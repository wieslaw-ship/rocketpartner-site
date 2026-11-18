from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class InformationBase(BaseModel):
    title: Optional[str] = ""
    content: Optional[str] = ""

    title_en: Optional[str] = ""
    content_en: Optional[str] = ""

    title_ru: Optional[str] = ""
    content_ru: Optional[str] = ""


# Properties to receive via API on creation
class InformationCreate(InformationBase):
    ...


# Properties to receive via API on update
class InformationUpdate(InformationBase):
    ...


# Additional properties stored in DB but not returned by API
class InformationInDB(InformationBase):
    id: Optional[int] = None
    date_created: datetime

    class Config:
        orm_mode = True


class InformationListing(BaseModel):
    counter: int
    items: List[InformationInDB]
