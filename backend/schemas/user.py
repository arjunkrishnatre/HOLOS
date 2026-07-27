from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    assistant: str
    goal: str
    status: str

class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id:int

    class Config:
        from_attributes = True
