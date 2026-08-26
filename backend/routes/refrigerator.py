"""
HOLOS Refrigerator Routes
LG ThinQ Integration
"""

from fastapi import APIRouter, HTTPException

from services.lg_thinq import (
    get_devices,
    get_device_status,
    get_device_profile,
)

router = APIRouter(
    prefix="/refrigerator",
    tags=["Refrigerator"]
)


# =====================================================
# LG DEVICE DISCOVERY
# =====================================================

@router.get("/devices")
def devices():

    try:
        devices = get_devices()

        return {
            "success": True,
            "ecosystem": "LG ThinQ",
            "devices": devices
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================================
# CONNECT LG THINQ
# =====================================================

@router.post("/connect/lg")
def connect_lg():

    try:

        devices = get_devices()

        return {
            "success": True,
            "ecosystem": "LG ThinQ",
            "message": "LG ThinQ connected successfully.",
            "devices": devices
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================================
# GET FRIDGE STATUS
# =====================================================

@router.get("/{device_id}")
def refrigerator_status(device_id: str):

    try:

        return get_device_status(device_id)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================================
# GET DEVICE PROFILE
# =====================================================

@router.get("/{device_id}/profile")
def refrigerator_profile(device_id: str):

    try:

        return get_device_profile(device_id)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================================
# TEMPERATURE
# =====================================================

@router.post("/temperature")
def update_temperature(
    fridge_temperature: float,
    freezer_temperature: float
):

    return {
        "success": True,
        "message": "Temperature control is temporarily disabled.",
        "requested": {
            "fridge": fridge_temperature,
            "freezer": freezer_temperature
        }
    }


# =====================================================
# EXPRESS FREEZE
# =====================================================

@router.post("/express-freeze")
def express_freeze(enabled: bool):

    return {
        "success": True,
        "message": "Express Freeze control is temporarily disabled.",
        "requested": {
            "enabled": enabled
        }
    }