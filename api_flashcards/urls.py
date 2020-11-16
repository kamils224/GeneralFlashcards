from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api_flashcards import views

router = DefaultRouter()
router.register('collection', views.FlashcardsCollectionViewSet)
router.register('flashcard', views.FlashcardViewSet)

urlpatterns = [
    path('', include(router.urls))
]
