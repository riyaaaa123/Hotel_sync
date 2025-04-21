from django.db import models
from django.core.validators import MinValueValidator

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

class JSONUpload(models.Model):
    hotel_user = models.ForeignKey('HotelUser', on_delete=models.CASCADE, related_name='json_uploads')
    file = models.FileField(upload_to='json_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Upload by {self.hotel_user.hotel_name} on {self.uploaded_at}"
    
class Inventory(models.Model):
    FREQUENCY_CHOICES = [
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('MONTHLY', 'Monthly'),
    ]
    
    DAY_CHOICES = [
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    ]
    
    hotel = models.ForeignKey(HotelUser, on_delete=models.CASCADE, related_name='inventories')
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    daily_quantity = models.PositiveIntegerField()
    order_frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES)
    order_day = models.CharField(max_length=3, choices=DAY_CHOICES, blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Inventories"
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} - {self.hotel.hotel_name}"
    