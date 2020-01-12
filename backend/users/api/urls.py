from django.urls import path, include
from rest_framework.authtoken import views
from users.api.views import (
    UserDetailView, 
    UserListView, 
    UserUpdateView,
    UserDeleteView,
    UserCreateView
)


urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('register/', UserCreateView.as_view(), name='user-create'),
    path('<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('<int:id>/update/', UserUpdateView.as_view(), name='user-update'),
    path('<int:id>/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('get_auth_token/', views.obtain_auth_token, name='get-token')
]