from api.api_v1.routers import api_router
from db.base import Base
from db.session import engine
from fastapi import APIRouter, FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()  # <-- must have parentheses

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ SECURE: Only specific domains allowed
ALLOWED_ORIGINS = [
    "http://localhost:3000",          # Local development
    "http://localhost:8000",          # Local API
    "https://yourdomain.com",         # Production
    "https://www.yourdomain.com",     # With www
    "https://app.yourdomain.com",     # Subdomain
]  # ← THIS IS THE CRITICAL LINE (closing bracket)

root_router = APIRouter()
app.include_router(api_router, prefix="/api")
app.include_router(root_router)

Base.metadata.create_all(bind=engine)
app.mount("/media", StaticFiles(directory="media"), name="static")

@app.get("/", status_code=200)
async def root() -> dict:
    return {"message": "Hello World"}

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")