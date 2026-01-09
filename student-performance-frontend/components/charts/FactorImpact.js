import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function FactorImpact({ eduTrend }) {
  if (!eduTrend) return null;

  const data = eduTrend.map(d => ({
    name: `Edu Lvl ${d.educationLevel}`,
    GPA: Number(d.avgGPA.toFixed(2))
  }));

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Parental Education Impact on GPA</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Parental Education Level', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Average GPA', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="GPA" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
