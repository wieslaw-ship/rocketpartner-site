from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import relationship
from db.base_class import Base


class InvoiceVAT(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    invoice_id = Column(Integer, ForeignKey("invoice.id", ondelete="cascade"))

    gross = Column(Numeric(10, 2))
    netto = Column(Numeric(10, 2))
    vat = Column(Numeric(10, 2))
    vat_type = Column(String)

    date_created = Column(DateTime(timezone=True), server_default=func.now())

    invoice = relationship("Invoice", back_populates="invoiceVAT")
