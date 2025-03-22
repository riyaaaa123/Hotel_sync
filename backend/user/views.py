from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import HotelUser
from .serializers import HotelUserSerializer

@api_view(['POST'])
def create_user(request):
    serializer = HotelUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
