from django.http import HttpResponse
from requests import get
from ..constants import env_constants
import os

def index(request):
    token = os.getenv(env_constants.HOME_ASSISTANT_TOKEN_KEY)
    url = "http://192.168.1.65:8123/api/states"
    headers = {
        "Authorization": f"Bearer {token}",
        "content-type": "application/json",
    }

    response = get(url, headers=headers)
    print(response.text)
    return HttpResponse(response.text)