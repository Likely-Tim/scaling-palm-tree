import logging
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from palm.constants import env_constants
from palm.models import DeviceGroupMembers, Device

@csrf_exempt
def index(request, group_id, entity_id):
    member = get_object_or_404(DeviceGroupMembers, group_id=group_id, entity_id=entity_id)
    if request.method == "DELETE":
        logging.info(f"Deleting group: {group_id}, entity_id: {entity_id}")
        member.delete()
        return JsonResponse({"group_id":group_id, "removed entity_id": entity_id})
    devices = Device.objects.get(entity_id=member.entity_id, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
    return JsonResponse(model_to_dict(devices))

        
