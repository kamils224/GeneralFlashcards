from rest_framework import serializers

from cards.models import FlashcardsCollection, Flashcard


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = "__all__"


class FlashcardsCollectionSerializer(serializers.ModelSerializer):
    flashcards_count = serializers.IntegerField(required=False)

    class Meta:
        model = FlashcardsCollection
        exclude = ("owner",)
