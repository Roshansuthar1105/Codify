import React from "react";
import CodeBlock from "../../components/CodeBlock";

const CodeSplitting = () => {
  const examples = [
    {
      title: "Basic Code Splitting with React.lazy",
      code: `import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;`,
      explanation:
        "React allows splitting your code into smaller bundles that load on demand. This reduces the initial load time and improves performance for large apps.",
    },
    {
      title: "Route-based Code Splitting",
      code: `import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;`,
      explanation:
        "Code splitting can be applied per route, allowing only the components for the active route to be loaded initially. This improves page load performance.",
    },
  ];

  const bestPractices = [
    "Use code splitting for large components or pages.",
    "Combine with React Suspense to show fallback UI during loading.",
    "Prefer route-based splitting for multi-page applications.",
    "Avoid splitting very small components as it may increase bundle overhead.",
    "Monitor network requests to ensure chunks are loaded efficiently.",
  ];

  const commonMistakes = [
    "Not using Suspense fallback, causing blank UI during loading.",
    "Splitting too many tiny components, increasing HTTP requests.",
    "Assuming code splitting automatically improves all performance issues.",
    "Ignoring error handling for lazy-loaded components.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Code Splitting
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          <strong>Code splitting</strong> in React allows you to split your
          app into smaller chunks that can be loaded on demand. This helps
          improve the initial load time and performance of your application,
          especially for large apps.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Use code splitting
            wisely to load heavy components only when needed, reducing the
            bundle size for initial load.
          </p>
        </div>

        {/* Examples Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Examples
          </h2>
          <div className="space-y-6">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {ex.title}
                </h3>
                <div className="w-full overflow-x-auto">
                  <CodeBlock code={ex.code} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                  {ex.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {bestPractices.map((practice, index) => (
              <li key={`best-${index}`} className="text-sm">
                {practice}
              </li>
            ))}
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common Mistakes
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {commonMistakes.map((mistake, index) => (
              <li key={`mistake-${index}`} className="text-sm">
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        {/* Summary */}
        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Code splitting helps break your React app into smaller bundles
            that load on demand, improving performance and user experience.
            Combine it with React.lazy and Suspense for clean, efficient,
            and user-friendly loading behavior.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CodeSplitting;
