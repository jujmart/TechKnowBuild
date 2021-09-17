from app.models import db, Step

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
    projectId=3, title='Put together parts', instruction='This part goes here. This part goes here.')
tablet_step3 = Step(
    projectId=3, title='Finishing touches', instruction='Finish it with this.')
logic_probe_step1 = Step(
    projectId=4, title='PCB of the Logic Probe', instruction="""This circuit design using SMD components to minimize the board size. The dimensions of the soldered PCB are around 70mm × 14mm × 6.6mm, and the 3D printed housing is 90mm × 26mm × 14mm only.

The KiCAD PCB design files, schematics, Gerber files, and test setup schematic of this project are available at https://drive.google.com/file/d/1LoceKmOqazPlLFVXJ9uzRg2J7VZ-QIvA/view.""")
logic_probe_step2 = Step(
    projectId=4, title='Soldering the PCB', instruction="""No special soldering equipment is required to assemble this PCB. As shown in the video, this PCB can assemble using a standard 30W or 40W soldering iron. Always use soldering paste with SMD components to achieve good-quality, clean joints.""")
logic_probe_step3 = Step(
    projectId=4, title='Making Probe Tip', instruction="""In our prototype, we construct this probe-tip using 12 SWG (2.6mm) enameled copper wire. The tip was formed by sanding and grinding the end of the copper wire.

The probe-tip preparation and installation steps are available in the video clip attached to this article.""")
logic_probe_step4 = Step(
    projectId=4, title='Enclosure', instruction="""The suitable enclosure design for this logic probe is available at TinkerCAD. 3D print the top and bottom covers of the enclosure using ABS or PLA and attach the PCB to it as shown in the video.

This enclosure design assumes that the PCB populates with 3mm LEDs and 12 SWG (2.6mm) probe-tip. If the components differ from the above limits, then the enclosure layout may need to adjust accordingly.

In our prototype, we 3D print the enclosure using 1.75mm PLA filament and bind both top and bottom covers using PVC solvent cement.""")
logic_probe_step5 = Step(
    projectId=4, title='Testing the Logic Probe', instruction="""The test setup used to test this logic probe consists of a NE555 timer, two CD4040 12-stage counters, and CD4017 Johnson counter ICs. In this test setup, NE555 delivers 16kHz output with approximately a 50% duty cycle. CD4040 counters are used as frequency dividers to produce 500Hz and 15Hz waveforms.

This test circuit can use to check and verify all the conditions of the logic probe. This test circuit fully covers logic 1, 0 state identifications, and frequency pulse detection tests.

This test setup is needed if you do not have the frequency synthesizer/generator to test the logic probe functionality.""")
logic_probe_step6 = Step(
    projectId=4, title='Using the Logic Probe', instruction="""This probe got three LED indicators, and it displays logic levels (high and low states) and pulse signals up to 1.8MHz (on 60% duty cycle).

To operate this logic probe, connect the power cable of the logic probe to the DC power supply. The voltage supply should be from 3V to 15V. Voltages higher than this range can damage the ICs of the logic probe.

Depending on the circuit, set the logic family switch to the CMOS or TTL position and start testing by touching the probe tip to the components of the circuit board. Refer to the table attached to this section to interpret the LED output.

The pulse indicator (Red LED) is sensitive to higher frequency pulse signals ranging from 13kHz to 200kHz with an average 50% duty cycle. The effective range of the pulse indicator illustrates in the chart attached to this section. The maximum frequency support by this logic probe is 1.8MHz on a 60% duty cycle.""")
led_matrix_step1 = Step(
    projectId=5, title='Which LEDs to Use?', instruction="""For this project I decided to use a WS2815 LED-strip with 60 LEDs/m.

 - Each LED has a small IC, so we can control every LED's color and brightness individually using the data lines and an Arduino library like "FastLED"
 - With the LEDs being in a strip we basically don't have to solder
 - They are supplied with 12V DC. This is better than cheaper alternatives like the WS2812B because you need a power supply with less amperage (more in the next step)
 - There is a backup data line, if a LED breaks

If you find a suitable power supply (see next step) you could theoretically also use the cheaper WS2812B LED-strip. This has the advantage, that you can power the microcontroller directly and don't need a buck converter for that, but I would recommend using WS2815 so I based my code and instructions on them.""")
led_matrix_step2 = Step(
    projectId=5, title='Microcontroller', instruction="""I used a NodeMCU board for this project. It has WiFi, USB to UART (you can program it via USB), and an on-board voltage regulator, so it's fairly easy to work with it. Unfortunately it can't be powered by 12V, so I needed a buck converter to regulate the voltage. In my cased I used one with an USB-output, so i can just use a USB-cable to connect the board.

Along with the NodeMCU I used a SD-card with the corresponding reader to store:

 - the HTML/CSS/js of the web page
 - the saved pixel arts that I created using the web app
 - the names of the pixel arts so I can select them on the web page""")
