from fastapi import APIRouter
from ml.predict import predict

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.get("/")
def predict_student(
    age: int,
    gender: int,
    ethnicity: str | None = None
):
    prediction = predict(age, gender, ethnicity)

    return {
        "status": "success",
        "prediction": prediction
    }
