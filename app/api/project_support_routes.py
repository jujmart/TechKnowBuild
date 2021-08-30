from app.AWS import allowed_file, delete_file_by_url, get_unique_filename, upload_file_to_s3
from flask import Blueprint, request
from app.models import Project_Support, db
from flask_login import login_required

project_support_routes = Blueprint('project_supports', __name__)


@project_support_routes.route('/', methods=["PATCH"])
def get_some_project_supports():
    project_supportIds = request.json
    project_supports = Project_Support.query.filter(
        Project_Support.id.in_(project_supportIds)).all()
    return {'project_supports': [project_support.to_dict() for project_support in project_supports]}


@project_support_routes.route("/AWS/<int:id>", methods=['POST'])
@login_required
def create_project_support_with_aws(id):

    if "image" not in request.files:
        return {"errors": ["Project image required"]}

    projectImage = request.files['image']

    if not allowed_file(projectImage.filename):
        return {"errors": ["File type not permitted"]}

    projectImage.filename = get_unique_filename(projectImage.filename)
    projectImageUpload = upload_file_to_s3(projectImage)

    if "url" not in projectImageUpload:
        return projectImageUpload

    projectImageUrl = projectImageUpload["url"]

    project_support = Project_Support(
        projectId=id,
        projectSupportType="image",
        projectSupportUrl=projectImageUrl,
    )
    db.session.add(project_support)
    db.session.commit()

    return {}


@project_support_routes.route("/AWS/<int:id>", methods=['PUT'])
@login_required
def edit_project_support_with_aws(id):

    if "image" not in request.files:
        return {"errors": ["Projecct image required"]}

    projectImage = request.files['image']

    if not allowed_file(projectImage.filename):
        return {"errors": ["File type not permitted"]}

    projectImage.filename = get_unique_filename(projectImage.filename)
    projectImageUpload = upload_file_to_s3(projectImage)

    project_support = Project_Support.query.get_or_404(id)
    project_support_url = project_support.projectSupportUrl
    if "AWS-Bucket" not in project_support_url:
        delete_file_by_url(project_support_url)

    if "url" not in projectImageUpload:
        return projectImageUpload

    projectImageUrl = projectImageUpload["url"]

    project_support.projectSupportUrl = projectImageUrl
    db.session.commit()

    return {"projectSupport": project_support.to_dict()}
