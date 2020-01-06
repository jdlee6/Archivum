import pytest
from mixer.backend.django import mixer
from django.urls import reverse
from django.test import TestCase, RequestFactory
from feed.api.views import LookbookListView, LookbookDetailView, PictureDetailView


class TestViews(TestCase):
    @classmethod
    def setUpClass(cls):
        super(TestViews, cls).setUpClass()
        cls.brand = mixer.blend('feed.Brand')
        # establish relationship between lookbook and brand for detail view
        cls.lookbook = mixer.blend('feed.Lookbook', brand=cls.brand)
        cls.picture = mixer.blend('feed.Picture')
        cls.factory = RequestFactory()

    def test_lookbook_list_view(self):
        view = LookbookListView.as_view()
        # create instance of get request
        request = self.factory.get(view)
        # test view() as if it was deployed on lookbooklistview
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