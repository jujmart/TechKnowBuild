from app.models import db, Comment
from app.seeds.projects import computer, phone, tablet


def seed_comments():
    computer_comment1 = Comment(
        userId=1, projectId=1, content='This build works well!')
    computer_comment2 = Comment(
        userId=2, projectId=1, content="I'll definitely build this computer.")
    computer_comment3 = Comment(
        userId=3, projectId=1, content='Nice job')
    computer_comment4 = Comment(
        userId=1, projectId=1, content='Great job laying this out')
    phone_comment1 = Comment(
        userId=1, projectId=2, content="Can't wait to test this out")
    phone_comment2 = Comment(
        userId=2, projectId=2, content="Cool phone")
    phone_comment3 = Comment(
        userId=3, projectId=2, content='How did you discover this?')
    phone_comment4 = Comment(
        userId=1, projectId=2, content='Check this out people!')
    tablet_comment1 = Comment(
        userId=1, projectId=3, content='Wow')
    tablet_comment2 = Comment(
        userId=2, projectId=3, content="Clear and concise. I like it.")
    tablet_comment3 = Comment(
        userId=3, projectId=3, content='You know tech!')
    tablet_comment4 = Comment(
        userId=1, projectId=3, content='Cool cool cool')

    comment_list = [computer_comment1, computer_comment2, computer_comment3, computer_comment4, phone_comment1,
                    phone_comment2, phone_comment3, phone_comment4, tablet_comment1, tablet_comment2, tablet_comment3, tablet_comment4]

    for comment in comment_list:
        db.session.add(comment)

    # computer.comments.extend(
    #     [computer_comment1, computer_comment2, computer_comment3, computer_comment4])
    # phone.comments.extend(
    #     [phone_comment1, phone_comment2, phone_comment3, phone_comment4])
    # tablet.comments.extend(
    #     [tablet_comment1, tablet_comment2, tablet_comment3, tablet_comment4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
