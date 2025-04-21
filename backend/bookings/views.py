from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import model
import pandas as pd

@api_view(['POST'])
def predict_booking(request):
    try:
        # Get data from JSON
        input_data = request.data

        # Convert to DataFrame
        df = pd.DataFrame([input_data])

        # Predict using model
        prediction = model.predict(df)[0]
        result = {
            'predicted_bookings': round(prediction[0]),
            'predicted_cancellations': round(prediction[1])
        }
        return Response(result)

    except Exception as e:
        return Response({'error': str(e)}, status=400)
