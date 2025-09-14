import React from "react";
import { Link } from "react-router-dom";

const EDAHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Exploratory Data Analysis (EDA)</h1>
      <p className="mb-6">
        Exploratory Data Analysis (EDA) is the process of analyzing datasets to summarize their
        main characteristics, often using visual methods. It helps in identifying patterns,
        spotting anomalies, testing hypotheses, and checking assumptions.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Topics Covered:</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li><Link to="/eda/data-collection" className="text-blue-600">Data Collection</Link></li>
        <li><Link to="/eda/data-exploration" className="text-blue-600">Data Exploration</Link></li>
        <li><Link to="/eda/feature-engineering" className="text-blue-600">Feature Engineering</Link></li>
        <li><Link to="/eda/steps" className="text-blue-600">Steps of EDA</Link></li>
        <li><Link to="/eda/visualization" className="text-blue-600">Visualization</Link></li>
        <li><Link to="/eda/graphs" className="text-blue-600">Graphs in EDA</Link></li>
        <li><Link to="/eda/case-studies" className="text-blue-600">Case Studies</Link></li>
        <li><Link to="/eda/best-practices" className="text-blue-600">Best Practices</Link></li>
      </ul>
    </div>
  );
};

export default EDAHome;

