from django.db import models
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

cancellation_model = joblib.load("cancellation_model.pkl")
booking_model = joblib.load("booking_model.pkl")
arima_model = joblib.load("arima_model.pkl")
scaler = joblib.load("scaler.pkl")  # Save and load the fitted scaler
