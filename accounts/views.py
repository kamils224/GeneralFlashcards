from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from rest_framework.decorators import api_view, permission_classes


from accounts.models import User
from accounts.serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    ActivateAccountSerializer,
)


class UserRegistrationView(CreateAPIView):
    """
    An endpoint for creating user.
    """

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # TODO
        # send email

        return Response(
            {"message": f"Registration successful, check your email: {user}"},
            status=status.HTTP_201_CREATED,
        )


class UserDetailsView(RetrieveAPIView):
    """
    An endpoint for user details.
    Returns data based on the currently logged user, without providing his id/pk in URL.
    """

    serializer_class = UserSerializer

    def get_object(self):
        serializer = UserSerializer(self.request.user)
        return serializer.data


class ActivateAccountView(RetrieveAPIView):

    serializer_class = ActivateAccountSerializer
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        serializer = ActivateAccountSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user.is_active = True
        user.save(update_fields=["is_active"])

        return Response(
            {"message": "Email successfully verified!"}, status=status.HTTP_200_OK
        )
