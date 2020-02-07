from .permissions import IsOwner, IsOwnerOrAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    CreateAPIView
)
from users.api.serializers import (
    UserListSerializer, 
    UserCreateSerializer, 
    UserUpdateSerializer,
    ProfileSerializer,
    UserPasswordUpdateSerializer
)


UserModel = get_user_model()


class UserListView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserCreateView(CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({'key': token.key}, status=status.HTTP_201_CREATED, headers=headers)


class UserDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'username'


class UserUpdateView(UpdateAPIView):
    permission_classes = (IsOwner, )
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'username'


class UserDeleteView(DestroyAPIView):
    permission_classes = (IsOwnerOrAdmin,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'username'


class PasswordResetConfirmView(UpdateAPIView):
    permission_classes = (IsOwnerOrAdmin,)
    serializer_class = UserPasswordUpdateSerializer
    lookup_field = 'uidb64'

    def get_queryset(self, *args, **kwargs):
        uid = self.get_user(self.kwargs['uidb64'])
        user = UserModel._default_manager.get(pk=uid)
        return user

    def get_user(self, uidb64):
        uid = urlsafe_base64_decode(uidb64).decode()
        return uid

    def update(self, request, *args, **kwargs):
        uid = self.get_user(self.kwargs['uidb64'])
        user = UserModel._default_manager.get(pk=uid)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not user.check_password(request.data['password_1']):
                if request.data['password_1'] == request.data['password_2']:
                    user.set_password(request.data['password_1'])
                    user.save()
                    return Response({'detail': 'Password succesfully changed!'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Please make sure that both passwords are equal!'}, status=status.HTTP_409_CONFLICT)
            else:
                return Response({'detail': 'Please type in a new password!'}, status=status.HTTP_409_CONFLICT)
        else:
            return Response(ValidationError(serializer.errors), status=status.HTTP_400_BAD_REQUEST)