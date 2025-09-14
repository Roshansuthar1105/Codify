import React from "react";

const Graphs = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Graphs in EDA</h1>
      <h2 className="mt-4 text-xl font-semibold">Types of Graphs:</h2>
      <ul className="ml-6 list-disc">
        <li><b>Histogram:</b> Distribution of a single variable.</li>
        <li><b>Box Plot:</b> Detecting outliers.</li>
        <li><b>Scatter Plot:</b> Relationship between two variables.</li>
        <li><b>Heatmap:</b> Correlation matrix visualization.</li>
        <li><b>Line Chart:</b> Time-series analysis.</li>
        <li><b>Bar Chart:</b> Comparing categorical variables.</li>
        <li><b>Pair Plot:</b> Visualizing relationships among all features.</li>
      </ul>
    </div>
  );
};

export default Graphs;
