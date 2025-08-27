import os
import json
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import Device
from django.http import JsonResponse, HttpResponseBadRequest

HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
ENTITY_ID = "entity_id"
FRIENDLY_NAME = "friendly_name"

@csrf_exempt
def index(request):
    match request.method:
        case "GET":
            devices = Device.objects.filter(home_assistant_url=HOME_ASSISTANT_URL)
            return JsonResponse([model_to_dict(device) for device in devices], safe=False)
        case "POST":
            input = {}
            try:
                input = json.loads(request.body)
            except Exception:
                return HttpResponseBadRequest()
            entity_domain = input.get(ENTITY_ID).split('.', 1)[0]
            device, created = Device.objects.get_or_create(
                    home_assistant_url=HOME_ASSISTANT_URL,
                    domain=entity_domain, 
                    entity_id=input.get(ENTITY_ID), 
                    friendly_name=input.get(FRIENDLY_NAME)
            )
            return JsonResponse(model_to_dict(device))


