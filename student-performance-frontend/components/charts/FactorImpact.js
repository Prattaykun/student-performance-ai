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
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Parental Education Impact on GPA</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 60,
            right: 40,
            left: 50,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickMargin={10} label={{ value: 'Parental Education Level', position: 'bottom', offset: 24 }} />
          <YAxis tickMargin={10} label={{ value: 'Average GPA', angle: -90, position: 'insideLeft', offset: 12 }} />
          <Tooltip />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 8 }} />
          <Bar dataKey="GPA" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
