from django.urls import path
from .views import predict_booking_and_cancellation

urlpatterns = [
    path('predict/', predict_booking_and_cancellation),
]
