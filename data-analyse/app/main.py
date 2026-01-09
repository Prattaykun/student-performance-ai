from fastapi import FastAPI
from app.routes import students, predict
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Student Performance AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://student-performance-ai-five.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(students.router)
app.include_router(predict.router)