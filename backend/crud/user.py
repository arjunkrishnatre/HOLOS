from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate

from auth.security import hash_password, verify_password
from auth.otp import generate_otp


# ----------------------------
# Get user by email
# ----------------------------

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(
        User.email == email
    ).first()


# ----------------------------
# Create user
# ----------------------------

def create_user(db: Session, user: UserCreate):

    otp = generate_otp()

    db_user = User(

        full_name=user.full_name,

        email=user.email,

        hashed_password=hash_password(
            user.password
        ),

        date_of_birth=user.date_of_birth,

        gender=user.gender,

        verification_code=otp,

        is_verified=False,

        assistant="HOLOS",

        goal="Build a personal AI operating system",

        status="Active"

    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user


# ----------------------------
# Verify account
# ----------------------------

def verify_user(
    db: Session,
    email: str,
    verification_code: str
):

    user = get_user_by_email(
        db,
        email
    )

    if user is None:
        return None

    if user.verification_code != verification_code:
        return None

    user.is_verified = True
    user.verification_code = None

    db.commit()

    db.refresh(user)

    return user


# ----------------------------
# Generate new OTP
# ----------------------------

def update_verification_code(
    db: Session,
    email: str
):

    user = get_user_by_email(
        db,
        email
    )

    if user is None:
        return None

    new_code = generate_otp()

    user.verification_code = new_code

    db.commit()

    db.refresh(user)

    return new_code


# ----------------------------
# Login
# ----------------------------

def authenticate_user(
    db: Session,
    email: str,
    password: str
):

    user = get_user_by_email(
        db,
        email
    )

    if user is None:
        return None

    if not verify_password(
        password,
        user.hashed_password
    ):
        return None

    if not user.is_verified:
        return "NOT_VERIFIED"

    return user