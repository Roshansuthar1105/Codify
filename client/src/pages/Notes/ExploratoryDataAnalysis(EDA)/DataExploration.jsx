import React from "react";

const DataExploration = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Data Exploration</h1>
      <p>
        Data Exploration is the process of examining datasets to understand their structure,
        detect anomalies, and summarize key patterns before applying advanced techniques.
      </p>

      <h2 className="mt-6 text-2xl font-semibold">🔹 Types of Data Exploration</h2>

      <h3 className="mt-4 text-xl font-semibold">1. Univariate Analysis</h3>
      <p>
        Focuses on studying a single variable at a time. It helps describe data and find
        distribution patterns.
      </p>
      <ul className="ml-6 list-disc">
        <li>Histograms → Show data distribution</li>
        <li>Boxplots → Detect outliers and spread</li>
        <li>Bar charts → Frequency of categorical data</li>
        <li>Summary statistics → Mean, Median, Mode, Variance, Standard Deviation</li>
      </ul>

      <h3 className="mt-4 text-xl font-semibold">2. Bivariate Analysis</h3>
      <p>
        Explores relationships between two variables, helping detect correlations and dependencies.
      </p>
      <ul className="ml-6 list-disc">
        <li>Scatter plots → Show relationships between two continuous variables</li>
        <li>Correlation (Pearson, Spearman) → Measure linear/non-linear relationships</li>
        <li>Cross-tabulation → Frequency distribution of categorical variables</li>
      </ul>

      <h3 className="mt-4 text-xl font-semibold">3. Multivariate Analysis</h3>
      <p>
        Studies interactions among three or more variables simultaneously.
      </p>
      <ul className="ml-6 list-disc">
        <li>Heatmaps → Correlation across multiple variables</li>
        <li>Pair plots → Visualize variable interactions</li>
        <li>PCA (Principal Component Analysis) → Dimensionality reduction</li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold">📊 Example Code</h2>
      <pre className="p-4 overflow-x-auto bg-gray-100 rounded-md">
{`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("titanic.csv")

# Univariate Analysis
print(df["Age"].describe())
sns.histplot(df["Age"], bins=20, kde=True)
plt.show()

# Bivariate Analysis
sns.scatterplot(x="Age", y="Fare", data=df)
plt.show()

# Multivariate Analysis
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")
plt.show()`}
      </pre>

      <h2 className="mt-6 text-2xl font-semibold">🪢 Flow of Data Exploration</h2>
      <pre className="p-4 overflow-x-auto rounded-md bg-gray-50">
{`Raw Data → Check Data Types → Handle Missing Values → 
Univariate Analysis → Bivariate Analysis → Multivariate Analysis → Insights`}
      </pre>
    </div>
  );
};

export default DataExploration;
