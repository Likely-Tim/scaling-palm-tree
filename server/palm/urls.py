from django.urls import path
from . import views
from .views import devices

urlpatterns = [
    path("states/", views.states.index, name="states"),
    path("devices/register/", devices.register.index, name="devices_register"),
    path("devices/registered/", devices.registered.index, name="devices_registered")
]