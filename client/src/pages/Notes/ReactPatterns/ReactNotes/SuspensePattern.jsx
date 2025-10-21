import React from "react";
import CodeBlock from "../../components/CodeBlock";

const SuspensePattern = () => {
  const examples = [
    {
      title: "Basic Suspense with Lazy Loading",
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
        "React Suspense lets you display a fallback UI (like a loading spinner) while waiting for a component to load asynchronously. Often used with lazy-loaded components.",
    },
    {
      title: "Suspense with Data Fetching",
      code: `import React, { Suspense } from "react";

function DataComponent() {
  const data = fetchData(); // Assume fetchData suspends until data is ready
  return <div>{data.title}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Fetching data...</div>}>
      <DataComponent />
    </Suspense>
  );
}

export default App;`,
      explanation:
        "Suspense can also be used for data fetching when combined with libraries like React Query or Relay, allowing declarative loading states for asynchronous data.",
    },
  ];

  const bestPractices = [
    "Always provide a meaningful fallback UI.",
    "Use Suspense for lazy-loaded components and async data fetching.",
    "Do not wrap too many components in a single Suspense boundary; isolate boundaries for better UX.",
    "Combine Suspense with error boundaries for more resilient applications.",
    "Avoid heavy computation in components wrapped by Suspense to prevent blocking the UI.",
  ];

  const commonMistakes = [
    "Using Suspense with non-lazy components or functions that don't suspend.",
    "Wrapping the entire app in one Suspense, causing large parts of the UI to show fallback.",
    "Not providing a fallback UI, which can cause blank screens during loading.",
    "Assuming Suspense catches errors; it only handles loading states.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Suspense Pattern
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          The <strong>Suspense Pattern</strong> in React helps manage loading
          states for lazy-loaded components or asynchronous data. It allows
          developers to show fallback content while the component or data is
          being prepared.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Suspense is
            declarative — it separates loading logic from your component UI,
            making your app cleaner and easier to maintain.
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
            React Suspense simplifies handling of loading states for components
            and data. By using it with lazy-loaded components and async data
            fetching, you can create smoother user experiences and maintain
            clean component logic.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SuspensePattern;
