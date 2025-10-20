// src/pages/Notes/AlgorithmPage.jsx
import React from "react";

const AlgorithmPage = () => {
  const sortingAlgorithms = [
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Shell Sort",
    "Radix Sort",
    "Bucket Sort",
  ];

  const searchingAlgorithms = [
    "Linear Search",
    "Binary Search",
    "Depth-First Search (DFS)",
    "Breadth-First Search (BFS)",
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Algorithms Notes</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Sorting Algorithms</h2>
        <ul className="space-y-2">
          {sortingAlgorithms.map((algo, index) => (
            <li key={index} className="text-blue-600">
              {algo}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Searching Algorithms</h2>
        <ul className="space-y-2">
          {searchingAlgorithms.map((algo, index) => (
            <li key={index} className="text-green-600">
              {algo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmPage;
