import os
import joblib
import pandas as pd
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Load artifacts once
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PREPROC_PATH    = os.path.join(BASE_DIR, 'models', 'preproc.pkl')
TREE_BOOK_PATH  = os.path.join(BASE_DIR, 'models', 'tree_book.pkl')
TREE_CANCEL_PATH= os.path.join(BASE_DIR, 'models', 'tree_cancel.pkl')

preproc     = joblib.load(PREPROC_PATH)
tree_book   = joblib.load(TREE_BOOK_PATH)
tree_cancel = joblib.load(TREE_CANCEL_PATH)

# 12 major 2024 holidays
holidays = {
    datetime(2024,1,26).date(), datetime(2024,3,25).date(),
    datetime(2024,3,29).date(), datetime(2024,4,10).date(),
    datetime(2024,4,17).date(), datetime(2024,6,16).date(),
    datetime(2024,8,15).date(), datetime(2024,9,7).date(),
    datetime(2024,10,2).date(), datetime(2024,10,12).date(),
    datetime(2024,11,1).date(), datetime(2024,12,25).date()
}

@api_view(['POST'])
def predict_booking_and_cancellation(request):
    """
    Expects JSON:
    {
      "date":          "2024-05-17",
      "city":          "Roorkee",
      "room_type":     "deluxe",
      "area":          "city",
      "avg_rooms":     2.0,
      "price_mean":    4500.0,
      "discount_mean": 0.10,
      "refund_rate":   0.8
    }
    Returns:
    {
      "bookings":      123.0,
      "cancellations": 45.0
    }
    """
    data = request.data
    try:
        # parse & derive
        dt = pd.to_datetime(data['date']).date()
        dow   = dt.weekday()
        month = dt.month
        is_hol= int(dt in holidays)

        # build one-row DataFrame
        df = pd.DataFrame([{
            'city':          data['city'],
            'room_type':     data['room_type'],
            'area':          data['area'],
            'avg_rooms':     data['avg_rooms'],
            'price_mean':    data['price_mean'],
            'discount_mean': data['discount_mean'],
            'refund_rate':   data['refund_rate'],
            'day_of_week':   dow,
            'month':         month,
            'is_holiday':    is_hol
        }])

        # transform & predict
        X_enc   = preproc.transform(df)
        pred_b  = tree_book.predict(X_enc)[0]
        pred_c  = tree_cancel.predict(X_enc)[0]

        return Response({
            'bookings':      float(pred_b),
            'cancellations': float(pred_c)
        })

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
