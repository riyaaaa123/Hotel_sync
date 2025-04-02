from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from .models import HotelUser
from .serializers import HotelUserSerializer

@api_view(['POST'])
def create_user(request):
    data = request.data
    data['password'] = make_password(data['password'])  # Hash the password
    serializer = HotelUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def signin_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=400)

    try:
        user = HotelUser.objects.filter(email=email).first()
    except HotelUser.DoesNotExist: 
        return Response({'error': 'Invalid email or password.'}, status=401)
    if check_password(password, user.password):
        user_data = {
            'hotel_name': user.hotel_name,
            'email': user.email,
            'owner_name': user.owner_name,
        }
        return Response({'message': 'Login successful', 'user': user_data}, status=200)
    else:
        return Response({'error': 'Invalid email or password'}, status=401)


@api_view(['POST'])
def update_location(request):
    email = request.data.get('email')
    latitude = request.data.get('latitude')
    longitude = request.data.get('longitude')

    try:
        user = HotelUser.objects.get(email=email)
        user.latitude = latitude
        user.longitude = longitude
        user.save()
        return Response({"message": "Location updated successfully", "latitude": latitude, "longitude": longitude}, status=200)
    except HotelUser.DoesNotExist:
        return Response({"error": "User not found"}, status=404)