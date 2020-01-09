from django.contrib.auth.models import User
from users.api.serializers import UserListSerializer, UserCreateSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from users.permissions import IsOwner, IsOwnerOrAdmin
from rest_framework.generics import (
    UpdateAPIView, 
    RetrieveAPIView, 
    ListAPIView,
    DestroyAPIView,
    CreateAPIView
)


class UserListView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserCreateView(CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

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