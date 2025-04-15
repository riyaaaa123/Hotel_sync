from rest_framework import serializers
from .models import HotelUser,JSONUpload,Inventory

class HotelUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelUser
        fields = '__all__'
class JSONUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = JSONUpload
        fields = ['id', 'hotel_user', 'file', 'uploaded_at']
        read_only_fields = ['uploaded_at']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
        read_only_fields = ['last_updated']