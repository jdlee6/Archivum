from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView, 
    ListCreateAPIView, 
    UpdateAPIView
)
from rest_framework.response import Response
from feed.models import Brand, Lookbook, Picture
from .serializers import BrandSerializer, LookbookSerializer, PictureSerializer


class BrandListView(ListAPIView):
    queryset = Brand.objects.all().order_by('name')
    serializer_class = BrandSerializer


class BrandDetailView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'url_param'


class LookbookListView(ListAPIView):
    serializer_class = LookbookSerializer

    def get_queryset(self):
        brand = Brand.objects.filter(url_param=self.kwargs['url_param']).first()
        return Lookbook.objects.filter(brand=brand).order_by('year')


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


class PictureLikeToggle(RetrieveAPIView):
    permissions = (IsAuthenticated,)
    serializer_class = PictureSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Picture.objects.filter(uuid=self.kwargs['uuid'])

    def get(self, request, *args, **kwargs):
        picture_id = self.kwargs.get('uuid')
        picture = get_object_or_404(Picture, uuid=picture_id)
        user = self.request.user
        updated, liked = False, False
        if user.is_authenticated:
            if user in picture.likes.all():
                liked = False
                picture.likes.remove(user)
            else:
                liked = True
                picture.likes.add(user)
        data = {
            'updated': updated,
            'liked': liked
        }
        return Response(data, status=status.HTTP_200_OK)


class Upload(ListCreateAPIView):
    serializer_class = LookbookSerializer
    queryset = Lookbook.objects.all()