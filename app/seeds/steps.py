from app.models import db, Step
from app.seeds.projects import computer, phone, tablet

computer_step1 = Step(
    projectId=1, title='Get computer parts', instruction='Get the parts')
computer_step2 = Step(
    projectId=1, title='Put together parts', instruction='This part goes here. This part goes here.')
computer_step3 = Step(
    projectId=1, title='Finishing touches', instruction='Finish it with this.')
phone_step1 = Step(
    projectId=2, title='Get phone parts', instruction='Get the parts')
phone_step2 = Step(
    projectId=2, title='Put together parts', instruction='This part goes here. This part goes here.')
phone_step3 = Step(
    projectId=2, title='Finishing touches', instruction='Finish it with this.')
tablet_step1 = Step(
    projectId=3, title='Get tablet parts', instruction='Get the parts')
tablet_step2 = Step(
    projectId=2, title='Put together parts', instruction='This part goes here. This part goes here.')
tablet_step3 = Step(
    projectId=3, title='Finishing touches', instruction='Finish it with this.')


def seed_steps():

    step_list = [computer_step1, computer_step2, computer_step3, phone_step1,
                 phone_step2, phone_step3, tablet_step1, tablet_step2, tablet_step3]

    for step in step_list:
        db.session.add(step)

    # computer.steps.extend([computer_step1, computer_step2, computer_step3])
    # phone.steps.extend([phone_step1, phone_step2, phone_step3])
    # tablet.steps.extend([tablet_step1, tablet_step2, tablet_step3])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
