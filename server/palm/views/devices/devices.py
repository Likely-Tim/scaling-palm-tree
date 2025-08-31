import json
import logging
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import Device, DeviceGroupMembers, DeviceGroup
from django.http import JsonResponse, HttpResponseBadRequest

ENTITY_ID = "entity_id"
FRIENDLY_NAME = "friendly_name"

@csrf_exempt
def index(request):
    match request.method:
        case "GET":
            ungrouped = request.GET.get('ungrouped', 'false')
            if ungrouped.lower() == "true":
                try:
                    groups = DeviceGroup.objects.filter(home_assistant_url=env_constants.HOME_ASSISTANT_URL)
                except Exception:
                    return JsonResponse([model_to_dict(device) for device in devices], safe=False)
                grouped_devices= DeviceGroupMembers.objects.filter(group__in=groups)
                grouped_entity_ids = grouped_devices.values_list('entity_id', flat=True)
                logging.info(f"Grouped Devices found {grouped_entity_ids}")
                ungrouped_devices = Device.objects.exclude(entity_id__in=grouped_entity_ids)
                return JsonResponse([model_to_dict(device) for device in ungrouped_devices], safe=False)
            devices = Device.objects.filter(home_assistant_url=env_constants.HOME_ASSISTANT_URL)
            return JsonResponse([model_to_dict(device) for device in devices], safe=False)
        case "POST":
            input = {}
            try:
                input = json.loads(request.body)
            except Exception:
                return HttpResponseBadRequest()
            entity_domain = input.get(ENTITY_ID).split('.', 1)[0]
            device, created = Device.objects.get_or_create(
                    home_assistant_url=env_constants.HOME_ASSISTANT_URL,
                    domain=entity_domain, 
                    entity_id=input.get(ENTITY_ID), 
                    friendly_name=input.get(FRIENDLY_NAME)
            )
            return JsonResponse(model_to_dict(device))


