from django.urls import path
from .views import BrandListView, BrandDetailView


urlpatterns = [
    path('brands/', BrandListView.as_view()),
    path('brands/<slug:url_param>/', BrandDetailView.as_view(), name='brand-detail')
]