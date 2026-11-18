# Import all the models, so that Base has them before being
# imported by Alembic
from db.base_class import Base  # noqa
from models.user import User  # noqa
from models.car import Car  # noqa
from models.income import Income  # noqa
from models.invoice import Invoice  # noqa
from models.information import Information  # noqa
from models.invoiceVAT import InvoiceVAT  # noqa
from models.paycheck import Paycheck  # noqa
from models.document import Document  # noqa
