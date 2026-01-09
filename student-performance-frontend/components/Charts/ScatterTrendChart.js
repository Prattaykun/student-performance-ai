import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ScatterTrendChart({ data, title, xLabel, yLabel }) {
  // Downsample if data is too large for performance
  const displayData = data.length > 500 ? data.filter((_, i) => i % Math.ceil(data.length / 500) === 0) : data;

  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={xLabel} unit="" />
            <YAxis type="number" dataKey="y" name={yLabel} unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name={title} data={displayData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
