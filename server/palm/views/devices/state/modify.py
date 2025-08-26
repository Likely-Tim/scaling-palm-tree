import json
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ....clients import home_assistant_client

ENTITY_ID = "entity_id"
DOMAIN = "domain"
SERVICE = "service"

@csrf_exempt
def index(request):
    input = {}
    try:
        input = _validate(request)
    except Exception:
        return HttpResponseBadRequest()
    
    home_assistant_client.post_services(input.get(DOMAIN), input.get(SERVICE), input.get(ENTITY_ID))

    return JsonResponse(input)

def _validate(request):
    if request.method != "POST":
        raise Exception("Not a post request.")
    body = json.loads(request.body)
    return {
        ENTITY_ID: body.get(ENTITY_ID),
        DOMAIN: body.get(DOMAIN),
        SERVICE: body.get(SERVICE)

    }