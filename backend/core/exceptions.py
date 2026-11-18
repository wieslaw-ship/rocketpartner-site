from fastapi import HTTPException
from fastapi import status

class ValidationError(HTTPException):
    def __init__(self, detail: str = "Validation error", error_code: str | None = None):
        # If you prefer plain string detail, you can just pass `detail`
        payload = {"message": detail}
        if error_code is not None:
            payload["code"] = error_code

        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=payload,
        )

def user_username_exists() -> HTTPException:
    username_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Podany adres email już istnieje",
    )
    return username_exception


def user_must_be_admin() -> HTTPException:
    authority_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Brak uprawnień",
    )
    return authority_exception


def something_went_wrong() -> HTTPException:
    authority_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Coś poszło nie tak...",
    )
    return authority_exception


def get_user_exception() -> HTTPException:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Nieprawidłowy adres e-mail lub hasło.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return credentials_exception


def missmatched_password() -> HTTPException:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Nie prawidłowe hasło.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return credentials_exception


def object_does_not_exist() -> HTTPException:
    object_exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Nie możemy znaleźć czego szukasz.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return object_exception


def no_permission() -> HTTPException:
    permission_exception = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Brak uprawnień")

    return permission_exception
