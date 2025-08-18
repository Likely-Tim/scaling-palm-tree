import os
from requests import get
from ..constants import env_constants

HOME_ASSISTANT_TOKEN = os.getenv(env_constants.HOME_ASSISTANT_TOKEN_KEY)
HOME_ASSISTANT_URL = "http://192.168.1.65:8123"
DEFAULT_HEADERS = {"Authorization": f"Bearer {HOME_ASSISTANT_TOKEN}", "content-type": "application/json",}

def get_states():
    return _call("api/states")

def _call(path):
    return get(f"{HOME_ASSISTANT_URL}/{path}", headers=DEFAULT_HEADERS)