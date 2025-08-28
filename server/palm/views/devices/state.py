import json
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ...clients import home_assistant_client

@csrf_exempt
def index(request, entity_id):
    match request.method:
        case "POST":
            return _processPost(request, entity_id)
        case "GET":
            return _processGet(request, entity_id)
    return HttpResponseBadRequest()

def _processPost(request, entity_id):
    body = json.loads(request.body)
    domain = body.get("domain")
    service = body.get("service")
    ext = body.get("ext")
    home_assistant_client.post_services(domain, service, entity_id, ext)
    return JsonResponse({})

def _processGet(request, entity_id):
    response = home_assistant_client.get_entity_state(entity_id)
    return JsonResponse(json.loads(response.text))

