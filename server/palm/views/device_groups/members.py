import logging
import json
import logging

from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from palm.models import DeviceGroupMembers, DeviceGroup, Device
from palm.constants import env_constants

@csrf_exempt
def index(request, group_id):
    if request.method == "POST":
        try:
            post_body = json.loads(request.body)
            entity_id = post_body["entity_id"]
        except KeyError:
            logging.error("Missing body {'entity_id': 'string'}")
            return HttpResponseBadRequest()
        logging.info(f"Attempting To Create a Device Group {group_id} Member")
        new_group, created = DeviceGroupMembers.objects.get_or_create(entity_id=entity_id, group_id=group_id) 
        if not created: 
            logging.warning(f"New Device {entity_id} already exists in Group {group_id}.")
        return JsonResponse(model_to_dict(new_group))
    elif request.method == "GET":
        logging.info("GET request for device groups")
        group = get_object_or_404(DeviceGroup, id=group_id, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
        group_entities = DeviceGroupMembers.objects.filter(group=group)
        group_entities_ids = [entity.entity_id for entity in group_entities]
        logging.info("Device group entity ids found", group_entities_ids)
        devices = Device.objects.filter(entity_id__in=group_entities_ids, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
        result = {"group": model_to_dict(group), "devices": [model_to_dict(device) for device in devices]}
        return JsonResponse(result)
