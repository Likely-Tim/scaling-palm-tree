from django.urls import path
from . import views

urlpatterns = [
    path("states/", views.states.index, name="states"),
]