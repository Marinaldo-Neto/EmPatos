from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.accounts.api.v1.serializers import (
    UserCreateSerializer,
    UserSerializer,
    ClientProfileSerializer,
)

from apps.accounts.models import ClientProfile
from apps.accounts.permissions import IsClientProfileOwner

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_superuser:
            return User.objects.all()

        if self.request.user.is_authenticated:
            return User.objects.filter(pk=self.request.user.pk)

        return User.objects.none()

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ClientProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated, IsClientProfileOwner]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ClientProfile.objects.select_related("user").prefetch_related("favorites")
        return ClientProfile.objects.select_related("user").prefetch_related("favorites").filter(user=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role != self.request.user.Role.CLIENT:
            raise ValidationError("Apenas clientes podem criar perfil de cliente.")

        if ClientProfile.objects.filter(user=self.request.user).exists():
            raise ValidationError("Este usuário já possui perfil de cliente.")

        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        profile = ClientProfile.objects.filter(user=request.user).first()
        if not profile:
            return Response({"detail": "Perfil de cliente não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)