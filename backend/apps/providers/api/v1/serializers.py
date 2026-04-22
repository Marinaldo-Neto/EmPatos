from rest_framework import serializers
from apps.accounts.api.v1.serializers import UserPublicSerializer
from apps.providers.models import Category, Contact, WorkPhoto, ProviderProfile

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
        read_only_fields = ["id"]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "platform", "value"]
        read_only_fields = ["id"]

class WorkPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkPhoto
        fields = ["id", "image"]
        read_only_fields = ["id"]

class ProviderProfileReadSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    photos = WorkPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = ProviderProfile
        fields = [
            "id",
            "bio",
            "description",
            "is_available",
            "user",
            "categories",
            "contacts",
            "photos",
            "rating_avg",
            "rating_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

class ProviderProfileWriteSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
    )

    class Meta:
        model = ProviderProfile
        fields = ["id", "bio", "description", "is_available", "categories"]
        read_only_fields = ["id"]