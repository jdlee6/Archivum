from mixer.backend.django import mixer
from django.urls import reverse
from django.test import TestCase
from rest_framework.test import APIRequestFactory
from feed.api.views import LookbookListView, LookbookDetailView, PictureDetailView


class TestViews(TestCase):
    def setUp(self):
        self.brand = mixer.blend('feed.Brand')
        self.lookbook = mixer.blend('feed.Lookbook', brand=self.brand)
        self.picture = mixer.blend('feed.Picture')
        self.factory = APIRequestFactory()

    def test_lookbook_list_view(self):
        path = reverse('brand-lookbooks-list', kwargs={'url_param': self.brand.url_param})
        view = LookbookListView.as_view()
        request = self.factory.get(path)
        response = view(request, url_param=self.brand.url_param)
        self.assertEqual(response.status_code, 200)

    def test_lookbook_detail_view(self):
        path = reverse('brand-lookbooks-detail', kwargs={'url_param': self.brand.url_param, 'season': self.lookbook.season})
        view = LookbookDetailView.as_view()
        request = self.factory.get(path)
        response = view(request, url_param=self.brand.url_param, season=self.lookbook.season)
        self.assertEqual(response.status_code, 200)

    def test_picture_detail_view(self):
        path = reverse('picture-detail', kwargs={'url_param': self.brand.url_param, 'season': self.lookbook.season, 'uuid': self.picture.uuid})
        view = PictureDetailView().as_view()
        request = self.factory.get(path)
        response = view(request, uuid=self.picture.uuid)
        self.assertEqual(response.status_code, 200)