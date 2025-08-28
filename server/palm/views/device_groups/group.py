from django.shortcuts import get_object_or_404
from django.http import JsonResponse 
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import DeviceGroup

@csrf_exempt
def index(request, group_name):
    if request.method == "GET":
        group = get_object_or_404(DeviceGroup, name=group_name, home_assistant_url=env_constants.HOME_ASSISTANT_URL)
        return JsonResponse(model_to_dict(group))
