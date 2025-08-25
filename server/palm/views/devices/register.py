import json
import os
from django.http import HttpResponseBadRequest, JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import Device

HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
ENTITY_ID = "entity_id"
FRIENDLY_NAME = "friendly_name"

@csrf_exempt
def index(request):
    input = {}
    try:
        input = _validate(request)
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

def _validate(request):
    if request.method != "POST":
        raise Exception("Not a post request.")
    body = json.loads(request.body)
    return {
        ENTITY_ID: body.get(ENTITY_ID),
        FRIENDLY_NAME: body.get(FRIENDLY_NAME)
    }