led_matrix_step3 = Step(
    projectId=5, title='Diffuser', instruction="""First I tested 3 mm thick opal polystyrene. But as you can see on the first photo, the lines of the grid were blurry and not as sharp as I hoped. I then tried 1 mm thick normal polystyrene, it looked great, but it absorbed the light too much so we would have to have the LEDs on full brightness all the time.(2nd photo) In the end I bought some acrylic glass and used very fine sandpaper to make it look frosted.(4th photo) In my opinion it looked the best from all.""")
led_matrix_step4 = Step(
    projectId=5, title='CAD', instruction="""Based on this design choices and some additional measurements I designed the whole matrix in Fusion 360. If you want to edit something yourself or just want to see how it looks you can find the file in the google drive link with the rest of the necessary files I will provide during this Instructable.

Finally we can make our list of materials and start building!""")
led_matrix_step5 = Step(
    projectId=5, title='Laser Cutting', instruction="""You will need just 3 files:

 1. 1x The led spacer will hold the led strips in place (3 mm MDF)
 2. 2x the grid which will give us the tested distance between led and diffuser (4mm MDF)
 3. 1x the grid with a black coating (I used 3mm), so the bars you see through the frosted glass are dark. You can also use 4mm normal MDF again.
 4. Box (3 mm MDF)

I used a 60W laser with a working space of 60x40 cm at full power. For 4 mm MDF it needed 2-3 repetitions.""")
led_matrix_step6 = Step(
    projectId=5, title='Mounting the LEDs', instruction="""Start by cutting the LED strip in 16 parts with 16 LEDs each. Then use the connectors to link the strips. It is much easier to insert them if you bend the pins of the connector up a bit. When you don't have the connectors you would have to solder the strips now. Be aware that they have to be connected in the right direction. A little arrow next to each led tells you the direction of the dataline. It has to be continuous in a serpentine/snake like shape and start in the bottom left corner, else the code won't work (photo). Be careful no to short anything, the connectors aren't color coded right.

After that start in the bottom left corner to put the LEDs in the holes. I used some tape to hold them down. This process can be a bit fiddly, but after this a big part is already done.

I recommend soldering two wires to + and - on the top of the strip (marked on the photo with a black arrow) so we are feeding current in on the top and bottom for even brightness and less problems with heating up of the LEDs and wires.""")
led_matrix_step7 = Step(
    projectId=5, title='Make It Fit the Case', instruction="""The case is designed very tight (it isn't a bug, it's a feature) so we can't fit the plate with the connectors in right now, because the cables of the connectors are in the way. For that i designed a small 3D printed part that we glue the connectors on at an angle. Start by securing the 3D printed part to the wood and then use some (hot) glue to secure the connectors. By doing this the plate with the LEDs will finally fit into the case and the LED strips are secured.

I have a rather large 3D printer so I was able to print the 29cm part in one go, but I also included a file where it is split in two smaller parts.""")


def seed_steps():

    step_list = [computer_step1, computer_step2, computer_step3, phone_step1,
                 phone_step2, phone_step3, tablet_step1, tablet_step2, tablet_step3,
                 logic_probe_step1, logic_probe_step2, logic_probe_step3, logic_probe_step4,
                 logic_probe_step5, logic_probe_step6, led_matrix_step1, led_matrix_step2,
                 led_matrix_step3, led_matrix_step4, led_matrix_step5, led_matrix_step6,
                 led_matrix_step7]

    for step in step_list:
        db.session.add(step)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
