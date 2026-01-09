from fastapi import FastAPI
from app.routes import students, predict

app = FastAPI(title="Student Performance AI")

app.include_router(students.router)
app.include_router(predict.router)