import logging
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import Device

@csrf_exempt
def index(request, entity_id):
    match request.method:  
        case "GET":
            device = get_object_or_404(Device, entity_id=entity_id, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
            return JsonResponse(model_to_dict(device))
        case "DELETE":
            logging.info(f"Attempting to deregister Device {entity_id}")
            device = get_object_or_404(Device, entity_id=entity_id, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
            device.delete()
            logging.info(f"Device {entity_id} deleted")
            return JsonResponse({"Device Deregistered": entity_id})

