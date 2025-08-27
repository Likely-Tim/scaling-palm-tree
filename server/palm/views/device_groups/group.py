import json
import logging
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.models import DeviceGroup

@csrf_exempt
def index(request, group_name):
    logging.info(f"Device Group Endpoint Request {request.method}")
    if request.method == "POST":
        try:
            post_body = json.loads(request.body)
            new_description = post_body["description"]
        except KeyError:
            logging.error("Missing post body {description: 'text'}")
            return HttpResponseBadRequest()
        logging.info("Attempting To Create Device Group")
        new_group, created = DeviceGroup.objects.get_or_create(name=group_name, description=new_description) 
        if not created: 
            logging.warning(f"New Device Group {group_name} already exists.")
        return JsonResponse(model_to_dict(new_group))
    elif request.method == "GET":
        group = get_object_or_404(DeviceGroup, name=group_name)
        return JsonResponse(model_to_dict(group))
