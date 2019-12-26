from rest_framework.generics import ListAPIView, RetrieveAPIView
from feed.models import Brand, Lookbook, Picture
from .serializers import BrandSerializer, LookbookSerializer, PictureSerializer

class BrandListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetailView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'url_param'

class LookbookListView(ListAPIView):
    serializer_class = LookbookSerializer

    def get_queryset(self):
        brand = Brand.objects.filter(url_param=self.kwargs['url_param']).first()
        return Lookbook.objects.filter(brand=brand)

class LookbookDetailView(RetrieveAPIView):
    serializer_class = LookbookSerializer
    lookup_field = 'season'

    def get_queryset(self):
        brand = Brand.objects.filter(url_param=self.kwargs['url_param']).first()
        return Lookbook.objects.filter(brand=brand, season=self.kwargs['season'])

class PictureDetailView(RetrieveAPIView):
    serializer_class = PictureSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Picture.objects.filter(uuid=self.kwargs['uuid'])