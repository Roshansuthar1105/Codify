import React from "react";

const FeatureEngineering = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Feature Engineering</h1>
      <p>
        Feature Engineering is the process of creating new input features or transforming
        existing ones to improve model performance.
      </p>
      <h2 className="mt-4 text-xl font-semibold">Steps:</h2>
      <ul className="ml-6 list-disc">
        <li>Handling missing data (imputation, removal).</li>
        <li>Encoding categorical variables (One-Hot, Label Encoding).</li>
        <li>Scaling & normalization of numeric features.</li>
        <li>Creating new features (ratios, interactions).</li>
        <li>Dimensionality reduction (PCA, LDA).</li>
      </ul>
    </div>
  );
};

export default FeatureEngineering;
