from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(String)

    complete = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="tasks")
