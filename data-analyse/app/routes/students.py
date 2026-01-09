from fastapi import APIRouter
import pandas as pd
from ml.train import train_model

router = APIRouter(prefix="/students", tags=["Students"])

DATA_PATH = "ml/data/students.csv"

@router.post("/add")
def add_student(age: int, gender: str, ethnicity: str, performance: float):
    df = pd.read_csv(DATA_PATH)
    df.loc[len(df)] = [age, gender, ethnicity, performance]
    df.to_csv(DATA_PATH, index=False)

    train_model()
    return {"message": "Student added and model retrained"}