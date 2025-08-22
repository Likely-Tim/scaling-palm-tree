from django.middleware.csrf import get_token
from django.http import JsonResponse

def index(request):
    return JsonResponse({"csrf_token": get_token(request)})