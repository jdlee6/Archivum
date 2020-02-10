from django.urls import reverse, resolve
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from users.api.views import UserUpdateView, UserCreateView, UserDeleteView


class TestUsersUrls(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create(username='test', email='test@mail.com', password='123')

    def test_user_list(self):
        path = reverse('user-list')
        self.assertEqual(resolve(path).view_name, 'user-list')

    def test_user_create(self):
        path = reverse('user-create')
        self.assertEqual(resolve(path).view_name, 'user-create')

    def test_user_detail(self):
        path = reverse('user-detail', kwargs={'username': self.user.username})
        self.assertEqual(resolve(path).view_name, 'user-detail')

    def test_user_update(self):
        path = reverse('user-update', kwargs={'username': self.user.username})
        self.assertEqual(resolve(path).view_name, 'user-update')
       
    def test_user_delete(self):
        path = reverse('user-delete', kwargs={'username': self.user.username})
        self.assertEqual(resolve(path).view_name, 'user-delete')