from rest_framework import serializers
from apps.providers.models import Category, Contact, WorkPhoto, ProviderProfile
from apps.accounts.api.v1.serializers import UserSerializer

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

class ProviderProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    photos = WorkPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = ProviderProfile
        fields = ["id", "bio", "is_available", "user", "categories", "contacts", "photos"]
        read_only_fields = ["id"]
