import asyncio

from pywizlight import wizlight, PilotBuilder
from pywizlight.discovery import discover_lights


# =========================================================
# SAVED DEVICES
# =========================================================

WIZ_DEVICES = {
    "192.168.29.181": {
        "name": "Philips WiZ Light",
        "ip": "192.168.29.181",
        "mac": "d8a011faab5f",
        "ecosystem": "Philips WiZ",
        "type": "light",
        "connected": True,
        "online": True,
    }
}


# =========================================================
# SAVED DEVICES
# =========================================================

def get_saved_wiz_devices():
    return list(WIZ_DEVICES.values())


def save_wiz_device(
    ip: str,
    name: str = "Philips WiZ Light",
    mac: str | None = None
):

    WIZ_DEVICES[ip] = {
        "name": name,
        "ip": ip,
        "mac": mac,
        "ecosystem": "Philips WiZ",
        "type": "light",
        "connected": True,
        "online": True,
    }

    return WIZ_DEVICES[ip]


def remove_wiz_device(ip: str):

    if ip in WIZ_DEVICES:

        del WIZ_DEVICES[ip]

        return {
            "success": True,
            "message": "WiZ device removed."
        }

    return {
        "success": False,
        "message": "WiZ device not found."
    }


# =========================================================
# DISCOVERY
# =========================================================

async def scan_wiz_devices():

    try:

        bulbs = await discover_lights(
            broadcast_address="255.255.255.255"
        )

        devices = []

        for bulb in bulbs:

            devices.append({
                "name": "Philips WiZ Light",
                "ip": bulb.ip,
                "mac": getattr(
                    bulb,
                    "mac",
                    None
                ),
                "ecosystem": "Philips WiZ",
                "type": "light",
                "connected": True,
                "online": True,
            })

        return devices

    except Exception as error:

        print(
            "WIZ DISCOVERY ERROR:",
            error
        )

        return []


# =========================================================
# BULB
# =========================================================

def get_bulb(ip: str):

    if not ip:
        raise ValueError(
            "WiZ bulb IP is required."
        )

    return wizlight(ip)


# =========================================================
# TURN ON
# =========================================================

async def turn_on(ip: str):

    bulb = get_bulb(ip)

    print(
        f"WIZ: Sending ON command to {ip}"
    )

    await bulb.turn_on()

    print(
        f"WIZ: ON command sent successfully"
    )

    return {
        "success": True,
        "message": "WiZ light turned ON.",
        "ip": ip
    }


# =========================================================
# TURN OFF
# =========================================================

async def turn_off(ip: str):

    bulb = get_bulb(ip)

    print(
        f"WIZ: Sending OFF command to {ip}"
    )

    await bulb.turn_off()

    print(
        "WIZ: OFF command sent successfully"
    )

    return {
        "success": True,
        "message": "WiZ light turned OFF.",
        "ip": ip
    }


# =========================================================
# BRIGHTNESS
# =========================================================

async def set_brightness(
    ip: str,
    brightness: int
):

    brightness = max(
        1,
        min(
            100,
            int(brightness)
        )
    )

    bulb = get_bulb(ip)

    pilot = PilotBuilder(
        brightness=brightness
    )

    await bulb.turn_on(pilot)

    return {
        "success": True,
        "message": (
            f"Brightness set to "
            f"{brightness}%."
        ),
        "brightness": brightness,
        "ip": ip
    }


# =========================================================
# RGB COLOR
# =========================================================

async def set_color(
    ip: str,
    red: int,
    green: int,
    blue: int
):

    red = max(
        0,
        min(255, int(red))
    )

    green = max(
        0,
        min(255, int(green))
    )

    blue = max(
        0,
        min(255, int(blue))
    )

    bulb = get_bulb(ip)

    pilot = PilotBuilder(
        rgb=(
            red,
            green,
            blue
        )
    )

    await bulb.turn_on(pilot)

    return {
        "success": True,
        "message": "WiZ color changed.",
        "rgb": {
            "r": red,
            "g": green,
            "b": blue
        },
        "ip": ip
    }


# =========================================================
# STATUS
# =========================================================

async def get_status(ip: str):

    bulb = get_bulb(ip)

    state = await bulb.updateState()

    return {
        "success": True,
        "ip": ip,
        "state": {
            "is_on": (
                getattr(
                    state,
                    "state",
                    None
                ) == "ON"
            ),

            "brightness": getattr(
                state,
                "dimming",
                None
            ),

            "r": getattr(
                state,
                "r",
                None
            ),

            "g": getattr(
                state,
                "g",
                None
            ),

            "b": getattr(
                state,
                "b",
                None
            )
        }
    }