from django.urls import path
from . import views
from .views import devices, device_groups

urlpatterns = [
    path("states/", views.states.index, name="states"),
    path("services/<str:domain>/", views.services.index, name="services"),
    path("devices/", devices.devices.index, name="devices"),
    path("devices/<str:entity_id>/", devices.device.index, name="individual_device"),
    path("devices/<str:entity_id>/state/", devices.state.index, name="devices_entityId_state"),
    path("groups/", device_groups.groups.index, name="device_groups"),
    path("groups/<int:group_id>/", device_groups.members.create, name="individual_device_groups"),
    path("groups/<int:group_id>/member/", device_groups.members.retrieve, name="individual_device_groups"),
    path("groups/<int:group_id>/member/<str:entity_id>/", device_groups.members_manage.index, name="Group_member_management")
]
