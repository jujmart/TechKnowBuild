from .db import db
from sqlalchemy.sql import func
from sqlalchemy import CheckConstraint, column


class Step_Support(db.Model):
    __tablename__ = 'step_supports'

    id = db.Column(db.Integer, primary_key=True)
    stepId = db.Column(db.Integer, db.ForeignKey(
        "steps.id"), nullable=False)
    stepSupportType = db.Column(db.String(5), nullable=False)
    stepSupportUrl = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())
    CheckConstraint(column("projectSupportType") in ["image", "video"])

    step = db.relationship("Step", back_populates="step_supports")

    def to_dict(self):
        return {
            'id': self.id,
            'stepId': self.stepId,
            'stepSupportType': self.stepSupportType,
            'stepSupportUrl': self.stepSupportUrl,
        }
