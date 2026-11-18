from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, func

from db.base_class import Base
from sqlalchemy.orm import relationship


class Car(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    type = Column(String)
    registration_number = Column(String)
    brand = Column(String)
    model = Column(String)
    vin = Column(String)
    year = Column(Integer)
    is_taxi = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)

    date_created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="cars")
