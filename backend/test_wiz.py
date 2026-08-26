import asyncio
from pywizlight import wizlight


IP = "192.168.29.181"


async def main():

    print("Connecting to WiZ...")

    bulb = wizlight(IP)

    try:

        print("Sending ON command...")

        await bulb.turn_on()

        print("SUCCESS: ON command sent!")

        await asyncio.sleep(1)

        print("Reading bulb state...")

        state = await bulb.updateState()

        print("STATE:")
        print(state)

    except Exception as error:

        print("WIZ ERROR:")
        print(type(error).__name__)
        print(error)


asyncio.run(main())