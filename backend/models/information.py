from sqlalchemy import Column, DateTime, Integer, String, func
from db.base_class import Base


class Information(Base):
    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    content = Column(String)

    title_en = Column(String)
    content_en = Column(String)

    title_ru = Column(String)
    content_ru = Column(String)
    date_created = Column(DateTime(timezone=True), server_default=func.now())
