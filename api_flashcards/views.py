from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

from api_flashcards.models import FlashcardsCollection, Flashcard
from api_flashcards.permissions import IsOwnerOrReadOnly
from api_flashcards.serializers import FlashcardsCollectionSerializer, FlashcardSerializer


class FlashcardsCollectionViewSet(viewsets.ModelViewSet):
    queryset = FlashcardsCollection.objects.filter(is_public=True)
    serializer_class = FlashcardsCollectionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['get'], detail=True, url_path='items', url_name='items')
    def get_items(self, request, pk=None):
        collection = FlashcardsCollection.objects.get(pk=pk)
        serializer = FlashcardSerializer(collection.flashcards.all(), many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False, url_path='user-collections', url_name='user_collections')
    def get_user_collections(self, request):
        user = request.user
        if user.is_authenticated:
            collections = Flashcard.objects.filter(owner=user.id)
            serializer = FlashcardsCollectionSerializer(collections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'User is not logged in.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.filter(is_public=True)
    serializer_class = FlashcardSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['get'], detail=False, url_path='user-items', url_name='user_items')
    def get_user_items(self, request):
        user = request.user
        if user.is_authenticated:
            flashcards = Flashcard.objects.filter(owner=user.id)
            serializer = FlashcardSerializer(flashcards, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'User is not logged in.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
