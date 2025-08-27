import json
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ...clients import home_assistant_client

@csrf_exempt
def index(request, entityId):
    match request.method:
        case "POST":
            return _processPost(request, entityId)
        case "GET":
            return _processGet(request, entityId)

    return HttpResponseBadRequest(input)

def _processPost(request, entityId):
    body = json.loads(request.body)
    domain = body.get("domain")
    service = body.get("service")

    home_assistant_client.post_services(domain, service, entityId)

    return JsonResponse({})
    
def _processGet(request, entityId):
    response = home_assistant_client.get_entity_state(entityId)


    return JsonResponse(json.loads(response.text))

