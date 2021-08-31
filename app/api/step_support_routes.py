from app.AWS import allowed_file, delete_file_by_url, get_unique_filename, upload_file_to_s3
from flask import Blueprint, request
from app.models import Step_Support, db
from flask_login import login_required

step_support_routes = Blueprint('step_supports', __name__)


@step_support_routes.route('/', methods=["PATCH"])
def get_some_step_supports():
    step_supportIds = request.json
    step_supports = Step_Support.query.filter(
        Step_Support.id.in_(step_supportIds)).all()
    return {'step_supports': [step_support.to_dict() for step_support in step_supports]}


@step_support_routes.route("/AWS/<int:id>", methods=['POST'])
@login_required
def create_step_support_with_aws(id):

    if "image" not in request.files:
        return {"errors": ["Step image required"]}

    stepImage = request.files['image']

    if not allowed_file(stepImage.filename):
        return {"errors": ["File type not permitted"]}

    stepImage.filename = get_unique_filename(stepImage.filename)
    stepImageUpload = upload_file_to_s3(stepImage)

    if "url" not in stepImageUpload:
        return stepImageUpload

    stepImageUrl = stepImageUpload["url"]

    step_support = Step_Support(
        stepId=id,
        stepSupportType="image",
        stepSupportUrl=stepImageUrl,
    )
    db.session.add(step_support)
    db.session.commit()

    return {"stepSupport": step_support.to_dict()}


# @project_support_routes.route("/AWS/<int:id>", methods=['PUT'])
# @login_required
# def edit_project_support_with_aws(id):

#     if "image" not in request.files:
#         return {"errors": ["Projecct image required"]}

#     projectImage = request.files['image']

#     if not allowed_file(projectImage.filename):
#         return {"errors": ["File type not permitted"]}

#     projectImage.filename = get_unique_filename(projectImage.filename)
#     projectImageUpload = upload_file_to_s3(projectImage)

#     project_support = Project_Support.query.get_or_404(id)
#     project_support_url = project_support.projectSupportUrl
#     if "AWS-Bucket" not in project_support_url:
#         delete_file_by_url(project_support_url)

#     if "url" not in projectImageUpload:
#         return projectImageUpload

#     projectImageUrl = projectImageUpload["url"]

#     project_support.projectSupportUrl = projectImageUrl
#     db.session.commit()

#     return {"projectSupport": project_support.to_dict()}
