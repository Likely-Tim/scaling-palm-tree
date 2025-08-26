from django.urls import path
from . import views
from .views import devices
from .views.devices import state

urlpatterns = [
    path("states/", views.states.index, name="states"),
    path("services/<str:domain>/", views.services.index, name="services"),
    path("devices/register/", devices.register.index, name="devices_register"),
    path("devices/registered/", devices.registered.index, name="devices_registered"),
    path("devices/deregister/", devices.deregister.index, name="devices_deregister"),
    path("devices/state/modify/", state.modify.index, name="devices_state_modify")
]
