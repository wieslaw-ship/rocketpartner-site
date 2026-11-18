from fastapi import APIRouter
from .endpoints import auth, car, user, income, information, invoice, paycheck, document

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(car.router, prefix="/car", tags=["car"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(income.router, prefix="/income", tags=["income"])
api_router.include_router(information.router, prefix="/information", tags=["information"])
api_router.include_router(invoice.router, prefix="/invoice", tags=["invoice"])
api_router.include_router(paycheck.router, prefix="/paycheck", tags=["paycheck"])
api_router.include_router(document.router, prefix="/document", tags=["document"])
