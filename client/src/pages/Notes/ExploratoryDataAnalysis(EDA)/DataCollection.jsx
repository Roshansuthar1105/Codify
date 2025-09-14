import React from "react";

const DataCollection = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Data Collection</h1>
      <p>
        Data Collection is the first step of EDA. It involves gathering raw data from various
        sources such as databases, APIs, sensors, surveys, or web scraping.
      </p>
      <h2 className="mt-4 text-xl font-semibold">Types of Data:</h2>
      <ul className="ml-6 list-disc">
        <li><b>Structured Data:</b> Tabular format like databases (SQL, CSV).</li>
        <li><b>Unstructured Data:</b> Images, audio, video, text documents.</li>
        <li><b>Semi-structured Data:</b> JSON, XML.</li>
      </ul>
      <h2 className="mt-4 text-xl font-semibold">Key Challenges:</h2>
      <ul className="ml-6 list-disc">
        <li>Missing or incomplete data.</li>
        <li>Duplicate records.</li>
        <li>Data privacy and compliance issues.</li>
      </ul>
    </div>
  );
};

export default DataCollection;

