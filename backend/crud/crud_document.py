from typing import Optional
from fastapi import UploadFile
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from core.exceptions import object_does_not_exist
from models.document import Document
from models.user import User
from schemas.document import DocumentInDB, DocumentListing, DocumentCreate, DocumentUpdate
from core.helpers import remove_single_file, save_image


class CRUDDocument(CRUDBase[Document, DocumentCreate, DocumentUpdate]):
    def get_by_id(self, db: Session, current_user: User, id: int):
        self.check_if_user_is_admin(user=current_user)
        return super().get_or_404(db=db, id=id)

    def uploadDocument(self, db: Session, current_user: User, file: UploadFile, name: str) -> Document:
        db_obj = db.query(Document).filter(Document.user_id == current_user.id, Document.name == name).first()
        if not db_obj:
            db_obj = Document()
        db_obj.file = save_image(file)
        db_obj.user_id = current_user.id
        db_obj.name = name
        db.add(db_obj)
        db.commit()
        return db_obj

    def uploadDocument_as_admin(
        self, db: Session, current_user: User, user_id: int, file: UploadFile, name: str
    ) -> Document:
        self.check_if_user_is_admin(user=current_user)
        db_obj = db.query(Document).filter(Document.user_id == user_id, Document.name == name).first()
        if not db_obj:
            db_obj = Document()
        db_obj = Document()
        db_obj.file = save_image(file)
        db_obj.user_id = user_id
        db_obj.name = name
        db.add(db_obj)
        db.commit()
        return db_obj

    def get_my_documents(self, db: Session, current_user: User):
        return db.query(Document).filter(Document.user_id == current_user.id).all()

    def get_all(
        self,
        db: Session,
        current_user: User,
        limit: int,
        offset: int,
        email: Optional[str],
    ):
        self.check_if_user_is_admin(user=current_user)
        result = db.query(Document, User).join(Document.user)
        if email:
            result = result.filter(User.email.ilike(f"%{email}%"))
        counter = result.count()
        total_pages = (counter + limit - 1) // limit
        result = result.order_by(Document.id.desc())
        queryset = result.offset(offset).limit(limit).all()
        documents = []
        for doc, user in queryset:
            documents.append(
                DocumentInDB(**doc.__dict__, email=user.email, first_name=user.first_name, surname=user.surname)
            )
        return DocumentListing(counter=total_pages, items=documents)

    def accept_document(self, db: Session, current_user: User, document_id: int):
        self.check_if_user_is_admin(user=current_user)
        db_obj = self.get_or_404(db=db, id=document_id)
        db_obj.accepted = not db_obj.accepted
        db.add(db_obj)
        db.commit()
        return db_obj

    def update_document(
        self,
        db: Session,
        current_user: User,
        document_id: int,
        file: Optional[UploadFile] = None,
        name: Optional[str] = "",
    ) -> Document:
        db_obj = self.get_or_404(db=db, id=document_id)
        if file:
            remove_single_file(db_obj.file)
            db_obj.file = save_image(file)
        db_obj.user_id = current_user.id
        if name:
            db_obj.name = name
        db.add(db_obj)
        db.commit()
        return db_obj

    def update_document_as_admin(
        self,
        db: Session,
        current_user: User,
        document_id: int,
        file: Optional[UploadFile] = None,
        name: Optional[str] = "",
    ) -> Document:
        self.check_if_user_is_admin(user=current_user)
        db_obj = self.get_or_404(db=db, id=document_id)
        if file:
            remove_single_file(db_obj.file)
            db_obj.file = save_image(file)
        if name:
            db_obj.name = name
        db.add(db_obj)
        db.commit()
        return db_obj

    def delete(self, db: Session, current_user: User, document_id: int):
        document = self.get_or_404(db=db, id=document_id)
        if current_user.is_admin or document.user_id == current_user.id:
            db.delete(document)
            db.commit()
            return document
        raise object_does_not_exist()

    def get_by_user_id(self, db: Session, current_user: User, user_id: int):
        self.check_if_user_is_admin(user=current_user)
        return db.query(Document).filter(Document.user_id == user_id).all()


crud_document = CRUDDocument(Document)
