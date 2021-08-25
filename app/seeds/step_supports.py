from app.models import db, Step_Support
from app.seeds.steps import computer_step1, computer_step2, computer_step3, phone_step1, phone_step2, phone_step3, tablet_step1, tablet_step2, tablet_step3


# Adds a demo user, you can add other users here if you want
def seed_step_supports():
    computer_step1_support1 = Step_Support(
        stepId=1, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Computer1Photo1.jpeg")
    computer_step1_support2 = Step_Support(
        stepId=1, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Computer1Photo2.jpeg")
    computer_step2_support1 = Step_Support(
        stepId=2, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Computer2Photo1.jpeg")
    phone_step1_support1 = Step_Support(
        stepId=4, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Phone1Photo1.jpeg")
    phone_step2_support1 = Step_Support(
        stepId=5, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Phone2Photo1.jpeg")
    phone_step2_support2 = Step_Support(
        stepId=5, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Phone2Photo2.jpeg")
    tablet_step1_support1 = Step_Support(
        stepId=7, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Tablet1Photo1.jpeg")
    tablet_step2_support1 = Step_Support(
        stepId=8, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/Tablet2Photo1.jpeg")

    support_list = [computer_step1_support1, computer_step1_support2, computer_step2_support1,
                    phone_step1_support1, phone_step2_support1, phone_step2_support2, tablet_step1_support1, tablet_step2_support1]

    for support in support_list:
        db.session.add(support)

    # computer_step1.step_supports.extend(
    #     [computer_step1_support1, computer_step1_support2])
    # computer_step2.step_supports.extend([computer_step2_support1])
    # phone_step1.step_supports.extend([phone_step1_support1])
    # phone_step2.step_supports.extend(
    #     [phone_step2_support1, phone_step2_support2])
    # tablet_step1.step_supports.extend([tablet_step1_support1])
    # tablet_step2.step_supports.extend([tablet_step2_support1])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_step_supports():
    db.session.execute('TRUNCATE step_supports RESTART IDENTITY CASCADE;')
    db.session.commit()
