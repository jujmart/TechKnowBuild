from app.models import db, Category
from app.seeds.projects import computer, phone, tablet


# Adds a demo user, you can add other users here if you want
def seed_categories():
    computers = Category(name="Computers")
    phones = Category(name="Phones")
    tablets = Category(name="Tablets")
    electronics = Category(name="Electronics")

    db.session.add(computers)
    db.session.add(phones)
    db.session.add(tablets)
    db.session.add(electronics)

    computers.projects.append(computer)
    phones.projects.append(phone)
    tablets.projects.append(tablet)
    electronics.projects.append(computer)
    electronics.projects.append(phone)
    electronics.projects.append(tablet)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
