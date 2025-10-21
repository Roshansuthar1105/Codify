import React from "react";
import CodeBlock from "../../components/CodeBlock";

const RenderOptimization = () => {
  const examples = [
    {
      title: "Using React.memo",
      code: `import React from "react";

const Child = React.memo(({ value }) => {
  console.log("Child rendered");
  return <div>{value}</div>;
});

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child value="I only re-render when props change" />
    </div>
  );
}

export default App;`,
      explanation:
        "React.memo prevents unnecessary re-renders of functional components by memoizing the rendered output. The component only re-renders when props change.",
    },
    {
      title: "useCallback to Memoize Functions",
      code: `import React, { useState, useCallback } from "react";

const Button = React.memo(({ onClick }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}

export default App;`,
      explanation:
        "useCallback memoizes functions so that they are not re-created on every render, helping memoized child components to avoid unnecessary renders.",
    },
    {
      title: "useMemo for Expensive Calculations",
      code: `import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;`,
      explanation:
        "useMemo memoizes the result of expensive calculations, recomputing only when dependencies change, improving performance.",
    },
  ];

  const bestPractices = [
    "Use React.memo for functional components that receive props.",
    "Memoize functions with useCallback when passing them to memoized children.",
    "Use useMemo for expensive calculations or derived state.",
    "Avoid over-optimization; profile first to identify bottlenecks.",
  ];

  const commonMistakes = [
    "Wrapping every component in React.memo unnecessarily.",
    "Using useMemo or useCallback without dependencies or with wrong dependencies.",
    "Overusing memoization for trivial computations.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Render Optimization
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Render optimization in React improves performance by preventing
          unnecessary re-renders. Techniques like <strong>React.memo</strong>,{" "}
          <strong>useCallback</strong>, and <strong>useMemo</strong> help
          memoize components, functions, and values efficiently.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Always profile your
            app first before optimizing. Overuse of memoization can make code
            complex without real performance gains.
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
            Render optimization ensures React applications perform efficiently
            by reducing unnecessary re-renders. By leveraging memoization and
            React hooks wisely, you can maintain smooth and responsive UIs.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RenderOptimization;
