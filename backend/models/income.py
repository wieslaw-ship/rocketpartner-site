from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, func

from db.base_class import Base
from sqlalchemy.orm import relationship


class Income(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    netto = Column(Numeric(10, 2))
    gross = Column(Numeric(10, 2))

    provider = Column(String)
    date_from = Column(DateTime)
    date_to = Column(DateTime)
    przejazdy = Column(Integer)
    km = Column(Numeric(10, 2))
    date_created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="income")
