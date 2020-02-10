from mixer.backend.django import mixer
from django.test import TestCase


class TestFeedModels(TestCase):
    def setUp(self):
        self.brand = mixer.blend('feed.Brand')
        self.lookbook = mixer.blend('feed.Lookbook')
        self.picture = mixer.blend('feed.Picture')

    def test_brand_str(self):
        self.assertEqual(str(self.brand), self.brand.name)

    def test_brand_save(self):
        self.assertTrue(self.brand.url_param.islower() and " " not in self.brand.url_param)

    def test_lookbook_str(self):
        self.assertEqual(str(self.lookbook), f'{self.lookbook.brand.name} {self.lookbook.season}') 

    def test_lookbook_save(self):
        self.assertTrue(self.lookbook.season.islower())

    def test_picture_str(self):
        self.assertEqual(str(self.picture), f'{self.picture.src} from {self.picture.lookbook}')