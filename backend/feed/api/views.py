from rest_framework.generics import ListAPIView, RetrieveAPIView
from feed.models import Brand, Lookbooks
from .serializers import BrandSerializer, LookbooksSerializer
from django.shortcuts import get_object_or_404


class BrandListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetailView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'url_param'

class LookbooksListView(ListAPIView):
    serializer_class = LookbooksSerializer

    def get_queryset(self):
        brand = Brand.objects.filter(url_param=self.kwargs['url_param']).first()
        return Lookbooks.objects.filter(brand=brand)

class LookbooksDetailView(RetrieveAPIView):
    serializer_class = LookbooksSerializer
    lookup_field = 'season'

    def get_queryset(self):
        brand = Brand.objects.filter(url_param=self.kwargs['url_param']).first()
        return Lookbooks.objects.filter(brand=brand, season=self.kwargs['season'])
