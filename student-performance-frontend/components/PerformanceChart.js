"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PerformanceChart({ data }) {
  const chartData = [
    { name: "Study Time", value: Number(data.StudyTimeWeekly || 0) },
    { name: "Absences", value: Number(data.Absences || 0) },
    { name: "GPA", value: Number(data.GPA || 0) }
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}