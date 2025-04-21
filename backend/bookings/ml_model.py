import joblib
import os

# Load model once at startup
model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ml_models/xgb_booking_model.pkl')
model = joblib.load(model_path)
