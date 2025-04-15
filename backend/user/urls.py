from django.urls import path
from .views import create_user,signin_user,update_location,upload_json,create_inventory

urlpatterns = [
    path('register/', create_user, name='create_user'),
    path('login/', signin_user, name='login_user'),
    path('location/', update_location, name='update-location'),
    path('upload/', upload_json,name='upload_json'), 
    path('create_inventory/', create_inventory, name='create_inventory')
]
