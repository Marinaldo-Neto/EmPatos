from rest_framework import serializers
from apps.reviews.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.name", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "client",
            "client_name",
            "provider",
            "stars",
            "comment",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "client", "client_name", "created_at", "updated_at"]