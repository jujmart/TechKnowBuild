from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profilePhotoUrl = db.Column(db.String(
        500), nullable=False, default="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png")
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    projects = db.relationship(
        "Project", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePhotoUrl': self.profilePhotoUrl,
        }
