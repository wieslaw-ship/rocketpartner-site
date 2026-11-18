from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, func

from db.base_class import Base
from sqlalchemy.orm import relationship


class Document(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    name = Column(String)
    file = Column(String)
    date_created = Column(DateTime(timezone=True), server_default=func.now())
    accepted = Column(Boolean, default=False)

    user = relationship("User", back_populates="documents")
