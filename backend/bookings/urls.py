from django.urls import path
from .views import predict_booking

urlpatterns = [
    path('predict/', predict_booking),
]
