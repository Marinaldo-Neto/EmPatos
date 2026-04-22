from django.db import IntegrityError, transaction
from rest_framework.exceptions import ValidationError

from apps.providers.models import ProviderProfile
from apps.reviews.models import Review


def _lock_provider(provider_id: int) -> ProviderProfile:
    return ProviderProfile.objects.select_for_update().get(pk=provider_id)


@transaction.atomic
def create_review(*, client, provider: ProviderProfile, stars: int, comment: str = "") -> Review:
    provider_locked = _lock_provider(provider.id)

    if provider_locked.user_id == client.id:
        raise ValidationError({"provider": "Você não pode avaliar a si mesmo."})

    if Review.objects.filter(provider_id=provider_locked.id, client_id=client.id).exists():
        raise ValidationError("Você já avaliou este prestador.")

    try:
        review = Review.objects.create(
            client=client,
            provider=provider_locked,
            stars=stars,
            comment=comment,
        )
    except IntegrityError:
        raise ValidationError("Você já avaliou este prestador.")

    provider_locked.recalc_rating()
    return review


@transaction.atomic
def update_review(*, review: Review, stars: int, comment: str = "") -> Review:
    provider_locked = _lock_provider(review.provider_id)

    review.stars = stars
    review.comment = comment
    review.save(update_fields=["stars", "comment", "updated_at"])

    provider_locked.recalc_rating()
    return review


@transaction.atomic
def delete_review(*, review: Review) -> None:
    provider_locked = _lock_provider(review.provider_id)

    review.delete()
    provider_locked.recalc_rating()
