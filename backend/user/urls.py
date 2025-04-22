from django.urls import path
from .views import create_user,signin_user,update_location,upload_json,create_inventory,get_inventory,get_hotel_name

urlpatterns = [
    path('register/', create_user, name='create_user'),
    path('login/', signin_user, name='login_user'),
    path('location/', update_location, name='update-location'),
    path('upload/', upload_json,name='upload_json'), 
    path('create_inventory/', create_inventory, name='create_inventory'),
    path('get_inventory/', get_inventory, name='get_inventory'),
    path('get_hotelname/',get_hotel_name, name='get_hotel_name')
]
