import os
from users.models import Profile
from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.storage import default_storage as storage
from PIL import Image


class TestUsersModels(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='new_test', email='test@mail.com', password='123')
        self.profile = self.user.profile

    def test_profile_str(self):
        self.assertEqual(str(self.profile), f'{self.user.username} Profile')

    def test_profile_save(self):
        file_path = self.profile.avatar.name
        f = storage.open(file_path, 'r')
        img = Image.open(f)
        self.assertTrue(300, img.height)

    def test_profile_create_thumbnail(self):
        pass
