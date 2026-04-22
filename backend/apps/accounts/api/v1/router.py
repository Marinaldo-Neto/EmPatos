from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.accounts.api.v1.viewsets import ClientProfileViewSet, UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

client_profile_me = ClientProfileViewSet.as_view(
    {
        "get": "me",
        "put": "me",
        "patch": "me",
    }
)

urlpatterns = [
    path("", include(router.urls)),
    path("client-profiles/me/", client_profile_me, name="client-profile-me"),
]
