"""
LG ThinQ API Service Layer
HOLOS Smart Home System
"""

import os
import uuid
import requests

from dotenv import load_dotenv

load_dotenv()


LG_PAT = os.getenv("LG_THINQ_PAT")

BASE_URL = "https://api-kic.lgthinq.com"

LG_API_KEY = "v6GFvkweNo7DK7yD3ylIZ9w52aKBU0eJ7wLXkSR3"

CLIENT_ID = "HOLOS-001"


def lg_headers():

    return {
        "Authorization": f"Bearer {LG_PAT}",
        "x-message-id": str(uuid.uuid4()),
        "x-country": "IN",
        "x-client-id": CLIENT_ID,
        "x-api-key": LG_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }


# -----------------------------
# Get LG Devices
# -----------------------------

def get_devices():

    url = f"{BASE_URL}/devices"

    response = requests.get(
        url,
        headers=lg_headers()
    )

    print("LG RESPONSE:")
    print(response.status_code)
    print(response.text)

    response.raise_for_status()

    return response.json()



# -----------------------------
# Refrigerator Profile
# -----------------------------

def get_device_profile(device_id):

    url = f"{BASE_URL}/devices/{device_id}/profile"

    response = requests.get(
        url,
        headers=lg_headers()
    )

    response.raise_for_status()

    return response.json()



# -----------------------------
# Refrigerator Status
# -----------------------------

def get_device_status(device_id):

    url = f"{BASE_URL}/devices/{device_id}/state"

    response = requests.get(
        url,
        headers=lg_headers()
    )

    response.raise_for_status()

    return response.json()



# -----------------------------
# Refrigerator Control
# -----------------------------

def control_device(device_id, command):

    url = f"{BASE_URL}/devices/{device_id}/control"

    print("\n============================")
    print("🚀 SENDING COMMAND")
    print(command)
    print("============================\n")

    response = requests.post(
        url,
        headers=lg_headers(),
        json=command,
        timeout=20
    )

    print("\n============================")
    print("STATUS:", response.status_code)
    print("HEADERS:", response.headers)
    print("BODY:")
    print(response.text)
    print("============================\n")

    return response.json()