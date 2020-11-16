from rest_framework import serializers

from api_flashcards.models import FlashcardsCollection, Flashcard


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = '__all__'


class FlashcardsCollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlashcardsCollection
        fields = '__all__'
