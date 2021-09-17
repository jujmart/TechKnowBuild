from app.models import db, Project_Support


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
    logic_probe_support1 = Project_Support(
        projectId=4, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/LogicProbePhoto1.jpeg")
    led_matrix_support1 = Project_Support(
        projectId=5, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/LEDMatrixPhoto1.png")
    led_ring_support1 = Project_Support(
        projectId=6, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/LEDRingPhoto1.jpeg")
    pi_screen_support1 = Project_Support(
        projectId=7, projectSupportType="image", projectSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Project-Support/RaspberryPiScreenPhoto1.jpeg")

    support_list = [computer_support1, computer_support2, phone_support1, phone_support2,
                    tablet_support1, tablet_support2, logic_probe_support1, led_matrix_support1,
                    led_ring_support1, pi_screen_support1]

    for support in support_list:
        db.session.add(support)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_project_supports():
    db.session.execute('TRUNCATE project_supports RESTART IDENTITY CASCADE;')
    db.session.commit()
