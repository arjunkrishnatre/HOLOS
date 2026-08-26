from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    complete: bool = False
    user_id: int


class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True
