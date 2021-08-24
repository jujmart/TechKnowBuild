from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="comments")
    project = db.relationship("Project", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'projectId': self.projectId,
            'content': self.content,
            'updatedAt': self.updatedAt,
            'createdAt': self.createdAt,
        }
