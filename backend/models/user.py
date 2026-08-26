from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from database.database import Base

from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Authentication
    full_name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password = Column(
        String,
        nullable=False
    )

    date_of_birth = Column(String)

    gender = Column(String)

    is_verified = Column(
        Boolean,
        default=False
    )

    verification_code = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # Existing HOLOS fields
    assistant = Column(
        String,
        default="HOLOS"
    )

    goal = Column(
        String,
        default="Build a personal AI operating system"
    )

    status = Column(
        String,
        default="Active"
    )

    # Relationship
    tasks = relationship(
        "Task",
        back_populates="user"
    )
