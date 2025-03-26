from django.db import models

class HotelUser(models.Model):
    hotel_name = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) 
    latitude = models.FloatField(null=True, blank=True)  
    longitude = models.FloatField(null=True, blank=True) 

    def __str__(self):
        return f"{self.hotel_name} ({self.email})"
