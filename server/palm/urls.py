from django.urls import path
from . import routes

urlpatterns = [
    path("states/", routes.states.index, name="states"),
]