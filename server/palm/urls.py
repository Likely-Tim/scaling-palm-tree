from django.urls import path
from . import views
from .views import devices, device_groups

urlpatterns = [
    path("states/", views.states.index, name="states"),
    path("services/<str:domain>/", views.services.index, name="services"),
    path("devices/register/", devices.register.index, name="devices_register"),
    path("devices/registered/", devices.registered.index, name="devices_registered"),
    path("devices/deregister/", devices.deregister.index, name="devices_deregister"),
    path("devices/<str:entityId>/state/", devices.state.index, name="devices_entityId_state"),
    path("groups/", device_groups.groups.index, name="device_groups"),
    path("group/<str:group_name>/", device_groups.group.index, name="individual_device_groups")
]
