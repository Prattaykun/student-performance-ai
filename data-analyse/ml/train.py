import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

DATA_PATH = "ml/data/students.csv"
MODEL_PATH = "ml/model/model.pkl"

def train_model():
    df = pd.read_csv(DATA_PATH)

    input_features = ["Age", "Gender", "Ethnicity"]
    output_features = [
    "ParentalEducation",
    "StudyTimeWeekly",
    "Absences",
    "Tutoring",
    "ParentalSupport",
    "Extracurricular",
    "Sports",
    "Music",
    "Volunteering",
    "GPA",
    "GradeClass"
    ]


    df = df[input_features + output_features]
    missing = [c for c in output_features if c not in df.columns]
    if missing:
     raise ValueError(f"Missing output columns in CSV: {missing}")


    encoders = {}

    # Encode Ethnicity only
    le_ethnicity = LabelEncoder()
    df["Ethnicity"] = le_ethnicity.fit_transform(df["Ethnicity"])
    encoders["Ethnicity"] = le_ethnicity

    # Encode categorical outputs
    categorical_outputs = [
        "ParentalEducation", "Tutoring", "ParentalSupport",
        "Extracurricular", "Sports", "Music",
        "Volunteering", "GradeClass"
    ]

    for col in categorical_outputs:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    X = df[input_features]
    y = df[output_features]

    X_train, _, y_train, _ = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = MultiOutputRegressor(
        RandomForestRegressor(n_estimators=200, random_state=42)
    )
    model.fit(X_train, y_train)

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(
        {
            "model": model,
            "encoders": encoders,
            "outputs": output_features
        },
        MODEL_PATH
    )

    print("✅ Model trained successfully")

if __name__ == "__main__":
    train_model()
