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
pi_screen = Project(userId=2, title="Raspberry Pi, Camera, and SPI Screen",
                    description="""HDMI driver screen or SPI driver screen more suitable to work with Raspberry Pi?

Raspberry Pi 3B, 4B and zero serials provide the HDMI interface that can connect an HDMI driver screen directly. The screen would show the Raspbian desktop directly, does not require programming. Although it is like the computer display to use, the HDMI screen is difficult to deeply develop for the amateur. There are lots of sizes for the screen: 3.5inch, 7inch, 12inch and more. For the portability, the size of 3.5inch is the best choice that it can be carried easily working with Pi outdoor. However, it has a hard problem that it would display all the OS desktop that the icon and word shown on the display is small and unclean to check. The HDMI screen with a small size would cause the touch mistake when touching the small icon by finger. The small words and the touch mistake are terrible and hard to use.

For the SPI driver screen, different from the HDMI driver one, it connects with the Pi by the GPIO, that the Pi outputs the data of the picture through GPIO(SPI). Although it can’t show the OS desktop directly, it is open for customers and suitable for programming that screen can display anything that you developed on the code. The SPI-driver Screen also has lots of sizes that contain 2.8inch, 3.2inch, 3.5inch and more, and the 3.5inch or 3.2inch one is sufficient to show the picture and comfortable for holding. Besides, the screen has more portability to work with PI and is cheaper than the HDMI screen.

In a word, HDMI display is suitable for applications that run on OS, while the SPI display can be more convenient for light applications such as IoT/Smart-home…
There is a combination version of Pi and the SPI driver screen developed by Makerfabs. I will use it to make a camera and show the effect which the SPI screen works with the Pi.""")


def seed_projects():

    db.session.add(computer)
    db.session.add(phone)
    db.session.add(tablet)
    db.session.add(logic_probe)
    db.session.add(led_matrix)
    db.session.add(led_ring)
    db.session.add(pi_screen)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
