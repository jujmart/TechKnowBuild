from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class ProjectForm(FlaskForm):
    title = StringField(
        'title', validators=[DataRequired(), Length(max=50)])
    description = TextAreaField('description', validators=[DataRequired()])
