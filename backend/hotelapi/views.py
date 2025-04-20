import joblib
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Load the saved models once
booking_model = joblib.load("booking_model.pkl")
cancellation_model = joblib.load("cancellation_model.pkl")

@api_view(['POST'])
def predict_bookings_and_cancellations(request):
    try:
        data = request.data

        # Extract features from request
        input_data = {
            "city": [data.get("city")],
            "room_type": [data.get("room_type")],
            "area": [data.get("area")],
            "is_holiday": [data.get("is_holiday")],
            "is_refundable": [data.get("is_refundable")],
            "number_of_rooms": [data.get("number_of_rooms")],
            "price": [data.get("price")],
            "discount": [data.get("discount")]
        }

        import pandas as pd
        df_input = pd.DataFrame(input_data)

        # Predict
        predicted_bookings = booking_model.predict(df_input)[0]
        predicted_cancellations = cancellation_model.predict(df_input)[0]

        return JsonResponse({
            "predicted_bookings": min(round(predicted_bookings), data.get("number_of_rooms")),
            "predicted_cancellations": min(round(predicted_cancellations), min(round(predicted_bookings), data.get("number_of_rooms")))
        })


    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
