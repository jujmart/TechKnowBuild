from flask import Blueprint, request
from app.models import Project_Support

project_support_routes = Blueprint('project_supports', __name__)


@project_support_routes.route('/', methods=["PATCH"])
def get_some_project_supports():
    project_supportIds = request.json
    project_supports = Project_Support.query.filter(
        Project_Support.id.in_(project_supportIds)).all()
    return {'project_supports': [project_support.to_dict() for project_support in project_supports]}


# @project_support_routes.route("/AWS/<int:id>", methods=['POST'])
# def create_project_support_with_aws(id):

#     if "image" not in request.files:
#         return {"errors": "album image required"}  # , 400

#     albumImage = request.files['image']

#     if not allowed_file(albumImage.filename):
#         return {"errors": "file type not permitted"}  # , 400

#     albumImage.filename = get_unique_filename(albumImage.filename)

#     song_to_update = Song.query.get_or_404(id)
#     old_album_image_url = song_to_update.albumImageUrl
#     if "AWS-Bucket" not in old_album_image_url:
#         delete_file_by_url(old_album_image_url)
#     albumImageUpload = upload_file_to_s3(albumImage)

#     if "url" not in albumImageUpload:
#         return albumImageUpload  # , 400

#     albumImageUrl = albumImageUpload["url"]

#     song_to_update.albumImageUrl = albumImageUrl
#     db.session.commit()

#     song_dict = song_to_update.to_dict()
#     song_dict["genres"] = [genre.genreName for genre in song_to_update.genres]

#     return {"albumImageUrl": albumImageUrl, "song": song_dict}
