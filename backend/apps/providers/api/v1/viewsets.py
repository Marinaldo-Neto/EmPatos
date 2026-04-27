from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from django.db.models import Q
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.providers.api.v1.serializers import (
    CategorySerializer,
    ContactSerializer,
    ProviderProfileReadSerializer,
    ProviderProfileWriteSerializer,
    WorkPhotoSerializer,
)
from apps.providers.models import Category, Contact, ProviderProfile, WorkPhoto
from apps.providers.permissions import IsProviderOwnerOrReadOnly, IsProviderResourceOwner


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get("search", "").strip()

        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class ProviderProfileViewSet(viewsets.ModelViewSet):
    queryset = (
        ProviderProfile.objects.select_related("user")
        .prefetch_related("categories", "contacts", "photos")
        .order_by("user__name")
    )
    permission_classes = [IsProviderOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get("search", "").strip()
        category_ids = []

        for raw_value in self.request.query_params.getlist("category"):
            category_ids.extend(
                [value.strip() for value in raw_value.split(",") if value.strip()]
            )
            
        category_name = self.request.query_params.get("category_name", "").strip()
        ordering = self.request.query_params.get("ordering", "").strip()

        if self.action == "list" and not (
            self.request.user.is_authenticated and self.request.user.is_superuser
        ):
            queryset = queryset.filter(is_available=True)

        if category_ids:
            queryset = queryset.filter(categories__id__in=category_ids)

        if category_name:
            queryset = queryset.filter(categories__name__icontains=category_name)

        if search:
            queryset = queryset.filter(
                Q(user__name__icontains=search)
                | Q(bio__icontains=search)
                | Q(description__icontains=search)
                | Q(categories__name__icontains=search)
            )

        if ordering == "rating":
            queryset = queryset.order_by("-rating_avg", "-rating_count", "user__name")
        elif ordering == "recent":
            queryset = queryset.order_by("-created_at")
        elif ordering == "name":
            queryset = queryset.order_by("user__name")

        return queryset.distinct()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "me"]:
            return ProviderProfileReadSerializer
        return ProviderProfileWriteSerializer

    def perform_create(self, serializer):
        if hasattr(self.request.user, "provider_info"):
            raise ValidationError("Este usuário já possui perfil de prestador.")
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get", "put", "patch"], permission_classes=[IsAuthenticated])
    def me(self, request):
        if not hasattr(request.user, "provider_info"):
            raise NotFound("Perfil profissional não encontrado.")

        profile = request.user.provider_info

        if request.method == "GET":
            serializer = ProviderProfileReadSerializer(profile)
            return Response(serializer.data)

        partial = request.method == "PATCH"
        serializer = ProviderProfileWriteSerializer(profile, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

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
