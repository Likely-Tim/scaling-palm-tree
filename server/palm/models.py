from django.db import models

class Device(models.Model):
    home_assistant_url = models.CharField(null=False, blank=False)
    domain = models.CharField(null=False, blank=False)
    entity_id = models.CharField(null=False, blank=False)
    friendly_name = models.CharField(null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['home_assistant_url', 'entity_id'], name='unique_entities')
        ]

# Device Group is meant to coalesce individual devices together. 
class DeviceGroup(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.CharField(null=False, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    home_assistant_url = models.CharField(null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["name", "home_assistant_url"], name="unique_lowercase_group_name")
        ]

class DeviceGroupMembers(models.Model):
    group = models.ForeignKey(DeviceGroup, on_delete=models.CASCADE)
    entity_id = models.CharField(null=False, blank=False)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["entity_id", "group_id"], name="unique_device_group_membership")
    ]
