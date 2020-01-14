from django.urls import reverse
from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from users.api.views import (
    UserListView, 
    UserCreateView, 
    UserDetailView, 
    UserUpdateView, 
    UserDeleteView
)


class TestViews(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='newtest1', email='newtest1@mail.com', password='123')
        self.token = Token.objects.filter(user=self.user)
        self.factory = APIRequestFactory()

    def test_user_list_view(self):
        path = reverse('user-list')
        view = UserListView.as_view()
        request = self.factory.get(path)
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_user_create_view(self):
        path = reverse('user-create')
        view = UserCreateView.as_view()
        request = self.factory.post(path, {'username': 'test1', 'email': 'test1@mail.com', 'password': '123'})
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_user_detail_view(self):
        path = reverse('user-detail', kwargs={'id': self.user.id})
        view = UserDetailView.as_view()
        request = self.factory.get(path)
        response = view(request, id=self.user.id)
        self.assertEqual(response.status_code, 200)

    def test_user_update_view(self):
        path = reverse('user-update', kwargs={'id': self.user.id})
        request = self.factory.put(path, {'username': 'new_username'}, HTTP_AUTHORIZATION=f'Token {self.token}')
        force_authenticate(request, user=self.user)
        view = UserUpdateView.as_view()
        response = view(request, id=self.user.id)
        self.assertEqual(response.status_code, 200)

    def test_user_delete_view(self):
        path = reverse('user-delete', kwargs={'id': self.user.id})
        view = UserDeleteView.as_view()
        request = self.factory.delete(path, HTTP_AUTHORIZATION=f'Token {self.token}')
        force_authenticate(request, user=self.user)
        view = UserDeleteView.as_view()
        response = view(request, id=self.user.id)
        self.assertEqual(response.status_code, 204)