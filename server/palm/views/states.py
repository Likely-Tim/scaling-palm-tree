import json
from django.http import JsonResponse
from ..clients import home_assistant_client


def index(request):
    states = home_assistant_client.get_states()

    data = {}
    try: 
        data = json.loads(states.text)
    except:
        data = {}

    return JsonResponse(list(data), safe=False)
