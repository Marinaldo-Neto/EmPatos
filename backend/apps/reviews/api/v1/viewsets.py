from rest_framework import viewsets

from apps.reviews import services
from apps.reviews.api.v1.serializers import ReviewSerializer
from apps.reviews.models import Review
from apps.reviews.permissions import IsReviewOwnerOrReadOnly


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("client", "provider", "provider__user")
    serializer_class = ReviewSerializer
    permission_classes = [IsReviewOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        provider_id = self.request.query_params.get("provider")

        if provider_id:
            queryset = queryset.filter(provider_id=provider_id)

        return queryset

    def perform_create(self, serializer):
        provider = serializer.validated_data["provider"]
        stars = serializer.validated_data["stars"]
        comment = serializer.validated_data.get("comment", "")

        review = services.create_review(
            client=self.request.user,
            provider=provider,
            stars=stars,
            comment=comment,
        )
        serializer.instance = review

    def perform_update(self, serializer):
        review = self.get_object()

        stars = serializer.validated_data.get("stars", review.stars)
        comment = serializer.validated_data.get("comment", review.comment)

        updated = services.update_review(
            review=review,
            stars=stars,
            comment=comment,
        )
        serializer.instance = updated

    def perform_destroy(self, instance):
        services.delete_review(review=instance)
