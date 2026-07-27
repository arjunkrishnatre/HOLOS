from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate

def create_user(db: Session, user: UserCreate):
    db_user = User(
        name=user.name,
        assistant=user.assistant,
        goal=user.goal,
        status=user.status
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
