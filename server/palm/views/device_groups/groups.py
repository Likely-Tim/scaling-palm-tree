import logging
import json
import logging

from django.db.utils import IntegrityError
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from palm.models import DeviceGroup
from palm.constants import env_constants

@csrf_exempt
def index(request):
    logging.info(f"Device Groups Endpoint Request {request.method}")
    if request.method == "POST":
        try:
            post_body = json.loads(request.body)
            name = post_body["name"]
            new_description = post_body["description"]
            if not name:
                error_message = "Name cannot be blank"
                return JsonResponse({'message': error_message}, status=400)
        except KeyError:
            logging.error("Missing body {'name': 'string', description: 'string'}")
            return HttpResponseBadRequest()
        logging.info("Attempting To Create Device Group")
        try:
            new_group, created = DeviceGroup.objects.get_or_create(name=name, description=new_description, home_assistant_url=env_constants.HOME_ASSISTANT_URL) 
        except IntegrityError:
            #https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
            error_message = "Duplicate group name registered"
            return JsonResponse({'message': error_message}, status=409) 
        if not created: 
            logging.warning(f"New Device Group {name} already exists.")
        return JsonResponse(model_to_dict(new_group))
    elif request.method == "GET":
        logging.info("GET request for device groups")
        all_groups = DeviceGroup.objects.filter(home_assistant_url=env_constants.HOME_ASSISTANT_URL)
        groups_data = list(all_groups.values('id', 'name', 'description'))
        return JsonResponse(groups_data, safe=False)
