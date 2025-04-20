from django.urls import path
from .views import predict_from_latest_file

urlpatterns = [
    path('predict/', predict_from_latest_file),
]
