from app.forms.project_form import ProjectForm
from flask import Blueprint, request
from app.models import Project, db, Category
from flask_login import current_user

project_routes = Blueprint('projects', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@project_routes.route('/', methods=["PATCH"])
def get_some_projects():
    projectIds = request.json
    projects = Project.query.filter(Project.id.in_(projectIds)).all()
    return {'projects': [project.to_dict() for project in projects]}


@project_routes.route('/<int:id>')
def get_project_by_id(id):
    project = Project.query.get_or_404(id)
    return {'project': project.to_dict()}


@project_routes.route('/categories/<int:id>', methods=["POST"])
def create_project(id):
    if (id == None):
        return {'errors': ["Please select a category"]}
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            title=form.data["title"],
            description=form.data["description"],
            userId=current_user.id
        )
        db.session.add(project)
        category = Category.query.get_or_404(id)
        project.categories.append(category)
        db.session.commit()
        return {'projectId': project.id}
    return {'errors': validation_errors_to_error_messages(form.errors)}
