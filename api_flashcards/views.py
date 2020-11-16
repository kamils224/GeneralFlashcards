from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api_flashcards.models import FlashcardsCollection
from api_flashcards.permissions import IsOwner
from api_flashcards.serializers import FlashcardsCollectionSerializer, FlashcardSerializer


# todo: add permissions
class FlashcardsCollectionViewSet(viewsets.ModelViewSet):
    queryset = FlashcardsCollection.objects.all()
    serializer_class = FlashcardsCollectionSerializer

    @action(methods=['get'], detail=True, url_path='items', url_name='items')
    def get_items(self, request, pk=None):
        collection = FlashcardsCollection.objects.get(pk=pk)
        serializer = FlashcardSerializer(collection.flashcards.all(), many=True)
        return Response(serializer.data)
