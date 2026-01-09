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

    # Default ethnicity
    if ethnicity is None:
        ethnicity = encoders["Ethnicity"].classes_[0]

    if ethnicity not in encoders["Ethnicity"].classes_:
        raise ValueError(f"Unknown ethnicity: {ethnicity}")

    # Build input
    input_df = pd.DataFrame([{
        "Age": int(age),
        "Gender": int(gender),   # already numeric (0/1)
        "Ethnicity": encoders["Ethnicity"].transform([ethnicity])[0]
    }])

    # Predict
    preds = model.predict(input_df)[0]

    # 🔥 BUILD RESULT (THIS WAS MISSING)
    result = {}

    for i, col in enumerate(outputs):
        value = preds[i]

        if col in encoders:
            result[col] = safe_inverse(encoders[col], value)
        else:
            result[col] = float(round(value, 2))

    # FINAL SAFETY: numpy → python
    clean_result = {}
    for k, v in result.items():
        if hasattr(v, "item"):
            clean_result[k] = v.item()
        else:
            clean_result[k] = v

    return clean_result
