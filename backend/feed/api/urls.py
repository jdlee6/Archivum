from django.urls import path
from .views import BrandListView, BrandDetailView, LookbooksListView, LookbooksDetailView
urlpatterns = [
    path('brands/', BrandListView.as_view()),
    path('brands/<slug:url_param>/', BrandDetailView.as_view(), name='brand-detail'),
    path('brands/<slug:url_param>/lookbooks/', LookbooksListView.as_view(), name='brand-lookbooks-list'),
    path('brands/<slug:url_param>/lookbooks/<season>/', LookbooksDetailView.as_view(), name='brand-lookbooks-detail')
]