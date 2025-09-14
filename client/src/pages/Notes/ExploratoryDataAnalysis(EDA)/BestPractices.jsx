import React from "react";

const BestPractices = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Best Practices in EDA</h1>
      <ul className="ml-6 space-y-2 list-disc">
        <li>Always understand the problem statement first.</li>
        <li>Document each step of the process.</li>
        <li>Handle missing data carefully, don’t just drop rows blindly.</li>
        <li>Visualize before and after transformations.</li>
        <li>Use domain knowledge to guide feature engineering.</li>
        <li>Perform hypothesis testing to confirm assumptions.</li>
        <li>Keep results reproducible and shareable.</li>
      </ul>
    </div>
  );
};

export default BestPractices;
