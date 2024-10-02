import React, { useState } from 'react';
import Dashboard from './Dashboard';

function BankDashboard() {
  const [homeValue, setHomeValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(50000);
  const [loanAmount, setLoanAmount] = useState(homeValue - downPayment);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(10); // in years

  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment =
    (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1);
  const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;

  const financialData = {
    labels: ['Loan Amount', 'Total Interest', 'Monthly Payment'],
    datasets: [
      {
        data: [loanAmount, totalInterestGenerated, monthlyPayment],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="bank-dashboard">
      <div className="input-section">
        <h3>Adjust Your Loan Parameters</h3>
        <div className="range-slider">
          <label>Home Value: ${homeValue}</label>
          <input
            type="range"
            min="100000"
            max="1000000"
            step="5000"
            value={homeValue}
            onChange={(e) => {
              setHomeValue(Number(e.target.value));
              setLoanAmount(Number(e.target.value) - downPayment);
            }}
          />
        </div>

        <div className="range-slider">
          <label>Down Payment: ${downPayment}</label>
          <input
            type="range"
            min="10000"
            max={homeValue}
            step="5000"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(Number(e.target.value));
              setLoanAmount(homeValue - Number(e.target.value));
            }}
          />
        </div>

        <div className="range-slider">
          <label>Loan Amount: ${loanAmount}</label>
          <input
            type="range"
            min="10000"
            max={homeValue}
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            disabled
          />
        </div>

        <div className="range-slider">
          <label>Interest Rate: {interestRate}%</label>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        <div className="range-slider">
          <label>Loan Term: {loanTerm} years</label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
        </div>
      </div>

      <Dashboard data={financialData} monthlyPayment={monthlyPayment} />
    </div>
  );
}

export default BankDashboard;
