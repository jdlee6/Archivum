from archivum.settings import AWS_S3_CUSTOM_DOMAIN
from django.test import TestCase
from django.core import serializers
from django.contrib.auth.models import User
from feed.models import Brand, Lookbook, Picture
from users.api.serializers import UserListSerializer
import json

class TestUsersSerializers(TestCase):
    def setUp(self):
        self.Serializer = UserListSerializer
        self.user = User.objects.create(id=1)
        self.brand = Brand.objects.create(name='bape')
        self.lookbook = Lookbook.objects.create(brand=self.brand, year='2019-01-01', season='fw19')
        self.picture = Picture.objects.create(lookbook=self.lookbook, width=1, height=1, src='images/test.jpg')
        self.liked_photo_source = 'https://' + AWS_S3_CUSTOM_DOMAIN + '/' + str(self.picture.src)
        self.user.likes.add(self.picture)
        self.data = {
            'brand': self.brand.url_param,
            'season': self.lookbook.season,
            'uuid': self.picture.uuid,
            'width': self.picture.width,
            'height': self.picture.height,
            'src': self.liked_photo_source
        }

    def test_user_list_serializer(self):
        likes = self.Serializer(data=self.data).get_likes(self.user)
        self.assertEqual(likes, [self.data])