from django.urls import reverse, resolve
from django.test import TestCase
from mixer.backend.django import mixer
import pytest

@pytest.mark.django_db
class TestUrls(TestCase):
    def setUp(self):
        self.brand = mixer.blend('feed.Brand')
        self.lookbook = mixer.blend('feed.Lookbook')
        self.picture = mixer.blend('feed.Picture')

    def test_brands_list(self):
        path = reverse('brands-list')
        self.assertEqual(resolve(path).view_name, 'brands-list')

    def test_brand_detail(self):
        path = reverse('brand-detail', kwargs={'url_param': self.brand.url_param})
        self.assertEqual(resolve(path).view_name, 'brand-detail')

    def test_brand_lookbooks_list(self):
        path = reverse('brand-lookbooks-list', kwargs={'url_param': self.brand.url_param})
        self.assertEqual(resolve(path).view_name, 'brand-lookbooks-list')

    def test_brand_lookbook_detail(self):
        path = reverse('brand-lookbooks-detail', kwargs={'url_param': self.brand.url_param, 'season': self.lookbook.season})
        self.assertEqual(resolve(path).view_name, 'brand-lookbooks-detail')

    def test_picture_detail(self):
        path = reverse('picture-detail', kwargs={'url_param': self.brand.url_param, 'season': self.lookbook.season, 'uuid': self.picture.uuid})
        self.assertEqual(resolve(path).view_name, 'picture-detail')