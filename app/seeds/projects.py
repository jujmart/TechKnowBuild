from app.models import db, Project

computer = Project(
    userId=1, title='Build a computer', description='This walkthrough will show you how to put together the components that combine to make a computer!')
phone = Project(
    userId=2, title='Put together a phone', description="Let's put a phone together!")
tablet = Project(
    userId=3, title='Tablet build', description="This build should be pretty similar to a phone.")
logic_probe = Project(userId=1, title="Universal Logic Probe",
                      description="""These days good quality oscilloscope is not an expensive instrument and , we can see it in most workbenches. With the advancement of oscilloscopes, simple testing tools such as logic probes are not as popular these days. However, if the oscilloscope or logic analyzer was out of reach, the logic probe is a handy instrument to check digital circuits.

Also, in some cases, a logic probe is an easy option to check the functionality of low-speed logic circuits because it provides a real-time visual indication of the logic state without adjustments or calibrations.

The logic probe design described in this article uses common and inexpensive ICs, including the popular NE555 timer and LM393 low voltage comparator IC. At the time of this writing, both ICs were prevalent in the market and cost less than US$ 0.25.""")


def seed_projects():

    db.session.add(computer)
    db.session.add(phone)
    db.session.add(tablet)
    db.session.add(logic_probe)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
