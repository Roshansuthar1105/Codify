import React from "react";

const StepsOfEDA = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Steps of EDA</h1>
      <ol className="ml-6 space-y-2 list-decimal">
        <li><b>Understand the Problem:</b> Define the business goal.</li>
        <li><b>Data Collection:</b> Gather raw data from reliable sources.</li>
        <li><b>Data Cleaning:</b> Handle missing values, duplicates, outliers.</li>
        <li><b>Data Exploration:</b> Summary stats, data types, distributions.</li>
        <li><b>Feature Engineering:</b> Transform and create meaningful features.</li>
        <li><b>Data Visualization:</b> Use plots and charts to spot patterns.</li>
        <li><b>Hypothesis Testing:</b> Validate assumptions using statistical tests.</li>
        <li><b>Report Findings:</b> Summarize insights for decision-making.</li>
      </ol>
    </div>
  );
};

export default StepsOfEDA;
