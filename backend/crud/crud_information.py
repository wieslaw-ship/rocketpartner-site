from typing import Any, Dict, Union
import os
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models.user import User
from models.information import Information
from schemas.information import InformationCreate, InformationInDB, InformationUpdate, InformationListing
import requests


deeply_key = os.getenv("DEEPLY_KEY")


class CRUDInformation(CRUDBase[Information, InformationCreate, InformationUpdate]):
    def get_all(
        self,
        db: Session,
        limit: int,
        offset: int,
    ):
        result = db.query(Information)
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Information.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        items = []
        for information in queryset:
            items.append(
                InformationInDB(
                    **information.__dict__,
                )
            )
        return InformationListing(counter=total_pages, items=items)

    def create(self, db: Session, current_user: User, obj_in: InformationCreate):
        self.check_if_user_is_admin(user=current_user)
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Information(**obj_in_data)  # type: ignore
        db_obj.title_en = self.deepl_translate(obj_in.title, "EN")
        db_obj.content_en = self.deepl_translate(obj_in.content, "EN")
        db_obj.title_ru = self.deepl_translate(obj_in.title, "RU")
        db_obj.content_ru = self.deepl_translate(obj_in.content, "RU")
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def deepl_translate(self, text, target_lang):
        url = "https://api-free.deepl.com/v2/translate"
        headers = {"Authorization": f"DeepL-Auth-Key {deeply_key}", "Content-Type": "application/json"}
        payload = {"text": [text], "target_lang": target_lang}

        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            translated_text = response.json()["translations"][0]["text"]
            return translated_text
        else:
            return None

    # Example usage:
    auth_key = "[yourAuthKey]"
    text_to_translate = "Hello, world!"
    target_language = "DE"
    translated_text = deepl_translate(text_to_translate, target_language, auth_key)

    def update(
        self, db: Session, current_user: User, information_id: int, obj_in: Union[InformationUpdate, Dict[str, Any]]
    ) -> User:
        self.check_if_user_is_admin(user=current_user)
        db_obj = self.get_or_404(db=db, id=information_id)
        update_data = obj_in.dict()
        return super().update(db=db, db_obj=db_obj, obj_in=update_data)

    def delete(self, db: Session, current_user: User, information_id: int):
        db_obj = self.get_or_404(db=db, id=information_id)
        self.check_if_user_is_admin(user=current_user)
        db.delete(db_obj)
        db.commit()
        return db_obj


crud_information = CRUDInformation(Information)
