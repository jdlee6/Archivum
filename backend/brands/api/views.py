from rest_framework.generics import ListAPIView, RetrieveAPIView
from brands.models import Brand
from .serializers import BrandSerializer


class BrandListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetailView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'url_param'