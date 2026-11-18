from fastapi_mail import MessageSchema, FastMail
from fastapi import BackgroundTasks
from core.config import conf


def send_email_new_password(password: str, email: str, background_tasks: BackgroundTasks):
    body = [{"password": password}]
    message = MessageSchema(
        subject="Rocket Partner - Twoje nowe hasło!",
        recipients=[
            email,
        ],
        template_body=body,
        subtype="html",
    )
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message, template_name="newPassword.html")
    return True


def new_user_email(email: str, background_tasks: BackgroundTasks):
    body = [{"email": email}]
    message = MessageSchema(
        subject="Rocket Partner - Nowe konto!",
        recipients=[
            email,
        ],
        template_body=body,
        subtype="html",
    )
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message, template_name="newAccount.html")
    return True
