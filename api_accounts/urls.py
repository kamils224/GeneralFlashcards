from django.urls import path

from rest_framework.authtoken import views
from api_accounts.views import UserCreateViewSet

urlpatterns = [
    path('register/', UserCreateViewSet.as_view()),
    path('api-token-auth/', views.obtain_auth_token),
]