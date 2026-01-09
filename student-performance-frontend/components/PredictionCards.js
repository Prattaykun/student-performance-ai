export default function PredictionCards({ data }) {
  if (!data) return null;

  // Helper to format values nicely
  const formatValue = (key, val) => {
    if (typeof val === 'number') {
      if (key === 'GPA') return val.toFixed(2);
      if (key === 'StudyTimeWeekly') return val.toFixed(2);
      if (key === 'Absences') return val.toFixed(1);
    }
    return val;
  };

  return (
    <div className="grid-cards">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="card">
          <div className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
          <div className="stat-value">{formatValue(key, value)}</div>
        </div>
      ))}
    </div>
  );
}
