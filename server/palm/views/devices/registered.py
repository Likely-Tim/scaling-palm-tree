import os
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from palm.constants import env_constants
from palm.models import Device
from django.http import JsonResponse

HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)

@csrf_exempt
def index(request):
    devices = Device.objects.filter(home_assistant_url=HOME_ASSISTANT_URL)
    
    return JsonResponse([model_to_dict(device) for device in devices], safe=False)
