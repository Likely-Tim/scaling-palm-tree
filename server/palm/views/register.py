import json
import os
from django.http import HttpResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict
from ..models import Device
from ..constants import env_constants

HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)
ENTITY_ID = "entity_id"
FRIENDLY_NAME = "friendly_name"

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

    return HttpResponse(json.dumps(model_to_dict(device)), content_type="application/json")

def _validate(request):
    if request.method != "POST":
        raise Exception("Not a post request.")
    body = json.loads(request.body)
    return {
        ENTITY_ID: body.get(ENTITY_ID),
        FRIENDLY_NAME: body.get(FRIENDLY_NAME)
    }