from rest_framework.routers import DefaultRouter
from apps.accounts.api.v1.viewsets import UserViewSet, ClientProfileViewSet
from django.urls import path, include

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="user")
router.register(r"client-profiles", ClientProfileViewSet, basename="client-profile")

urlpatterns = [
    path("", include(router.urls))
]