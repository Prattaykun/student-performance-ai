const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../data/students.csv');
const outPath = path.join(__dirname, '../data/stats.json');

try {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) continue;

    const record = {};
    headers.forEach((h, index) => {
      // Try to parse numbers
      const val = values[index];
      record[h] = isNaN(Number(val)) ? val : Number(val);
    });
    records.push(record);
  }

  // --- Calculations ---

  // 1. Global Averages
  const numericFields = ['GPA', 'StudyTimeWeekly', 'Absences', 'Age', 'ParentalSupport', 'ParentalEducation'];
  const sums = {};
  numericFields.forEach(f => sums[f] = 0);

  records.forEach(r => {
    numericFields.forEach(f => {
      sums[f] += r[f];
    });
  });

  const averages = {};
  numericFields.forEach(f => {
    averages[f] = sums[f] / records.length;
  });

  // 2. Distributions
  const gradeClassDist = {};
  records.forEach(r => {
    const gc = r.GradeClass;
    gradeClassDist[gc] = (gradeClassDist[gc] || 0) + 1;
  });

  // 3. Trends

  // StudyTime vs GPA (Binning by 2 hours)
  const studyTimeBins = {};
  records.forEach(r => {
    const bin = Math.floor(r.StudyTimeWeekly / 2) * 2; // 0, 2, 4, ...
    if (!studyTimeBins[bin]) studyTimeBins[bin] = { sumGPA: 0, count: 0 };
    studyTimeBins[bin].sumGPA += r.GPA;
    studyTimeBins[bin].count += 1;
  });

  const studyTimeTrend = Object.keys(studyTimeBins)
    .sort((a, b) => Number(a) - Number(b))
    .map(bin => ({
      studyTime: `${bin}-${Number(bin)+2}`,
      avgGPA: studyTimeBins[bin].sumGPA / studyTimeBins[bin].count
    }));

  // Absences vs GPA (Binning by 2)
  const absenceBins = {};
  records.forEach(r => {
    const bin = Math.floor(r.Absences / 2) * 2;
    if (!absenceBins[bin]) absenceBins[bin] = { sumGPA: 0, count: 0 };
    absenceBins[bin].sumGPA += r.GPA;
    absenceBins[bin].count += 1;
  });

  const absenceTrend = Object.keys(absenceBins)
    .sort((a, b) => Number(a) - Number(b))
    .map(bin => ({
      absences: `${bin}-${Number(bin)+2}`,
      avgGPA: absenceBins[bin].sumGPA / absenceBins[bin].count
    }));

  // Parental Education vs GPA
  const eduBins = {};
  records.forEach(r => {
    const edu = r.ParentalEducation;
    if (!eduBins[edu]) eduBins[edu] = { sumGPA: 0, count: 0 };
    eduBins[edu].sumGPA += r.GPA;
    eduBins[edu].count += 1;
  });

  const eduTrend = Object.keys(eduBins)
    .sort((a, b) => Number(a) - Number(b))
    .map(edu => ({
      educationLevel: edu,
      avgGPA: eduBins[edu].sumGPA / eduBins[edu].count
    }));

  // Grade Class Labels (Mapping for Pie Chart)
  // Assuming 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'F' based on common datasets,
  // or the prompt might imply GradeClass is just a number.
  // Let's keep it as number but formatted for chart.
  const gradeClassData = Object.keys(gradeClassDist).map(key => ({
    name: `Class ${key}`,
    value: gradeClassDist[key]
  }));

  const stats = {
    count: records.length,
    averages,
    distributions: {
      gradeClass: gradeClassData
    },
    trends: {
      studyTime: studyTimeTrend,
      absences: absenceTrend,
      parentalEducation: eduTrend
    }
  };

  fs.writeFileSync(outPath, JSON.stringify(stats, null, 2));
  console.log('Stats generated successfully.');

} catch (err) {
  console.error('Error generating stats:', err);
  process.exit(1);
}
