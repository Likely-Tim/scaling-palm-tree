import json
from django.http import JsonResponse
from ..clients import home_assistant_client


def index(request, domain):
    print(domain)
    services = home_assistant_client.get_services()
    data = []
    try: 
        data = json.loads(services.text)
    except:
        data = []

    domainServices = [item for item in data if item["domain"] == domain]

    response = {}
    if domainServices:
        response = domainServices[0]

    return JsonResponse(response)
