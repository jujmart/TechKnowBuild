from app.forms.step_form import StepForm
from app.AWS import delete_file_by_url
from flask import Blueprint, request
from app.models import Step, db
from flask_login import current_user, login_required

step_routes = Blueprint('steps', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.title()} : {error}')
    return errorMessages


@step_routes.route('/', methods=["PATCH"])
def get_some_steps():
    stepIds = request.json
    steps = Step.query.filter(Step.id.in_(stepIds)).all()
    return {'steps': [step.to_dict() for step in steps]}


# @project_routes.route('/<int:id>')
# def get_project_by_id(id):
#     project = Project.query.get_or_404(id)
#     return {'project': project.to_dict()}


@step_routes.route('/', methods=["POST"])
@login_required
def create_step():
    form = StepForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        step = Step(
            title=form.data["title"],
            instruction=form.data["instruction"],
            projectId=form.data["projectId"],
        )
        db.session.add(step)
        db.session.commit()
        return {'step': step.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}


# @project_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_project(id):
#     project = Project.query.get_or_404(id)
#     if project.userId == current_user.id:
#         for project_support in project.project_supports:
#             project_support_url = project_support.projectSupportUrl
#             if "AWS-Bucket" not in project_support_url:
#                 delete_file_by_url(project_support_url)
#         db.session.delete(project)
#         db.session.commit()
#     return {}


# @project_routes.route('/<int:project_id>/categories/<int:category_id>', methods=["PUT"])
# @login_required
# def edit_project(project_id, category_id):
#     if (category_id == 0):
#         return {'errors': ["Please select a category"]}
#     form = ProjectForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         project = Project.query.get_or_404(project_id)
#         project.title = form.data["title"]
#         project.description = form.data["description"]
#         category = Category.query.get_or_404(category_id)
#         project.categories = [category]
#         db.session.commit()
#         return {'projectSupportId': project.project_supports[0].id}
#     return {'errors': validation_errors_to_error_messages(form.errors)}
