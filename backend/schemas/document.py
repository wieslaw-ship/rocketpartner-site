from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class DocumentBase(BaseModel):
    name: str = ""
    file: str = ""


# Properties to receive via API on creation
class DocumentCreate(BaseModel):
    ...


# Properties to receive via API on update
class DocumentUpdate(DocumentBase):
    ...


# Additional properties stored in DB but not returned by API
class DocumentInDB(DocumentBase):
    id: Optional[int] = None
    date_created: datetime
    email: Optional[str] = ""
    first_name: Optional[str] = ""
    surname: Optional[str] = ""
    accepted: bool = False

    class Config:
        orm_mode = True


class DocumentListing(BaseModel):
    counter: int
    items: List[DocumentInDB]
