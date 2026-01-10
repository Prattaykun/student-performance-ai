"use client";
import { useState } from "react";
import axios from "axios";
import stats from "../data/stats.json";

import InputForm from "../components/InputForm";
import PredictionCards from "../components/PredictionCards";
import RadarProfile from "../components/charts/RadarProfile";
import StudyTrendChart from "../components/charts/StudyTrendChart";
import GradeDistChart from "../components/charts/GradeDistChart";
import FactorImpact from "../components/charts/FactorImpact";

export default function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://student-performance-ai-98aw.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Validate age range 14-19 before making request
    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum < 14 || ageNum > 19) {
      setError("Age must be between 14 and 19 because the model is trained on this range dataset.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${backendUrl}/predict`, {
        params: { age: ageNum, gender }
      });
      if (res.data.status === "success") {
          setResult(res.data.prediction);
      } else {
          setError("Prediction failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--primary)" }}>
           Student Performance Prediction
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
         As the model is deployed on free plan of render,wait for it to wake up!(refresh if needed) 
        </p>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <InputForm
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          onSubmit={handleSubmit}
          loading={loading}
        />
        {error && <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</p>}
      </section>

      {result && (
        <div className="animate-fade-in">

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Prediction Overview</h2>
            <PredictionCards data={result} />
          </section>

          <section>
             <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Analysis & Trends</h2>
             <div style={{
               display: "grid",
               gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
               gap: "2rem"
             }}>
                <RadarProfile prediction={result} averages={stats.averages} />
                <StudyTrendChart
                   trendData={stats.trends.studyTime}
                   studentGPA={result.GPA}
                   studentStudyTime={result.StudyTimeWeekly}
                />
                <GradeDistChart distData={stats.distributions.gradeClass} predictedClass={result.GradeClass} />
                <FactorImpact eduTrend={stats.trends.parentalEducation} />
             </div>
          </section>
        </div>
      )}
    </main>
  );
}
