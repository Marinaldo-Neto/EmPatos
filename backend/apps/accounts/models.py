from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.shared.models import BaseModel

from .managers import UserManager


class User(AbstractUser, BaseModel):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)

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

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        default="",
        verbose_name="WhatsApp/Telefone",
    )

    def __str__(self):
        return f"Perfil de {self.user.name}"
