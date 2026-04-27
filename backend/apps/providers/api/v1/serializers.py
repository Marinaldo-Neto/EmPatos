from rest_framework import serializers
from apps.accounts.api.v1.serializers import UserPublicSerializer
from apps.providers.models import Category, Contact, WorkPhoto, ProviderProfile
from apps.shared.validators import normalize_provider_contact

class CategorySerializer(serializers.ModelSerializer):
    def validate_name(self, value):
        normalized_value = value.strip()

        if not normalized_value:
            raise serializers.ValidationError("Informe o nome da categoria.")

        return normalized_value

    class Meta:
        model = Category
        fields = ["id", "name"]
        read_only_fields = ["id"]

class ContactSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        attrs = super().validate(attrs)

        platform = attrs.get("platform") or getattr(self.instance, "platform", None)
        value = attrs.get("value") if "value" in attrs else getattr(self.instance, "value", "")

        if platform is None:
            raise serializers.ValidationError({"platform": "Informe a plataforma de contato."})

        normalized_value = normalize_provider_contact(platform, value)
        attrs["value"] = normalized_value

        provider = getattr(self.instance, "provider", None)
        request = self.context.get("request")

        if provider is None and request is not None and hasattr(request.user, "provider_info"):
            provider = request.user.provider_info

        if provider is not None:
            duplicates = Contact.objects.filter(
                provider=provider,
                platform=platform,
                value=normalized_value,
            )

            if self.instance is not None:
                duplicates = duplicates.exclude(pk=self.instance.pk)

            if duplicates.exists():
                raise serializers.ValidationError(
                    {"value": "Este contato ja foi cadastrado para este prestador."}
                )

        return attrs

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

    def validate_categories(self, categories):
        if not categories:
            raise serializers.ValidationError(
                "Selecione pelo menos uma categoria para o prestador."
            )

        return categories

    class Meta:
        model = ProviderProfile
        fields = ["id", "bio", "description", "is_available", "categories"]
        read_only_fields = ["id"]
