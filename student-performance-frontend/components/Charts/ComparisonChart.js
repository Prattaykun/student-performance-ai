import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ComparisonChart({ studentData, averageData }) {
  const data = [
    {
      subject: 'Study Time',
      A: Number(studentData.StudyTimeWeekly || 0),
      B: averageData.averageStudyTime,
      fullMark: 20, // Approximate max based on CSV
    },
    {
      subject: 'Absences',
      A: Number(studentData.Absences || 0),
      B: averageData.averageAbsences,
      fullMark: 30, // Approximate max
    },
    {
      subject: 'GPA',
      A: Number(studentData.GPA || 0) * 5, // Scale up for visibility if GPA is low
      B: averageData.averageGPA * 5,
      fullMark: 20, // 4.0 * 5
    },
  ];

  return (
    <div className="card">
      <h3>Student vs Average Comparison</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Student"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Average"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
