import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

export default function StudyTrendChart({ trendData, studentGPA, studentStudyTime }) {
  if (!trendData) return null;

  // We want to overlay the current student's position
  // We need to find which bin the student falls into
  // trendData has "studyTime" keys like "0-2", "2-4"

  // Let's just plot the trend line (Avg GPA vs Study Time)
  // And maybe a reference dot for the student

  // Format data for Recharts
  // trendData is [{ studyTime: "0-2", avgGPA: 1.6 }, ...]

  const chartData = trendData.map(d => ({
    name: d.studyTime,
    "Average GPA": Number(d.avgGPA.toFixed(2))
  }));

  // Calculate student x-axis index/position approximately
  // studentStudyTime is e.g. 9.62. Bins are 0-2, 2-4...
  // 9.62 falls in "8-10" bin (index 4) or "10-12" (index 5)?
  // 0-2 is index 0. 2-4 index 1.
  // Math.floor(9.62 / 2) = 4. So index 4.
  // The name of index 4 is "8-10".

  // Instead of complex ReferenceDot x-axis matching which can be tricky with categorical axis,
  // we can just display the chart.

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>GPA Trend by Study Time</h3>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" label={{ value: 'Weekly Study Time (Hours)', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'GPA', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Average GPA" barSize={20} fill="#4f46e5" />
            <Line type="monotone" dataKey="Average GPA" stroke="#ff7300" />
            {studentStudyTime && studentGPA && (
               <ReferenceDot
                  x={chartData[Math.min(Math.floor(studentStudyTime / 2), chartData.length-1)]?.name}
                  y={studentGPA}
                  r={6}
                  fill="red"
                  stroke="none"
                  ifOverflow="extendDomain"
               />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {studentStudyTime && (
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#666', marginTop: '10px' }}>
              Red dot indicates predicted student position (approximate bin).
          </p>
      )}
    </div>
  );
}
