import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function GradeDistChart({ distData, predictedClass }) {
  if (!distData) return null;

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Grade Class Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {distData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={entry.name === `Class ${predictedClass}` ? "red" : "none"} strokeWidth={entry.name === `Class ${predictedClass}` ? 3 : 0}/>
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {predictedClass !== undefined && (
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#666', marginTop: '10px' }}>
              Red outline indicates predicted class.
          </p>
      )}
    </div>
  );
}
