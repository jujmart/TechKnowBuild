from app.forms.comment_form import CommentForm
from flask import Blueprint, request
from app.models import Comment, db
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.title()} : {error}')
    return errorMessages


@comment_routes.route('/', methods=["PATCH"])
def get_some_comments():
    commentIds = request.json
    comments = Comment.query.filter(Comment.id.in_(commentIds)).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/', methods=["POST"])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content=form.data["content"],
            projectId=form.data["projectId"],
            userId=current_user.id
        )
        db.session.add(comment)
        db.session.commit()
        return {'comment': comment.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}


# @step_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_step(id):
#     step = Step.query.get_or_404(id)
#     if step.project.userId == current_user.id:
#         for step_support in step.step_supports:
#             step_support_url = step_support.stepSupportUrl
#             if "AWS-Bucket" not in step_support_url:
#                 delete_file_by_url(step_support_url)
#         db.session.delete(step)
#         db.session.commit()
#     return {}


# @step_routes.route('/<int:step_id>', methods=["PUT"])
# @login_required
# def edit_step(step_id):
#     form = StepForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         step = Step.query.get_or_404(step_id)
#         step.title = form.data["title"]
#         step.instruction = form.data["instruction"]
#         db.session.commit()
#         return {'step': step.to_dict()}
#     return {'errors': validation_errors_to_error_messages(form.errors)}
