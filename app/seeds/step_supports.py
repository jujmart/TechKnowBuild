from app.models import db, Step_Support


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
    logic_probe_step1_support1 = Step_Support(
        stepId=10, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe1Photo1.jpeg")
    logic_probe_step2_support1 = Step_Support(
        stepId=11, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe2Photo1.jpeg")
    logic_probe_step3_support1 = Step_Support(
        stepId=12, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe3Photo1.jpeg")
    logic_probe_step4_support1 = Step_Support(
        stepId=13, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe4Photo1.jpeg")
    logic_probe_step5_support1 = Step_Support(
        stepId=14, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe5Photo1.jpeg")
    logic_probe_step6_support1 = Step_Support(
        stepId=15, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe6Photo1.jpeg")
    logic_probe_step6_support2 = Step_Support(
        stepId=15, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LogicProbe6Photo2.jpeg")
    led_matrix_step1_support1 = Step_Support(
        stepId=16, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix1Photo1.jpeg")
    led_matrix_step1_support2 = Step_Support(
        stepId=16, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix1Photo2.jpeg")
    led_matrix_step2_support1 = Step_Support(
        stepId=17, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix2Photo1.png")
    led_matrix_step2_support2 = Step_Support(
        stepId=17, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix2Photo2.jpeg")
    led_matrix_step3_support1 = Step_Support(
        stepId=18, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix3Photo1.jpeg")
    led_matrix_step4_support1 = Step_Support(
        stepId=19, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix4Photo1.png")
    led_matrix_step4_support2 = Step_Support(
        stepId=19, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix4Photo2.png")
    led_matrix_step5_support1 = Step_Support(
        stepId=20, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix5Photo1.jpeg")
    led_matrix_step5_support2 = Step_Support(
        stepId=20, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix5Photo2.jpeg")
    led_matrix_step6_support1 = Step_Support(
        stepId=21, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix6Photo1.png")
    led_matrix_step6_support2 = Step_Support(
        stepId=21, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix6Photo2.jpeg")
    led_matrix_step7_support1 = Step_Support(
        stepId=22, stepSupportType="image", stepSupportUrl="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Step-Support/LEDMatrix7Photo1.jpeg")

    support_list = [computer_step1_support1, computer_step1_support2, computer_step2_support1,
                    phone_step1_support1, phone_step2_support1, phone_step2_support2,
                    tablet_step1_support1, tablet_step2_support1, logic_probe_step1_support1,
                    logic_probe_step2_support1, logic_probe_step3_support1, logic_probe_step4_support1,
                    logic_probe_step5_support1, logic_probe_step6_support1, logic_probe_step6_support2,
                    led_matrix_step1_support1, led_matrix_step1_support2, led_matrix_step2_support1,
                    led_matrix_step2_support2, led_matrix_step3_support1, led_matrix_step4_support1,
                    led_matrix_step4_support2, led_matrix_step5_support1, led_matrix_step5_support2,
                    led_matrix_step6_support1, led_matrix_step6_support2, led_matrix_step7_support1]

    for support in support_list:
        db.session.add(support)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_step_supports():
    db.session.execute('TRUNCATE step_supports RESTART IDENTITY CASCADE;')
    db.session.commit()
