from django.urls import path, include
from . import views

app_name = 'flashcards_site'

urlpatterns = [
    path('', views.index, name='index'),
]
