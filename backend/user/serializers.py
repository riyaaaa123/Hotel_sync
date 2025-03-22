from rest_framework import serializers
from .models import HotelUser

class HotelUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelUser
        fields = '__all__'
