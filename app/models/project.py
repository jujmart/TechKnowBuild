from app.models import comment, project_support
from .db import db
from sqlalchemy.sql import func
from app.models.category import project_categories


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False, index=True)
    description = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="projects")
    categories = db.relationship(
        "Category", secondary=project_categories, back_populates="projects")
    steps = db.relationship(
        "Step", back_populates="project", cascade="all, delete-orphan")
    project_supports = db.relationship(
        "Project_Support", back_populates="project", cascade="all, delete-orphan")
    comments = db.relationship(
        "Comment", back_populates="project", cascade="all, delete-orphan")

    def to_dict(self):
        stepIds = [step.id for step in self.steps]
        stepIds.sort()
        commentIds = [comment.id for comment in self.comments]
        commentIds.sort()
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'createdAt': self.createdAt,
            "categories": [category.name for category in self.categories],
            "project_supportIds": [project_support.id for project_support in self.project_supports],
            "stepIds": stepIds,
            "username": self.user.username,
            "commentIds": commentIds,
        }
