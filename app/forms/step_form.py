from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class StepForm(FlaskForm):
    title = StringField(
        'title', validators=[DataRequired(), Length(max=50)])
    instruction = TextAreaField('instruction', validators=[DataRequired()])
    projectId = IntegerField("projectId", validators=[DataRequired()])
