import random
import string


def generate_otp(length: int = 6) -> str:
    """
    Generate a numeric OTP.
    Default: 6 digits.
    """
    return "".join(
        random.choices(
            string.digits,
            k=length
        )
    )