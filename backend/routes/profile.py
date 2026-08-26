from fastapi import APIRouter

router = APIRouter()


@router.get("/profile")
def profile():
    return {
        "name": "Himanshu",
        "assistant": "LifeOS AI",
        "goal": "Build my personal AI operating system",
        "status": "Learning"
    }
