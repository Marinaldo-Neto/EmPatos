from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.providers.api.v1.viewsets import (
    CategoryViewSet,
    ProviderProfileViewSet,
    ContactViewSet,
    WorkPhotoViewSet,
)

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"profiles", ProviderProfileViewSet, basename="provider-profile")
router.register(r"contacts", ContactViewSet, basename="contact")
router.register(r"photos", WorkPhotoViewSet, basename="photo")

urlpatterns = [
    path("", include(router.urls)),
]