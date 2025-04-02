from django.urls import path
from .views import predict_booking, predict_daily_bookings

urlpatterns = [
    path("predict-booking/", predict_booking, name="predict_booking"),
    path("predict-daily-bookings", predict_daily_bookings, name="predict_daily_bookings"),
]
