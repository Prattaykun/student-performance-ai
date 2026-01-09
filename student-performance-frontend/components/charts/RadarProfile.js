import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

export default function RadarProfile({ prediction, averages }) {
  if (!prediction || !averages) return null;

  // We need to normalize or pick comparable fields
  // GPA is 0-4, Absences 0-30, StudyTime 0-20, Support 0-4
  // Let's normalize to a 0-100 scale ideally, or just plot raw if they are somewhat comparable or use separate axes.
  // Radar charts are best when axes are normalized.

  // Let's pick a few key metrics and simple scaling for visualization
  // GPA (max ~4), StudyTime (max ~20), Absences (max ~30), Support (max 4), Education (max 4)

  // Custom normalization function for display purposes
  const normalize = (val, max) => (val / max) * 100;

  const data = [
    {
      subject: 'GPA',
      A: normalize(prediction.GPA, 4),
      B: normalize(averages.GPA, 4),
      fullMark: 100
    },
    {
      subject: 'Study Time',
      A: normalize(prediction.StudyTimeWeekly, 20),
      B: normalize(averages.StudyTimeWeekly, 20),
      fullMark: 100
    },
    {
      subject: 'Absences',
      // Invert absences because less is better? Or just show raw magnitude?
      // Let's show magnitude.
      A: normalize(prediction.Absences, 30),
      B: normalize(averages.Absences, 30),
      fullMark: 100
    },
    {
      subject: 'Support',
      A: normalize(prediction.ParentalSupport, 4),
      B: normalize(averages.ParentalSupport, 4),
      fullMark: 100
    },
    {
      subject: 'Parent Edu',
      A: normalize(prediction.ParentalEducation, 4),
      B: normalize(averages.ParentalEducation, 4),
      fullMark: 100
    }
  ];

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Student Profile vs Average</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="This Student"
            dataKey="A"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.6}
          />
          <Radar
            name="Average"
            dataKey="B"
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.3}
          />
          <Legend />
          <Tooltip formatter={(value) => value.toFixed(0) + '% (Scaled)'} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
