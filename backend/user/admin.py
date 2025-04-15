from django.contrib import admin
from .models import HotelUser,JSONUpload,Inventory

admin.site.register(HotelUser)
admin.site.register(JSONUpload)
admin.site.register(Inventory)

