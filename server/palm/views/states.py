import json
from django.http import HttpResponse, HttpResponseBadRequest
from ..utils import json_utils
from ..clients import home_assistant_client

def index(request):
    entity_id = request.GET.get("entity_id")
    friendly_name = request.GET.get("friendly_name")

    if entity_id and friendly_name:
        return HttpResponseBadRequest("Only entity id or friendly_name can be specified")

    states = home_assistant_client.get_states()
    data = json.loads(states.text)
    items = data

    if entity_id:
        items = json_utils.filter_items(items, "entity_id", entity_id)
    elif friendly_name:
        items = json_utils.filter_items(items, "friendly_name", friendly_name)

    return HttpResponse(json.dumps(items), content_type="application/json")
