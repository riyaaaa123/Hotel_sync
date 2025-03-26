from django.urls import path
from .views import create_user,signin_user

urlpatterns = [
    path('register/', create_user, name='create_user'),
    path('login/', signin_user, name='login_user'),
]
