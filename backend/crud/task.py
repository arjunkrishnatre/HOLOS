from sqlalchemy.orm import Session

from models.task import Task
from schemas.task import TaskCreate


def create_task(db: Session, task: TaskCreate):
    db_task = Task(
        title=task.title,
        description=task.description,
        complete=task.complete,
        user_id=task.user_id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task
