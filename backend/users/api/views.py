from django.contrib.auth.models import User
from users.permissions import IsOwner, IsOwnerOrAdmin
from users.api.serializers import (
    UserListSerializer, 
    UserCreateSerializer, 
    UserUpdateSerializer
)
from rest_framework.generics import (
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    CreateAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


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
    lookup_field = 'id'


class UserUpdateView(UpdateAPIView):
    permission_classes = (IsOwner, )
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'id'


class UserDeleteView(DestroyAPIView):
    permission_classes = (IsOwnerOrAdmin,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'id'
