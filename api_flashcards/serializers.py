from rest_framework import serializers

from api_flashcards.models import FlashcardsCollection, Flashcard


class FlashcardsCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardsCollection
        fields = '__all__'


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = '__all__'
