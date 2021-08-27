from app.models import step_support
from .db import db
from sqlalchemy.sql import func


class Step(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    instruction = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    project = db.relationship("Project", back_populates="steps")
    step_supports = db.relationship(
        "Step_Support", back_populates="step", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'projectId': self.projectId,
            'title': self.title,
            'instruction': self.instruction,
            "createdAt": self.createdAt,
        }
