from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import check_password
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import HotelUser,JSONUpload,Inventory
from .serializers import HotelUserSerializer,JSONUploadSerializer,InventorySerializer

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
            'id' : user.id,
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
    
@api_view(['POST'])
def upload_json(request):
    parser_classes = (MultiPartParser, FormParser)
    
    serializer = JSONUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "JSON file uploaded successfully", "data": serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def create_inventory(request):
    try:
        hotel = HotelUser.objects.get(id=request.data['id'])
        data = request.data.copy()
        data['hotel'] = request.data['id'];  
        
        serializer = InventorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except HotelUser.DoesNotExist:
        return Response({'error': 'Hotel not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_inventory(request):
    try:
        inventory = Inventory.objects.filter(hotel=request.query_params.get('id'))
        serializer = InventorySerializer(inventory, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Inventory.DoesNotExist:
        return Response({'error': 'Inventory not found'}, status=status.HTTP_404_NOT_FOUND)