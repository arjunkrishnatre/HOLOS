import os
import random
import smtplib

from datetime import datetime, timedelta
from email.message import EmailMessage

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database.database import engine, Base

# Models
from models.user import User
from models.task import Task

# Routers
from routes.user import router as user_router
from routes.task import router as task_router
from routes.refrigerator import router as refrigerator_router
from routes.devices import router as devices_router


# ==========================================
# ENVIRONMENT
# ==========================================

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


# ==========================================
# APP
# ==========================================

app = FastAPI(
    title="HOLOS",
    version="1.0.0",
    description="HOLOS Smart Home AI Operating System"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# DATABASE
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# ROUTERS
# ==========================================

app.include_router(user_router)

app.include_router(task_router)

# ==========================================
# LG THINQ / REFRIGERATOR
# DO NOT REMOVE
# ==========================================

app.include_router(refrigerator_router)


# ==========================================
# UNIVERSAL DEVICE ROUTES
# WiZ / Future ecosystems
# ==========================================

app.include_router(devices_router)


# ==========================================
# EMAIL VERIFICATION
# ==========================================

verification_codes = {}


class VerificationRequest(BaseModel):
    email: str


class VerifyCodeRequest(BaseModel):
    email: str
    code: str


# ==========================================
# SEND VERIFICATION CODE
# ==========================================

@app.post("/auth/send-code")
def send_verification_code(data: VerificationRequest):

    email = data.email.strip().lower()

    if not email:

        return {
            "success": False,
            "message": "Email address is required."
        }

    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:

        print(
            "EMAIL ERROR: "
            "Email configuration is missing."
        )

        return {
            "success": False,
            "message": (
                "HOL.OS email service "
                "is not configured."
            )
        }

    # Generate 6-digit code
    code = str(
        random.randint(
            100000,
            999999
        )
    )

    # Code expires in 10 minutes
    expires_at = (
        datetime.utcnow()
        + timedelta(minutes=10)
    )

    verification_codes[email] = {
        "code": code,
        "expires_at": expires_at
    }

    # Create email
    message = EmailMessage()

    message["Subject"] = (
        "Your HOL.OS Verification Code"
    )

    message["From"] = EMAIL_ADDRESS
    message["To"] = email

    message.set_content(
        f"""
Welcome to HOL.OS.

Your email verification code is:

{code}

This code will expire in 10 minutes.

If you did not request this code,
you can safely ignore this email.

--------------------------------

HOL.OS
One Intelligence. Every Device.
"""
    )

    try:

        with smtplib.SMTP(
            "smtp.gmail.com",
            587
        ) as server:

            server.starttls()

            server.login(
                EMAIL_ADDRESS,
                EMAIL_PASSWORD
            )

            server.send_message(message)

        print(
            f"Verification code sent to {email}"
        )

        return {
            "success": True,
            "message": "Verification code sent."
        }

    except Exception as error:

        print(
            "EMAIL SEND ERROR:",
            error
        )

        return {
            "success": False,
            "message": (
                "Unable to send "
                "verification email."
            )
        }


# ==========================================
# VERIFY CODE
# ==========================================

@app.post("/auth/verify-code")
def verify_code(
    data: VerifyCodeRequest
):

    email = data.email.strip().lower()
    code = data.code.strip()

    stored = verification_codes.get(email)

    if not stored:

        return {
            "success": False,
            "message": (
                "No verification code found."
            )
        }

    # Check expiry
    if datetime.utcnow() > stored["expires_at"]:

        del verification_codes[email]

        return {
            "success": False,
            "message": (
                "Verification code expired."
            )
        }

    # Check code
    if code != stored["code"]:

        return {
            "success": False,
            "message": (
                "Incorrect verification code."
            )
        }

    # Successful verification
    del verification_codes[email]

    print(
        f"Email verified: {email}"
    )

    return {
        "success": True,
        "message": (
            "Email verified successfully."
        )
    }


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Welcome to HOLOS 🚀",
        "system": "Online",
        "version": "1.0.0"
    }


# ==========================================
# HEALTH
# ==========================================

@app.get("/health")
def health():

    return {
        "system": "HOLOS",
        "status": "Healthy"
    }


# ==========================================
# PROFILE
# ==========================================

@app.get("/profile")
def profile():

    return {
        "assistant": "HOLOS",
        "goal": (
            "Build a Personal AI "
            "Operating System"
        ),
        "status": "Online"
    }