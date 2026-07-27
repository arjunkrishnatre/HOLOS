from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from schemas.user import UserCreate, UserResponse
from crud.user import   create_user

router = APIRouter()



@router.post("/users",response_model=UserResponse)
def add_user(user: UserCreate, db: Session = Depends(get_db) ):
    return create_user(db,user)