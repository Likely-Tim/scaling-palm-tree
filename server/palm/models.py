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