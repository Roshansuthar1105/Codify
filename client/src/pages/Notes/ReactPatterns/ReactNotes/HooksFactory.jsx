import React from "react";
import CodeBlock from "../../components/CodeBlock";

const HooksFactory = () => {
  const examples = [
    {
      title: "useState — Managing State in a Component",
      code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;`,
      explanation:
        "`useState` lets you add state to functional components. It returns a state variable and a function to update it.",
    },
    {
      title: "useEffect — Performing Side Effects",
      code: `import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer); // Cleanup
  }, []);

  return <p>Timer: {seconds}s</p>;
}

export default Timer;`,
      explanation:
        "`useEffect` handles side effects such as data fetching, event listeners, or intervals. Always return a cleanup function when necessary.",
    },
    {
      title: "useRef — Accessing DOM or Persisting Values",
      code: `import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus the input when mounted
  }, []);

  return <input ref={inputRef} placeholder="Focus me automatically" />;
}

export default InputFocus;`,
      explanation:
        "`useRef` allows you to directly reference DOM elements or persist mutable values across renders without causing re-renders.",
    },
  ];

  const bestPractices = [
    "Use hooks only at the top level of components (not inside loops or conditions).",
    "Prefix custom hooks with 'use' for consistency.",
    "Group related state together for cleaner updates.",
    "Always clean up side effects in `useEffect` to prevent memory leaks.",
    "Avoid excessive use of refs — prefer controlled state when possible.",
  ];

  const commonMistakes = [
    "Calling hooks inside conditions or loops (violates hook rules).",
    "Forgetting dependency arrays in `useEffect`, causing infinite re-renders.",
    "Mutating state directly instead of using the state updater function.",
    "Confusing `useRef` with `useState` for reactive values.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Hooks Factory
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          React <strong>Hooks</strong> allow you to use state, lifecycle, and
          other React features without writing class components. They simplify
          logic reuse and make components more functional and composable.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Hooks make your
            components cleaner and more readable. Think of them as small,
            powerful tools for managing logic and side effects.
          </p>
        </div>

        {/* Examples Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Commonly Used Hooks
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

        {/* Hooks vs Class Lifecycle Comparison */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Hooks vs Class Lifecycle Methods
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Class Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Equivalent Hook
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    componentDidMount
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    useEffect(() ⇒ {}, [])
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Runs once after the component mounts.
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    componentDidUpdate
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    useEffect(() ⇒ {}, [dependencies])
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Runs after state or props change.
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    componentWillUnmount
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    return cleanup() inside useEffect
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Runs before the component unmounts.
                  </td>
                </tr>
              </tbody>
            </table>
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
            Hooks make React functional and elegant. By mastering built-in hooks
            and writing your own custom hooks, you can create reusable, modular
            logic that keeps your components clean and maintainable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HooksFactory;
