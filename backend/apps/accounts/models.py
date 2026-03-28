from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.conf import settings
from apps.providers.models import ProviderProfile

class User(AbstractUser):
    class Role(models.TextChoices):
        PROVIDER = "PROVIDER", "Prestador"
        CLIENT = "CLIENT", "Cliente"

    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLIENT
        )
    
    objects = UserManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]


class ClientProfile(models.Model):
    favorites = models.ManyToManyField(ProviderProfile, blank=True, related_name="favorited_by")
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="client_profile")

    def __str__(self):
        return f"Perfil de {self.user.name}" 