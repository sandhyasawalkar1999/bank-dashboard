import React from 'react';
import PieChart from './PieChart';

function Dashboard({ data, monthlyPayment }) {
  return (
    <div className="dashboard">
      <div className="chart-section">
        <h2>Financial Overview</h2>
        <h3>Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
        <div className="chart">
        <PieChart financialData={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
