import os
from requests import get, exceptions
from ..constants import env_constants

HOME_ASSISTANT_TOKEN = os.getenv(env_constants.HOME_ASSISTANT_TOKEN)
HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
DEFAULT_HEADERS = {"Authorization": f"Bearer {HOME_ASSISTANT_TOKEN}", "content-type": "application/json",}

def get_states():
    return _call("api/states")

def get_services():
    return _call("api/services")

def _call(path):
    url = HOME_ASSISTANT_URL + "/" + path
    print(f"Sending request to {url}.")
    response = get(url, headers=DEFAULT_HEADERS)
    try:
        response.raise_for_status()
    except exceptions.HTTPError as error:
        print("HA Client Error: " + str(error))
    return response
