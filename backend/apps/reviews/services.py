from django.core.exceptions import ValidationError as DjangoValidationError
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
        raise ValidationError({"provider": "Voce nao pode avaliar a si mesmo."})

    if Review.objects.filter(provider_id=provider_locked.id, client_id=client.id).exists():
        raise ValidationError("Voce ja avaliou este prestador.")

    try:
        review = Review(
            client=client,
            provider=provider_locked,
            stars=stars,
            comment=comment,
        )
        review.full_clean()
        review.save()
    except IntegrityError:
        raise ValidationError("Voce ja avaliou este prestador.")
    except DjangoValidationError as exc:
        raise ValidationError(exc.message_dict)

    provider_locked.recalc_rating()
    return review


@transaction.atomic
def update_review(*, review: Review, stars: int, comment: str = "") -> Review:
    provider_locked = _lock_provider(review.provider_id)

    review.stars = stars
    review.comment = comment

    try:
        review.full_clean()
        review.save(update_fields=["stars", "comment", "updated_at"])
    except DjangoValidationError as exc:
        raise ValidationError(exc.message_dict)

    provider_locked.recalc_rating()
    return review


@transaction.atomic
def delete_review(*, review: Review) -> None:
    provider_locked = _lock_provider(review.provider_id)

    review.delete()
    provider_locked.recalc_rating()
