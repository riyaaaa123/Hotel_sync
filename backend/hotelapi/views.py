import os
import glob
import pandas as pd
import joblib
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Load models once at the top
booking_model = joblib.load("booking_model.pkl")
cancellation_model = joblib.load("cancellation_model.pkl")

@api_view(['GET'])
def predict_from_latest_file(request):
    try:
        # Step 1: Find most recent CSV file
        folder_path = os.path.join("json_files")
        list_of_files = glob.glob(os.path.join(folder_path, "*.csv"))
        if not list_of_files:
            return JsonResponse({"error": "No CSV files found."}, status=404)

        latest_file = max(list_of_files, key=os.path.getctime)
        print("Found latest file:", latest_file)

        # Step 2: Load CSV
        df = pd.read_csv(latest_file)
        print("CSV Loaded. Shape:", df.shape)

        required_columns = [
            "city", "room_type", "area", "is_holiday",
            "is_refundable", "number_of_rooms", "price", "discount"
        ]
        for col in required_columns:
            if col not in df.columns:
                return JsonResponse({"error": f"Missing column in CSV: {col}"}, status=400)

        # Step 3: Iterate and predict
        total_bookings = 0
        total_cancellations = 0

        for index, row in df.iterrows():
            input_data = {
                "city": [row["city"]],
                "room_type": [row["room_type"]],
                "area": [row["area"]],
                "is_holiday": [row["is_holiday"]],
                "is_refundable": [row["is_refundable"]],
                "number_of_rooms": [row["number_of_rooms"]],
                "price": [row["price"]],
                "discount": [row["discount"]],
            }

            df_input = pd.DataFrame(input_data)

            try:
                bookings = booking_model.predict(df_input)[0]
                bookings = min(round(bookings), int(row["number_of_rooms"]))

                cancellations = cancellation_model.predict(df_input)[0]
                cancellations = min(round(cancellations), bookings)

                total_bookings += bookings
                total_cancellations += cancellations
            except Exception as model_error:
                print(f"Error in row {index}: {model_error}")
                continue  # Skip faulty rows

        return JsonResponse({
            "predicted_bookings": total_bookings,
            "predicted_cancellations": total_cancellations
        })

    except Exception as e:
        print("Exception occurred:", e)
        return JsonResponse({"error": str(e)}, status=500)
