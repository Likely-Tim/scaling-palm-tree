from django.http import HttpResponse
from ..clients import home_assistant_client

def index(request):
    return HttpResponse(home_assistant_client.get_states(), content_type="application/json")