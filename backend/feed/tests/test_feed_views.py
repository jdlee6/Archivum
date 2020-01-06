import pytest
from mixer.backend.django import mixer
from django.urls import reverse
from django.test import TestCase, RequestFactory
from feed.api.views import LookbookListView, LookbookDetailView, PictureDetailView


class TestViews(TestCase):
    def setUp(self):
        self.brand = mixer.blend('feed.Brand')
        self.lookbook = mixer.blend('feed.Lookbook', brand=self.brand)
        self.picture = mixer.blend('feed.Picture')
        self.factory = RequestFactory()

    def test_lookbook_list_view(self):
        view = LookbookListView.as_view()
        request = self.factory.get(view)
        response = view(request, url_param=self.brand.url_param)
        self.assertEqual(response.status_code, 200)

    def test_lookbook_detail_view(self):
        view = LookbookDetailView.as_view()
        request = self.factory.get(view)
        response = view(request, url_param=self.brand.url_param, season=self.lookbook.season)
        self.assertEqual(response.status_code, 200)

    def test_picture_detail_view(self):
        view = PictureDetailView().as_view()
        request = self.factory.get(view)
        response = view(request, uuid=self.picture.uuid)
        self.assertEqual(response.status_code, 200)