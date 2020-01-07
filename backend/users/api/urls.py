from users.api.views import (
    UserDetailView, 
    UserListView, 
    UserUpdateView
)
from django.urls import path, include


urlpatterns = [
    path('', UserListView.as_view(), name='users-list'),
    path('<int:id>/', UserDetailView.as_view()),
    path('<int:id>/update/', UserUpdateView.as_view())
]