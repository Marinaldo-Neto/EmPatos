from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from apps.providers.models import Category, ProviderProfile, Contact, WorkPhoto

from apps.providers.api.v1.serializers import (
    CategorySerializer,
    ProviderProfileReadSerializer,
    ProviderProfileWriteSerializer,
    ContactSerializer,
    WorkPhotoSerializer,
)
from apps.providers.permissions import IsProviderOwnerOrReadOnly, IsProviderResourceOwner


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProviderProfileViewSet(viewsets.ModelViewSet):
    queryset = ProviderProfile.objects.select_related("user").prefetch_related(
        "categories",
        "contacts",
        "photos",
    )
    permission_classes = [IsProviderOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "me"]:
            return ProviderProfileReadSerializer
        return ProviderProfileWriteSerializer

    def perform_create(self, serializer):
        if hasattr(self.request.user, "provider_info"):
            raise ValidationError("Este usuário já possui perfil de prestador.")
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        if request.user.role != request.user.Role.PROVIDER:
            raise ValidationError("Apenas prestadores possuem perfil profissional.")

        if not hasattr(request.user, "provider_info"):
            raise NotFound("Perfil profissional não encontrado.")

        serializer = ProviderProfileReadSerializer(request.user.provider_info)
        return Response(serializer.data)


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated, IsProviderResourceOwner]

    def get_queryset(self):
        if not self.request.user.is_authenticated or not hasattr(self.request.user, "provider_info"):
            return Contact.objects.none()

        return Contact.objects.filter(provider=self.request.user.provider_info)

    def perform_create(self, serializer):
        if not hasattr(self.request.user, "provider_info"):
            raise ValidationError("Crie o perfil de prestador antes de cadastrar contatos.")
        serializer.save(provider=self.request.user.provider_info)


class WorkPhotoViewSet(viewsets.ModelViewSet):
    serializer_class = WorkPhotoSerializer
    permission_classes = [IsAuthenticated, IsProviderResourceOwner]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        if not self.request.user.is_authenticated or not hasattr(self.request.user, "provider_info"):
            return WorkPhoto.objects.none()

        return WorkPhoto.objects.filter(provider=self.request.user.provider_info)

    def perform_create(self, serializer):
        if not hasattr(self.request.user, "provider_info"):
            raise ValidationError("Crie o perfil de prestador antes de enviar fotos.")
        serializer.save(provider=self.request.user.provider_info)