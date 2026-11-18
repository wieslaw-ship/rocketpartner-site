from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    database_url: str
    db_user: str
    db_pass: str
    db_host: str
    db_name: str
    
    # Security
    token: str
    algorytm: str
    deeply_key: str
    
    # Email
    MAIL_USERNAME: str = "your-email@gmail.com"
    MAIL_PASSWORD: str = "your-app-password"
    MAIL_FROM: str = "noreply@citydrive.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "City Drive"
    
    # CORS
    allowed_origins: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        extra = "allow"

conf = Settings()
