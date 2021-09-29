from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired()])
    projectId = IntegerField("projectId", validators=[DataRequired()])
