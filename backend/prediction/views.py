from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import pandas as pd
import numpy as np
import joblib

# Load models
cancellation_model = joblib.load("cancellation_model.pkl")
booking_model = joblib.load("booking_model.pkl")
arima_model = joblib.load("arima_model.pkl")
scaler = joblib.load("scaler.pkl")

@api_view(["POST"])
def predict_booking(request):
    data = request.data
    features = pd.DataFrame([data])

    # Print expected vs. actual features
    print("Features expected by the scaler:", scaler.feature_names_in_)
    print("Current Feature Names:", features.columns.tolist())

    # Ensure only the required features are used
    features = features[[col for col in scaler.feature_names_in_ if col in features.columns]]

    # Add missing features with default values
    for feature in scaler.feature_names_in_:
        if feature not in features.columns:
            features[feature] = 0  # Assign a default value

    # Scale the input features
    features_scaled = scaler.transform(features)

    # Predict cancellation
    prediction = cancellation_model.predict(features_scaled)[0]

    return Response({"cancellation_prediction": int(prediction)})

@api_view(["GET"])
def predict_daily_bookings(request):
    date = request.GET.get("date", None)

    if not date:
        return JsonResponse({"error": "Date parameter is required"}, status=400)

    print("Received Date:", date)  # Debugging

    try:
        # Generate Forecast
        forecast = arima_model.forecast(steps=1)
        print("Forecast Output:", forecast)

        # ✅ Extract Value Properly
        forecast_value = forecast.iloc[0]  # Use .iloc[0] to get the float

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"predicted_bookings": forecast_value})