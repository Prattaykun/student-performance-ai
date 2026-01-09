const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../data/students.csv');
const jsonOutputPath = path.join(__dirname, '../data/processed_data.json');

const processData = () => {
  const csvData = fs.readFileSync(csvFilePath, 'utf8');
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const students = lines.slice(1).map(line => {
    // Handle potential carriage returns or extra whitespace
    if (!line.trim()) return null;

    const values = line.split(',');
    const student = {};
    headers.forEach((header, index) => {
      const valStr = values[index] ? values[index].trim() : '';
      const valNum = parseFloat(valStr);
      // Check if it is a valid number (and not an empty string which parseFloat converts to NaN)
      // Also handle 0 correctly
      student[header] = !isNaN(valNum) && valStr !== '' ? valNum : valStr;
    });
    return student;
  }).filter(s => s !== null);

  // Aggregation
  const genderDistribution = [
    { name: 'Male', value: 0 },
    { name: 'Female', value: 0 }
  ];

  const gradeClassDistribution = {};

  // Correlation Data (Scatter Plot)
  const gpaVsStudyTime = [];
  const gpaVsAbsences = [];

  let totalGPA = 0;
  let totalStudyTime = 0;
  let totalAbsences = 0;

  students.forEach(student => {
    // Gender - checking for both numeric and string representation if needed, but assuming 0/1 from CSV inspection
    if (student.Gender === 0 || student.Gender === '0') genderDistribution[0].value++;
    if (student.Gender === 1 || student.Gender === '1') genderDistribution[1].value++;

    // Grade Class
    const gradeClass = student.GradeClass;
    if (gradeClass !== undefined) {
      if (gradeClassDistribution[gradeClass]) {
        gradeClassDistribution[gradeClass]++;
      } else {
        gradeClassDistribution[gradeClass] = 1;
      }
    }

    // Ensure GPA is treated as number
    const gpa = typeof student.GPA === 'number' ? student.GPA : parseFloat(student.GPA);
    const studyTime = typeof student.StudyTimeWeekly === 'number' ? student.StudyTimeWeekly : parseFloat(student.StudyTimeWeekly);
    const absences = typeof student.Absences === 'number' ? student.Absences : parseFloat(student.Absences);

    // Scatter Data
    if (!isNaN(gpa) && !isNaN(studyTime)) {
      gpaVsStudyTime.push({ x: studyTime, y: gpa });
    }
    if (!isNaN(gpa) && !isNaN(absences)) {
      gpaVsAbsences.push({ x: absences, y: gpa });
    }

    if (!isNaN(gpa)) totalGPA += gpa;
    if (!isNaN(studyTime)) totalStudyTime += studyTime;
    if (!isNaN(absences)) totalAbsences += absences;
  });

  const averageGPA = students.length > 0 ? totalGPA / students.length : 0;
  const averageStudyTime = students.length > 0 ? totalStudyTime / students.length : 0;
  const averageAbsences = students.length > 0 ? totalAbsences / students.length : 0;

  const processedData = {
    summary: {
      totalStudents: students.length,
      averageGPA,
      averageStudyTime,
      averageAbsences
    },
    genderDistribution,
    gradeClassDistribution: Object.keys(gradeClassDistribution).map(key => ({ name: `Class ${key}`, value: gradeClassDistribution[key] })),
    gpaVsStudyTime, // May need downsampling for frontend performance if too large
    gpaVsAbsences
  };

  fs.writeFileSync(jsonOutputPath, JSON.stringify(processedData, null, 2));
  console.log('Data processed and saved to', jsonOutputPath);
  console.log('Summary:', processedData.summary);
};

processData();
