import logging
import json

from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from palm.models import DeviceGroupMembers

@csrf_exempt
def index(request, group_id, entity_id):
    member = get_object_or_404(DeviceGroupMembers, id=group_id, entity_id=entity_id)
    if request.method == "DELETE":
        member.delete()
        return JsonResponse({"group_id":group_id, "removed entity_id": entity_id})
    return JsonResponse(model_to_dict(member))
        
