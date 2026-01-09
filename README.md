# Student Performance AI

This project predicts student performance based on age, gender, and ethnicity.
It includes:
- ML training pipeline using CSV data
- FastAPI backend with endpoints
- Auto retraining when new student data is added

Tech: Python, Pandas, Scikit-learn, FastAPI

## Run the API
- Create and activate a virtual environment.
- Install requirements from `data-analyse/requirements.txt`.
- Start the server with `uvicorn`, pointing to the app directory.

Windows PowerShell example:

```
cd D:\projects\FastAPI\student-performance-ai
python -m venv data-analyse\venv
& data-analyse\venv\Scripts\Activate.ps1
pip install -r data-analyse\requirements.txt
uvicorn --app-dir data-analyse app.main:app --reload
```

The API runs at http://127.0.0.1:8000.