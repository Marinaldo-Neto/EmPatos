from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from apps.providers.models import ProviderProfile
from apps.shared.models import BaseModel
from django.db.models import Q

class Review(BaseModel):
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews_made",
    )

    provider = models.ForeignKey(
        ProviderProfile,
        on_delete=models.CASCADE,
        related_name="reviews_received",
    )

    comment = models.TextField(
        max_length=500,
        blank=True,
        verbose_name="Comentário",
    )

    stars = models.SmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Estrelas",
    )
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["provider", "client"],
                condition=Q(is_deleted=False),
                name="unique_review_per_client",
            )
        ]
        ordering = ["-created_at"]
        verbose_name = "Avaliação"
        verbose_name_plural = "Avaliações"

    def __str__(self):
        return f"{self.client.name} -> {self.provider.user.name}"