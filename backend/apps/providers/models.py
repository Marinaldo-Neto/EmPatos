from django.db import models
from apps.shared.models import BaseModel
from  django.conf import settings


class Category(BaseModel):
    name = models.CharField(max_length=255, unique=True, verbose_name="Nome da Categoria")
    
    def __str__(self):
        return self.name

class ProviderProfile(BaseModel):

    bio = models.TextField(
        max_length=200,
        blank=True,
        help_text="Conte sua história (max 200 caracteres)."
        )
    
    description = models.TextField(
        blank=True,
        help_text="Conte sobre seus serviços."
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="provider_info"
        )
    
    is_available = models.BooleanField(
        default=False,
        verbose_name="Disponível para novos trabalhos",
        help_text="Desative para esconder seu perfil das buscas temporariamente."
    )

    categories = models.ManyToManyField(Category)

    def __str__(self):
        return f"Perfil de {self.user.name}" 

class Contact(BaseModel):
    class Opcoes(models.TextChoices):
        WHATSAPP = "WHATSAPP", "Whatsapp"
        INSTAGRAM = "INSTAGRAM", "Instagram"
        PHONE = "PHONE", "Telefone"

    platform = models.CharField(
        max_length=100,
        choices=Opcoes.choices
    )

    value = models.CharField(max_length=255)

    provider = models.ForeignKey(
        ProviderProfile, 
        on_delete=models.CASCADE, 
        related_name="contacts"
    )

    def __str__(self):
        return f"{self.platform} - {self.value}" 

class WorkPhoto(BaseModel):
    image = models.ImageField(upload_to="work_photos/")

    provider = models.ForeignKey(
        ProviderProfile, 
        on_delete=models.CASCADE, 
        related_name="photos"
    )

    def __str__(self):
        return f"Foto de {self.provider.user.name}"