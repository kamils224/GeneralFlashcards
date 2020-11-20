from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api_flashcards import views

app_name = 'api_flashcards'

router = DefaultRouter()
router.register('collection', views.FlashcardsCollectionViewSet, basename='collection')
router.register('flashcard', views.FlashcardViewSet, basename='flashcard')

urlpatterns = [
    path('', include(router.urls))
]
