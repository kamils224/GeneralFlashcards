from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from api_flashcards.models import FlashcardsCollection, Flashcard
from api_flashcards.permissions import IsOwnerOrReadOnly, IsCollectionOwner
from api_flashcards.serializers import FlashcardsCollectionSerializer, FlashcardSerializer


class FlashcardsCollectionViewSet(viewsets.ModelViewSet):
    queryset = FlashcardsCollection.objects.filter(is_public=True)
    serializer_class = FlashcardsCollectionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    @action(methods=['get'], detail=True, url_path='items', url_name='items',
            permission_classes=[IsAuthenticated])
    def get_items(self, request, pk=None):
        collection = FlashcardsCollection.objects.get(pk=pk)
        serializer = FlashcardSerializer(collection.flashcards.all(), many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False, url_path='user-collections', url_name='user-collections',
            permission_classes=[IsAuthenticated])
    def get_user_collections(self, request):
        user = request.user
        collections = FlashcardsCollection.objects.filter(owner=user.id)
        serializer = FlashcardsCollectionSerializer(collections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsCollectionOwner]

    def get_queryset(self):
        user = self.request.user
        collections = FlashcardsCollection.objects.filter(owner=user)
        if user.is_authenticated:
            flash = Flashcard.objects.filter(collection__in=collections)
            return flash
        return Flashcard.objects.none()
