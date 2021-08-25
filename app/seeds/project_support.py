from app.models import db, Project_Support
from app.seeds.projects import computer, phone, tablet


# Adds a demo user, you can add other users here if you want
def seed_project_supports():
    computer_support1 = Project_Support(
        projectId=1, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/ComputerPhoto1.jpeg")
    computer_support2 = Project_Support(
        projectId=1, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/ComputerPhoto2.jpeg")
    phone_support1 = Project_Support(
        projectId=2, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/PhonePhoto1.jpeg")
    phone_support2 = Project_Support(
        projectId=2, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/PhonePhoto2.jpeg")
    tablet_support1 = Project_Support(
        projectId=3, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/TabletPhoto1.jpeg")
    tablet_support2 = Project_Support(
        projectId=3, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/TabletPhoto2.jpeg")

    support_list = [computer_support1, computer_support2,
                    phone_support1, phone_support2, tablet_support1, tablet_support2]

    for support in support_list:
        db.session.add(support)

    computer.project_supports.extend([computer_support1, computer_support2])
    phone.project_supports.extend([phone_support1, phone_support2])
    tablet.project_supports.extend([tablet_support1, tablet_support2])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_project_supports():
    db.session.execute('TRUNCATE project_supports RESTART IDENTITY CASCADE;')
    db.session.commit()
