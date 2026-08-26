import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_verification_email(receiver_email: str, otp: str):

    subject = "HOLOS Verification Code"

    body = f"""
Welcome to HOLOS!

Your verification code is:

{otp}

This code will expire in 10 minutes.

If you did not create a HOLOS account, you can ignore this email.

— HOLOS Team
"""

    message = MIMEMultipart()

    message["From"] = EMAIL_ADDRESS
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.sendmail(
            EMAIL_ADDRESS,
            receiver_email,
            message.as_string()
        )

        server.quit()

        return True

    except Exception as e:

        print("EMAIL ERROR:", e)

        return False