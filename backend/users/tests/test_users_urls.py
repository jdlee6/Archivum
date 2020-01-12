from django.urls import reverse, resolve
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from mixer.backend.django import mixer
from users.api.views import UserUpdateView
import pytest


class TestUrls(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create(username='test', email='test@mail.com', password='123')
        self.token = Token.objects.filter(user=self.user)

    def test_user_list(self):
        path = reverse('user-list')
        self.assertEqual(resolve(path).view_name, 'user-list')

    def test_user_create(self):
        pass

    def test_user_detail(self):
        path = reverse('user-detail', kwargs={'id': self.user.id})
        self.assertEqual(resolve(path).view_name, 'user-detail')

    def test_user_update(self):
        path = reverse('user-update', kwargs={'id': self.user.id})
        request = self.factory.put(path, {'username': 'new_username'}, HTTP_AUTHORIZATION=f'Token {self.token}')
        force_authenticate(request, user=self.user)
        view = UserUpdateView.as_view()
        response = view(request, id=self.user.id)
        self.assertEqual(response.status_code, 200)

    def test_user_delete(self):
        pass

    def test_user_get_auth(self):
        pass