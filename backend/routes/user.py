from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from schemas.user import (
    UserCreate,
    UserLogin,
    VerifyUser,
    UserResponse
)

from crud.user import (
    create_user,
    get_user_by_email,
    verify_user,
    authenticate_user,
    update_verification_code
)

from auth.email import send_verification_email

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# ----------------------------------
# Signup
# ----------------------------------

@router.post("/signup", response_model=UserResponse)
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    new_user = create_user(
        db,
        user
    )

    send_verification_email(
        new_user.email,
        new_user.verification_code
    )

    return new_user


# ----------------------------------
# Verify Email
# ----------------------------------

@router.post("/verify")
def verify(
    data: VerifyUser,
    db: Session = Depends(get_db)
):

    user = verify_user(
        db,
        data.email,
        data.verification_code
    )

    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid verification code."
        )

    return {
        "message": "Account verified successfully."
    }


# ----------------------------------
# Login
# ----------------------------------

@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        data.email,
        data.password
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if user == "NOT_VERIFIED":
        raise HTTPException(
            status_code=403,
            detail="Please verify your email first."
        )

    return {
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email
        }
    }


# ----------------------------------
# Resend OTP
# ----------------------------------

@router.post("/resend-otp")
def resend_otp(
    email: str,
    db: Session = Depends(get_db)
):

    otp = update_verification_code(
        db,
        email
    )

    if otp is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    send_verification_email(
        email,
        otp
    )

    return {
        "message": "Verification email sent."
    }