from flask import Blueprint, request
from app.models import Project

project_routes = Blueprint('projects', __name__)


@project_routes.route('/', methods=["PATCH"])
def get_some_projects():
    projectIds = request.json
    projects = Project.query.filter(Project.id.in_(projectIds)).all()
    return {'projects': [project.to_dict() for project in projects]}


@project_routes.route('/<int:id>')
def get_project_by_id(id):
    project = Project.query.get_or_404(id)
    return {'project': project.to_dict()}
