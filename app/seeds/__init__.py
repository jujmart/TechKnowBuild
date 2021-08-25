from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .categories import seed_categories, undo_categories
from .comments import seed_comments, undo_comments
from .project_supports import seed_project_supports, undo_project_supports
from .steps import seed_steps, undo_steps
from .step_supports import seed_step_supports, undo_step_supports

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_categories()
    seed_comments()
    seed_project_supports()
    seed_steps()
    seed_step_supports()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_categories()
    undo_comments()
    undo_project_supports()
    undo_steps()
    undo_step_supports()
    # Add other undo functions here
