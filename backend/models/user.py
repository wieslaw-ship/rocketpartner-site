from sqlalchemy import Integer, String, Column, Boolean, DateTime, func, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=False)
    surname = Column(String(256), nullable=False)
    email = Column(String, index=True, nullable=False)
    phone = Column(String(256), nullable=False)
    nationality = Column(String(500), nullable=False)
    male = Column(Boolean, default=True)
    workarea = Column(String(500), nullable=False)
    mode_of_transport = Column(String(500), nullable=False)

    # Account related
    email_verified = Column(Boolean, default=False)
    unique_code = Column(String(40))

    is_active = Column(Boolean, default=False)

    # FILES

    coworking_regulations = Column(Integer, default=0)
    bhp = Column(Integer, default=0)
    zus = Column(Integer, default=0)
    zlecenie = Column(Integer, default=0)
    company = Column(Integer, default=0)

    # Money related

    income_netto = Column(Numeric(10, 2))
    income_gross = Column(Numeric(10, 2))
    sum_vat = Column(Numeric(10, 2))
    sum_commission = Column(Numeric(10, 2))
    sum_paycheck = Column(Numeric(10, 2))
    balance = Column(Numeric(10, 2))

    ref_user = Column(Integer, ForeignKey("user.id", ondelete="cascade"))

    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    date_created = Column(DateTime(timezone=True), server_default=func.now())

    cars = relationship("Car", back_populates="user")
    income = relationship("Income", back_populates="user")
    paychecks = relationship("Paycheck", back_populates="user")
    invoices = relationship("Invoice", back_populates="user")
    documents = relationship("Document", back_populates="user")
