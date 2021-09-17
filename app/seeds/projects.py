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

led_matrix = Project(userId=1, title="LED-Matrix With Web Server",
                     description="""In my first Instructable we will build a 16x16 LED matrix. In the end you will have

- obviously a LED matrix with 256 LEDs that are all individually controllable
- a web page hosted on a microcontroller which allows you to
  - create pixel art live from the web page on the matrix
  - save creations
  - display all previous creations in a loop

I started this project in October 2020, I bought all the parts and was looking forward to laser cutting the wood in my local FabLab. Unfortunately there were new lock downs due to the pandemic in my country and later I almost lost sight of the project. But this summer break I finally got started!

If you just want to see the instructions and materials skip to step 8 :)""")
led_ring = Project(userId=1, title="LED Ring Light for Laptop Screen",
                   description="""Being a teacher in a mostly unvaccinated country, all of my classes for the past year and a half have been held online. This made me try all different things to improve lesson quality. One of the most simple things that did just that was using better lighting.

I have been using natural light all throughout my classes until recently, as I rearranged furniture in my small home office. These made my natural light setup unavailable, and I had thought of using a commercial ring light. However, the problem of where to place it was an issue, as my home office had limited space. In order to maximize my space, I decided to try installing LED strips onto the screen bezel on my laptop.

This Instructable contains a simple proof-of-concept build, and the actual build that will be used. The final part contains a few suggestions that I could not yet try out myself.

With all that out of the way, let's get started!""")


def seed_projects():

    db.session.add(computer)
    db.session.add(phone)
    db.session.add(tablet)
    db.session.add(logic_probe)
    db.session.add(led_matrix)
    db.session.add(led_ring)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
