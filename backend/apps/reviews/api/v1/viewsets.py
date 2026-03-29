from rest_framework import viewsets
from apps.reviews.models import Review
from apps.reviews.api.v1.serializers import ReviewSerializer
from apps.reviews.permissions import IsReviewOwnerOrReadOnly
from rest_framework.exceptions import ValidationError

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
        if self.request.user.role != self.request.user.Role.CLIENT:
            raise ValidationError("Apenas clientes podem criar avaliações.")

        serializer.save(client=self.request.user)