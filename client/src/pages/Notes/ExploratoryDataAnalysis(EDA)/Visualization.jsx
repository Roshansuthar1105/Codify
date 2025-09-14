import React from "react";

const Visualization = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Visualization in EDA</h1>
      <p>
        Visualization helps in spotting trends, patterns, and anomalies in data quickly.
        It is the most powerful part of EDA.
      </p>
      <h2 className="mt-4 text-xl font-semibold">Steps:</h2>
      <ul className="ml-6 list-disc">
        <li>Choose the right chart type for the problem.</li>
        <li>Visualize distributions (histograms, KDE plots).</li>
        <li>Compare variables (scatter plots, box plots).</li>
        <li>Show correlations (heatmaps, pairplots).</li>
        <li>Time-series visualization for trends.</li>
      </ul>
    </div>
  );
};

export default Visualization;
