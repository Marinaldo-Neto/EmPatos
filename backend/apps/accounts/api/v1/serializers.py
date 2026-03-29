from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.accounts.models import ClientProfile
from apps.providers.models import ProviderProfile

User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name"]
        read_only_fields = ["id"]

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["id", "name", "email", "role", "password"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)
    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    
    class Meta:
        model = User
        fields = ["id", "name", "email", "role", "password"]
        read_only_fields = ["id", "role"]

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

class ClientProfileSerializer(serializers.ModelSerializer):
    favorites = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ProviderProfile.objects.all(),
        required=False,
    )
    
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = ClientProfile
        fields = ["id", "user", "favorites"]
        read_only_fields = ["id", "user"]