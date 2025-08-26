import json
import logging
from django.http import JsonResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.models import DeviceGroup

@csrf_exempt
def index(request):
    logging.info(f"Device Group Endpoint Request {request.method}")
    if request.method == "POST":
        try:
            post_body = json.loads(request.body)
            new_group_name = post_body["name"]
            new_description = post_body["description"]
        except KeyError:
            logging.error(f"Missing body argument")
            return HttpResponseBadRequest()
        logging.info("Attempting To Create Device Group")
        new_group, created = DeviceGroup.objects.get_or_create(name=new_group_name, description=new_description) 
        if not created: 
            logging.warning(f"New Device Group {new_group_name} already exists.")
        return JsonResponse(model_to_dict(new_group))
    elif request.method == "GET":
        all_groups = DeviceGroup.objects.all()
        groups_data = list(all_groups.values('id', 'name'))
        return JsonResponse(groups_data, safe=False)
