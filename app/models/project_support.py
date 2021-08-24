from .db import db
from sqlalchemy.sql import func


class Project_Support(db.Model):
    __tablename__ = 'project_supports'

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    projectSupportType = db.Column(db.String(5), nullable=False)
    projectSupportUrl = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    project = db.relationship("Project", back_populates="project_supports")

    def to_dict(self):
        return {
            'id': self.id,
            'projectId': self.projectId,
            'projectSupportType': self.projectSupportType,
            'projectSupportUrl': self.projectSupportUrl,
        }
