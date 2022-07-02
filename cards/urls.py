from django.urls import path, include
from rest_framework.routers import DefaultRouter

from cards import views

app_name = "cards"

router = DefaultRouter()
router.register("collections", views.FlashcardsCollectionViewSet, basename="collections")
router.register("flashcards", views.FlashcardViewSet, basename="flashcards")

urlpatterns = [path("", include(router.urls))]
