import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...constants import env_constants

class Command(BaseCommand):

    def handle(self, *args, **options):
        User = get_user_model()

        username = os.getenv(env_constants.DJANGO_SUPERUSER_USERNAME)
        password = os.getenv(env_constants.DJANGO_SUPERUSER_PASSWORD)

        if not User.objects.filter(username=username).exists():
            print(f"Creating superuser '{username}'...")
            User.objects.create_superuser(username=username, password=password)
            print(self.style.SUCCESS(f"Superuser '{username}' created."))
        else:
            print(f"Superuser '{username}' already exists.")