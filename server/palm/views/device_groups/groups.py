import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from palm.models import DeviceGroup


@csrf_exempt
def index(request):
    logging.info("GET request for device groups")
    all_groups = DeviceGroup.objects.all()
    groups_data = list(all_groups.values('id', 'name'))
    return JsonResponse(groups_data, safe=False)
