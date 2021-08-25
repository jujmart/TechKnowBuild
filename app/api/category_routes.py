from flask import Blueprint
from flask_login import login_required
from app.models import Category

category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
