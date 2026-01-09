"use client";
import { useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://127.0.0.1:8000"||"https://student-performance-ai-98aw.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/predict`, {
        params: { age, gender }
      });
      setResult(res.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to fetch prediction. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎓 Student Performance AI</h1>
        <p>Advanced analytics and performance prediction dashboard</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label>Age</label>
              <input
                className="form-control"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="15"
                max="100"
                placeholder="Enter age (15-18)"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Predict Performance"}
          </button>
        </form>
      </div>

      <Dashboard predictionResult={result} />
    </div>
  );
}
