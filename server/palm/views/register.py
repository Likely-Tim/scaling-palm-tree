import json
import os
from django.http import HttpResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict
from ..clients import home_assistant_client
from ..models import Device
from ..constants import env_constants

HOME_ASSISTANT_URL = os.getenv(env_constants.HOME_ASSISTANT_URL)

def index(request, domain):
    if domain == None:
        return HttpResponseBadRequest("No domain provided.")

    states = home_assistant_client.get_states()
    data = json.loads(states.text)
    registered_devices = []

    for item in data:
        entity_id = item.get("entity_id")
        entity_domain = entity_id.split('.', 1)[0]

        if (domain != entity_domain):
            continue
        device, created = Device.objects.get_or_create(
            home_assistant_url=HOME_ASSISTANT_URL, 
            domain=entity_domain, 
            entity_id=entity_id, 
            friendly_name=item.get("attributes").get("friendly_name", "N/A")
        )
        device = model_to_dict(device)
        if created:
            print(f"Device registered: {device}")
            registered_devices.append(device)
        else:
            print(f"Device registration skipped: {device}")

    return HttpResponse(json.dumps(registered_devices), content_type="application/json")