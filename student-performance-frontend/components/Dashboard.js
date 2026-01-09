import { useState } from 'react';
import DistributionChart from './Charts/DistributionChart';
import ScatterTrendChart from './Charts/ScatterTrendChart';
import ComparisonChart from './Charts/ComparisonChart';
import processedData from '../data/processed_data.json';

export default function Dashboard({ predictionResult }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Helper to safely format numbers
  const formatNumber = (num, decimals = 2) => {
    return num !== null && num !== undefined && !isNaN(num) ? Number(num).toFixed(decimals) : 'N/A';
  };

  return (
    <div className="dashboard-container">
      {predictionResult && (
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Predicted GPA</div>
            <div className="stat-value">{formatNumber(predictionResult.GPA)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Study Time</div>
            <div className="stat-value">{formatNumber(predictionResult.StudyTimeWeekly, 1)} hrs</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Absences</div>
            <div className="stat-value">{formatNumber(predictionResult.Absences, 0)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Grade Class</div>
            <div className="stat-value">{formatNumber(predictionResult.GradeClass, 0)}</div>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {predictionResult && (
          <ComparisonChart
            studentData={predictionResult}
            averageData={processedData.summary}
          />
        )}

        <DistributionChart
          title="Gender Distribution"
          data={processedData.genderDistribution}
        />

        <DistributionChart
          title="Grade Class Distribution"
          data={processedData.gradeClassDistribution}
        />

        <ScatterTrendChart
          title="GPA vs Study Time"
          data={processedData.gpaVsStudyTime}
          xLabel="Study Time"
          yLabel="GPA"
        />

        <ScatterTrendChart
          title="GPA vs Absences"
          data={processedData.gpaVsAbsences}
          xLabel="Absences"
          yLabel="GPA"
        />

        <div className="card">
            <h3>Dataset Insights</h3>
            <p style={{padding: '20px', color: '#666'}}>
                Total Students: {processedData.summary.totalStudents}<br/>
                Average GPA: {formatNumber(processedData.summary.averageGPA)}<br/>
                Avg Study Time: {formatNumber(processedData.summary.averageStudyTime, 1)} hrs<br/>
                Avg Absences: {formatNumber(processedData.summary.averageAbsences, 1)}
            </p>
        </div>
      </div>
    </div>
  );
}
