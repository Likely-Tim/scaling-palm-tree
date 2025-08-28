import os
from requests import get, exceptions, post
from ..constants import env_constants

HOME_ASSISTANT_TOKEN = os.getenv(env_constants.HOME_ASSISTANT_TOKEN)
HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
DEFAULT_HEADERS = {"Authorization": f"Bearer {HOME_ASSISTANT_TOKEN}", "content-type": "application/json",}

def get_states():
    return _call("api/states")

def get_entity_state(entityId):
    return _call(f"api/states/{entityId}")

def get_services():
    return _call("api/services")

def post_services(domain, service, entity_id, ext = None):
    data = {"entity_id": entity_id}
    if ext:
        data.update(ext)

    return _callPost(f"api/services/{domain}/{service}", data)

def _call(path):
    url = HOME_ASSISTANT_URL + "/" + path
    print(f"Sending request to {url}.")
    response = get(url, headers=DEFAULT_HEADERS)
    try:
        response.raise_for_status()
    except exceptions.HTTPError as error:
        print("HA Client Error: " + str(error))
    return response

def _callPost(path, data):
    url = HOME_ASSISTANT_URL + "/" + path
    print(f"Sending request to {url} with a paylod of {data}.")

    response = post(url, headers=DEFAULT_HEADERS, json=data)
    try:
        response.raise_for_status()
    except exceptions.HTTPError as error:
        print("HA Client Error: " + str(error))
    return response