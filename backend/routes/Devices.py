from fastapi import APIRouter, HTTPException

from services.wiz import (
    scan_wiz_devices,
    get_saved_wiz_devices,
    turn_on,
    turn_off,
    set_brightness,
    set_color,
    get_status,
)


router = APIRouter(
    prefix="/devices",
    tags=["Devices"]
)


# =========================================================
# SAVED WIZ DEVICES
# =========================================================

@router.get("/wiz")
def saved_wiz_devices():

    try:

        devices = get_saved_wiz_devices()

        return {
            "success": True,
            "devices": devices
        }

    except Exception as error:

        print("WIZ SAVED DEVICES ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# SCAN WIZ DEVICES
# =========================================================

@router.get("/wiz/scan")
async def scan_wiz():

    try:

        devices = await scan_wiz_devices()

        return {
            "success": True,
            "devices": devices
        }

    except Exception as error:

        print("WIZ SCAN ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# TURN ON
# =========================================================

@router.post("/wiz/{ip}/on")
async def wiz_on(ip: str):

    try:

        return await turn_on(ip)

    except Exception as error:

        print("WIZ ON ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# TURN OFF
# =========================================================

@router.post("/wiz/{ip}/off")
async def wiz_off(ip: str):

    try:

        return await turn_off(ip)

    except Exception as error:

        print("WIZ OFF ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# BRIGHTNESS
# =========================================================

@router.post("/wiz/{ip}/brightness/{brightness}")
async def wiz_brightness(
    ip: str,
    brightness: int
):

    try:

        return await set_brightness(
            ip,
            brightness
        )

    except Exception as error:

        print(
            "WIZ BRIGHTNESS ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# COLOR
# =========================================================

@router.post("/wiz/{ip}/color")
async def wiz_color(
    ip: str,
    red: int,
    green: int,
    blue: int
):

    try:

        return await set_color(
            ip,
            red,
            green,
            blue
        )

    except Exception as error:

        print(
            "WIZ COLOR ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# =========================================================
# STATUS
# =========================================================

@router.get("/wiz/{ip}/status")
async def wiz_status(ip: str):

    try:

        return await get_status(ip)

    except Exception as error:

        print(
            "WIZ STATUS ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )