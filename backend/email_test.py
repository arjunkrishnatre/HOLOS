import smtplib
import random


# Generate a 6 digit verification code
def generate_code():
    return str(random.randint(100000, 999999))


# Send verification email
def send_code(receiver_email):

    code = generate_code()

    message = f"""
HOLOS AI Assistant 

Your verification code is:

{code}

Use this code to verify your email.

Welcome to HOLOS Smart Home.
"""


    server = smtplib.SMTP("smtp.gmail.com", 587)

    server.starttls()

    server.login(
        sender_email,
        app_password
    )

    server.sendmail(
        sender_email,
        receiver_email,
        message
    )

    server.quit()


    print("Email sent successfully!")
    print("Your verification code is:", code)



# ============================
# HOLOS EMAIL SETTINGS
# ============================

# Gmail account that sends the email
sender_email = "arjunkrishnatre3@gmail.com"


# Google App Password
app_password = "xuaa ldbt mmtc ffpn"


# Gmail account that receives the code
send_code("arjunkrishnatre3@gmail.com")
