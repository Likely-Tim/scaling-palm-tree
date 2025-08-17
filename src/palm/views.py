from django.http import HttpResponse
from requests import get

def index(request):
    url = "http://192.168.1.65:8123/api/states"
    headers = {
        "content-type": "application/json",
    }

    response = get(url, headers=headers)
    print(response.text)
    return HttpResponse(response.text)