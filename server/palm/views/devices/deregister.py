import json
import logging
from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from palm.models import Device

ENTITY_ID = "entity_id"
FRIENDLY_NAME = "friendly_name"

@csrf_exempt
def index(request):
    input = {}
    try:
        input = _validate(request)
    except Exception:
        return HttpResponseBadRequest()

    logging.info(f"Attempting to deregister Device {input.get(ENTITY_ID)}, friendly name {input.get(FRIENDLY_NAME)}")
    try:
        device = Device.objects.get(
                entity_id=input.get(ENTITY_ID), 
                friendly_name=input.get(FRIENDLY_NAME)
                )
        device.delete()
        logging.info(f"Device {input.get(ENTITY_ID)} deleted")
    except:
        logging.error(f"No Device {input.get(ENTITY_ID)} found")
        return HttpResponseNotFound()

    return JsonResponse({"Device Deleted": input})



def _validate(request):
    if request.method != "POST":
        raise Exception("Not a post request.")
    body = json.loads(request.body)
    return {
        ENTITY_ID: body.get(ENTITY_ID),
        FRIENDLY_NAME: body.get(FRIENDLY_NAME)
    }
