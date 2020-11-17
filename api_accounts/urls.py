from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views
from api_accounts.views import UserCreateView, CustomAuthToken, ChangePasswordView

urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('login/', CustomAuthToken.as_view()),
    path('password_reset/', ChangePasswordView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
