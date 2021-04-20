from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import (
    UserRegistrationView,
    UserDetailsView,
    ActivateAccountView,
)

app_name = "accounts"

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("register/activate/", ActivateAccountView.as_view(), name="activate"),
    path("user/", UserDetailsView.as_view(), name="user_details"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
