from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cards.models import FlashcardsCollection, Flashcard
from cards.permissions import IsOwnerOrReadOnly, IsCollectionOwner
from cards.serializers import FlashcardsCollectionSerializer, FlashcardSerializer


class FlashcardsCollectionViewSet(viewsets.ModelViewSet):
    queryset = FlashcardsCollection.objects.all()
    serializer_class = FlashcardsCollectionSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        if not self.request.user.is_anonymous:
            serializer.save(owner=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_anonymous:
            return qs.filter(is_public=True)
        return qs.filter(Q(owner=self.request.user) | Q(is_public=True))

    @action(
        methods=["get"],
        detail=True,
        url_path="flashcards",
        url_name="flashcards",
        permission_classes=[IsAuthenticated],
    )
    def get_flashcards(self, request, pk=None):
        collection = FlashcardsCollection.objects.get(pk=pk)
        serializer = FlashcardSerializer(collection.flashcards.all(), many=True)
        return Response(serializer.data)

    @action(
        methods=["get"],
        detail=False,
        url_path="user-collections",
        url_name="user-collections",
        permission_classes=[IsAuthenticated],
    )
    def get_user_collections(self, request):
        user = request.user
        collections = FlashcardsCollection.objects.filter(owner=user.id)
        serializer = FlashcardsCollectionSerializer(collections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsCollectionOwner]

    def get_queryset(self):
        user = self.request.user
        collections = FlashcardsCollection.objects.filter(owner=user)
        if user.is_authenticated:
            flash = Flashcard.objects.filter(collection__in=collections)
            return flash
        return Flashcard.objects.none()
