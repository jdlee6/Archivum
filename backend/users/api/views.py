from django.contrib.auth.models import User
from users.api.serializers import UserSerializer, ProfileSerializer
from rest_framework.generics import (
    UpdateAPIView, 
    RetrieveAPIView, 
    ListAPIView
)


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'


class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'