from flask import Blueprint, request
from app.models import Project_Support

project_support_routes = Blueprint('project_supports', __name__)


@project_support_routes.route('/', methods=["PATCH"])
def get_some_project_supports():
    project_supportIds = request.json
    project_supports = Project_Support.query.filter(
        Project_Support.id.in_(project_supportIds)).all()
    return {'project_supports': [project_support.to_dict() for project_support in project_supports]}
