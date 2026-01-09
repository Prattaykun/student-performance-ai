import joblib
import pandas as pd
import numpy as np

MODEL_PATH = "ml/model/model.pkl"

def safe_inverse(le, value):
    value = int(round(value))
    value = max(0, min(value, len(le.classes_) - 1))
    return le.inverse_transform([value])[0]

def predict(age: int, gender: int, ethnicity: str | None = None):
    bundle = joblib.load(MODEL_PATH)

    model = bundle["model"]
    encoders = bundle["encoders"]
    outputs = bundle["outputs"]

    if ethnicity is None:
        ethnicity = encoders["Ethnicity"].classes_[0]

    # 🔒 SAFETY: ensure ethnicity exists
    if ethnicity not in encoders["Ethnicity"].classes_:
        raise ValueError(f"Unknown ethnicity: {ethnicity}")

    input_df = pd.DataFrame([{
        "Age": int(age),
        "Gender": int(gender),
        "Ethnicity": encoders["Ethnicity"].transform([ethnicity])[0]
    }])

    preds = model.predict(input_df)[0]

    result = {}

# FINAL SAFETY CONVERSION
    clean_result = {}
    for k, v in result.items():
        if hasattr(v, "item"):      # numpy scalar
            clean_result[k] = v.item()
        else:
            clean_result[k] = v
    return clean_result

