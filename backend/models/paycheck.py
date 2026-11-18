from sqlalchemy import Column, ForeignKey, Integer, Numeric, String, DateTime, func
from sqlalchemy.orm import relationship
from db.base_class import Base


class Paycheck(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    netto = Column(Numeric(10, 2))
    gross = Column(Numeric(10, 2))

    provider = Column(String)

    rental_tax = Column(Numeric(10, 2))
    comission = Column(Numeric(10, 2))
    monthly_comission = Column(Numeric(10, 2))

    umowa_tax = Column(Numeric(10, 2))
    employment_costs = Column(Numeric(10, 2))
    insurance_community = Column(Numeric(10, 2))
    insurance_health = Column(Numeric(10, 2))
    pit = Column(Numeric(10, 2))

    withdraw = Column(Numeric(10, 2))
    date_created = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="paychecks")
