import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from apps.shared.models import BaseModel

from .managers import UserManager
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class Role(models.TextChoices):
        PROVIDER = "PROVIDER", "Prestador"
        CLIENT = "CLIENT", "Cliente"

    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLIENT,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email


class ClientProfile(BaseModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="client_profile",
    )
    favorites = models.ManyToManyField(
        "providers.ProviderProfile",
        blank=True,
        related_name="favorited_by",
    )

    def __str__(self):
        return f"Perfil de {self.user.name}"