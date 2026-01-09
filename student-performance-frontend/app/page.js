"use client";
import { useState } from "react";
import axios from "axios";
import PerformanceChart from "../components/PerformanceChart";

export default function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [result, setResult] = useState(null);
  const backendUrl = "http://127.0.0.1:8000"||"https://student-performance-ai-98aw.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${backendUrl}/predict`, {
      params: { age, gender }
    });
    setResult(res.data.prediction);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f7fb" }}>
      <h1 style={{ textAlign: "center" }}>🎓 Student Performance AI</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Predict Performance
        </button>
      </form>

      {result && (
        <div style={{ maxWidth: "700px", margin: "40px auto" }}>
          <h2 style={{ textAlign: "center" }}>Prediction Results</h2>
          <PerformanceChart data={result} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "20px"
            }}
          >
            {Object.entries(result).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}
              >
                <strong>{key}</strong>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}