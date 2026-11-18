from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship
from db.base_class import Base


class Invoice(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    file = Column(String)
    seller_nip = Column(String)
    seller_name = Column(String)
    seller_address = Column(String)
    type = Column(String)

    car_id = Column(Integer, ForeignKey("car.id", ondelete="cascade"), nullable=True)
    number = Column(String)
    date = Column(Date)

    date_created = Column(DateTime(timezone=True), server_default=func.now())

    invoiceVAT = relationship("InvoiceVAT", back_populates="invoice")
    user = relationship("User", back_populates="invoices")
