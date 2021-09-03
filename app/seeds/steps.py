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


def seed_steps():

    step_list = [computer_step1, computer_step2, computer_step3, phone_step1,
                 phone_step2, phone_step3, tablet_step1, tablet_step2, tablet_step3,
                 logic_probe_step1, logic_probe_step2, logic_probe_step3, logic_probe_step4,
                 logic_probe_step5, logic_probe_step6]

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
