from routes.user import router as user_router
from fastapi import FastAPI

from database.database import engine, Base
from models import user


app = FastAPI(
    title="LifeOS API",
    version="0.1.0"
)


Base.metadata.create_all(bind=engine)
app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to LifeOS 🚀",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "system": "LifeOS",
        "health": "excellent"
    }


@app.get("/profile")
def profile():
    return {
        "name": "Himanshu",
        "assistant": "LifeOS AI",
        "goal": "Build my personal AI operating system",
        "status": "Learning"
    }







