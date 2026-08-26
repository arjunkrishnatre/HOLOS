from pydantic import BaseModel, EmailStr
from typing import Optional


# ---------- Signup ----------

class UserCreate(BaseModel):

    full_name: str

    email: EmailStr

    password: str

    date_of_birth: str

    gender: str


# ---------- Login ----------

class UserLogin(BaseModel):

    email: EmailStr

    password: str


# ---------- Verify Email ----------

class VerifyUser(BaseModel):

    email: EmailStr

    verification_code: str


# ---------- Response ----------

class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    is_verified: bool

    assistant: Optional[str] = "HOLOS"

    goal: Optional[str] = "Build a personal AI operating system"

    status: Optional[str] = "Active"

    class Config:
        from_attributes = True