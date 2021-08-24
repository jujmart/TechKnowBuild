from .db import db
from sqlalchemy.sql import func

project_categories = db.Table(
    "project-categories",
    db.Column("projectId", db.ForeignKey(
        "projects.id"), primary_key=True),
    db.Column("categoryId", db.ForeignKey(
        "categories.id"), primary_key=True),
)


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, index=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    projects = db.relationship(
        "Project", secondary=project_categories, back_populates="categories")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
