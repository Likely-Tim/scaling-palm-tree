import os
from requests import get
from ..constants import env_constants

HOME_ASSISTANT_TOKEN = os.getenv(env_constants.HOME_ASSISTANT_TOKEN)
HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
DEFAULT_HEADERS = {"Authorization": f"Bearer {HOME_ASSISTANT_TOKEN}", "content-type": "application/json",}

def get_states():
    return _call("api/states")

def _call(path):
    url = HOME_ASSISTANT_URL + "/" + path
    print(f"Sending request to {url}.")
    return get(url, headers=DEFAULT_HEADERS)