from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api_accounts.views import UserRegistrationView, CustomAuthToken, ChangePasswordView

app_name = 'api_accounts'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('password-change/', ChangePasswordView.as_view(), name='password_change')
]

urlpatterns = format_suffix_patterns(urlpatterns)
