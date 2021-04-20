from rest_framework import permissions

from cards.models import FlashcardsCollection, Flashcard


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user


class IsCollectionOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of a collection to edit it.
    Assumes the model instance has a `collection` attribute.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        collections = FlashcardsCollection.objects.filter(owner=request.user)
        return obj.collection in collections
