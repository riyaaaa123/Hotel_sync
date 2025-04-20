from django.urls import path
from .views import predict_bookings_and_cancellations

urlpatterns = [
    path("predict/", predict_bookings_and_cancellations, name="predict"),
]
