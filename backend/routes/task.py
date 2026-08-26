from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from schemas.task import TaskCreate, TaskResponse
from crud.task import create_task


router = APIRouter()


@router.post("/tasks", response_model=TaskResponse)
def add_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)
