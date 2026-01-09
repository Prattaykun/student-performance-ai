import joblib
from pprint import pprint

MODEL_PATH = "ml/model/model.pkl"

bundle = joblib.load(MODEL_PATH)

print("\n Model bundle loaded successfully\n")

print("🔑 Bundle keys:")
print(list(bundle.keys()))

print("\n Output features (what the model predicts):")
outputs = bundle.get("outputs", [])
if not outputs:
    print(" No output features found (this is why prediction is empty)")
else:
    pprint(outputs)

print("\n Encoders present:")
encoders = bundle.get("encoders", {})
if not encoders:
    print(" No encoders found")
else:
    pprint(list(encoders.keys()))

print("\n Model type:")
model = bundle.get("model")
print(type(model))

print("\nSanity check:")
if outputs and model:
    print(" Model is correctly trained and ready for prediction")
else:
    print(" Model is NOT correctly trained – retrain required")
