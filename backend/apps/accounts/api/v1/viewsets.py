from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.accounts.api.v1.serializers import (
    ClientProfileSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from apps.accounts.models import ClientProfile

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


class ClientProfileViewSet(viewsets.GenericViewSet):
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated]

    def _get_profile(self, user):
        profile, _ = ClientProfile.objects.select_related("user").prefetch_related(
            "favorites"
        ).get_or_create(user=user)
        return profile

    @action(detail=False, methods=["get", "put", "patch"], permission_classes=[IsAuthenticated])
    def me(self, request):
        profile = self._get_profile(request.user)

        if request.method == "GET":
            serializer = self.get_serializer(profile)
            return Response(serializer.data)

        partial = request.method == "PATCH"
        serializer = self.get_serializer(profile, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
