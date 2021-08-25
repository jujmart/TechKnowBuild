from app.models import db, Project

computer = Project(
    userId=1, title='Build a computer', description='This walkthrough will show you how to put together the components that combine to make a computer!')
phone = Project(
    userId=1, title='Put together a phone', description="Let's put a phone together!")
tablet = Project(
    userId=1, title='Tablet build', description="This build should be pretty similar to a phone.")


def seed_projects():

    db.session.add(computer)
    db.session.add(phone)
    db.session.add(tablet)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
