from django.urls import path
from .views import (
    BrandListView,
    BrandDetailView,
    LookbookListView,
    LookbookDetailView,
    PictureDetailView,
    PictureLikeToggle,
)


urlpatterns = [
    path('', BrandListView.as_view(), name='brands-list'),
    path('<str:url_param>/', BrandDetailView.as_view(), name='brand-detail'),
    path('<str:url_param>/lookbooks/', LookbookListView.as_view(), name='brand-lookbooks-list'),
    path('<str:url_param>/lookbooks/<str:season>/', LookbookDetailView.as_view(), name='brand-lookbooks-detail'),
    path('<str:url_param>/lookbooks/<str:season>/<str:uuid>/', PictureDetailView.as_view(), name='picture-detail'),
    path('<str:url_param>/lookbooks/<str:season>/<str:uuid>/like/', PictureLikeToggle.as_view(), name='picture-like'),
]