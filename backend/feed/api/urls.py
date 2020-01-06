from django.urls import path
from .views import (
    BrandListView,
    BrandDetailView,
    LookbookListView,
    LookbookDetailView,
    PictureDetailView,
    Upload
)


urlpatterns = [
    path('brands/', BrandListView.as_view(), name='brands-list'),
    path('brands/<str:url_param>/', BrandDetailView.as_view(), name='brand-detail'),
    path('brands/<str:url_param>/lookbooks/', LookbookListView.as_view(), name='brand-lookbooks-list'),
    path('brands/<str:url_param>/lookbooks/<str:season>/', LookbookDetailView.as_view(), name='brand-lookbooks-detail'),
    path('brands/<str:url_param>/lookbooks/<str:season>/<str:uuid>', PictureDetailView.as_view(), name='picture-detail'),
    path('upload/', Upload.as_view())
]