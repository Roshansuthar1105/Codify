import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ControlAndUn = () => {
  const examples = [
    {
      title: "Controlled Component",
      code: `import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <p>Current value: {value}</p>
    </div>
  );
}

export default ControlledInput;`,
      explanation:
        "Controlled components have their value controlled by React state. Changes are tracked via event handlers like onChange.",
    },
    {
      title: "Uncontrolled Component",
      code: `import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef();

  const handleClick = () => {
    alert('Input value: ' + inputRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Show Value</button>
    </div>
  );
}

export default UncontrolledInput;`,
      explanation:
        "Uncontrolled components rely on the DOM for their current value. React doesn’t track changes directly.",
    },
  ];
  const commonMistakes = [
    "Switching from uncontrolled to controlled input without proper initialization.",
    "Not updating state in controlled components leading to stale values.",
    "Using uncontrolled components when dynamic updates or validation are required.",
    "Relying too heavily on refs instead of proper state management.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Controlled & Uncontrolled Components
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Forms in React can be built using <strong>controlled</strong> or{" "}
          <strong>uncontrolled</strong> components. Understanding the difference
          between them is key to managing user input effectively.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Controlled
            components are usually preferred for most forms as they integrate
            better with React state and validation, but uncontrolled components
            can be simpler for quick forms.
          </p>
        </div>

        {/* Controlled Components Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Controlled Components
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Controlled components have their value managed by React state. Every
            input change updates the state via onChange handlers.
          </p>

          <div className="space-y-6">
            {examples
              .filter((e) => e.title.includes("Controlled"))
              .map((ex, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
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

        {/* Uncontrolled Components Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Uncontrolled Components
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Uncontrolled components do not store their value in React state.
            Instead, you use a ref to access the DOM value directly.
          </p>

          <div className="space-y-6">
            {examples
              .filter((e) => e.title.includes("Uncontrolled"))
              .map((ex, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
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

        {/* Comparison Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Controlled vs Uncontrolled
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Controlled
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uncontrolled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Value Source
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    React state
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    DOM / ref
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Validation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Easy to validate on every change
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Requires manual DOM access
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Boilerplate
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    More code needed
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Minimal code
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Use Case
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Complex forms, validation, dynamic inputs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Simple forms, one-time input, quick prototypes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common Mistakes
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {commonMistakes.map((cm, i) => (
              <li key={i} className="text-sm">
                {cm}
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
            Use controlled components when you need full control over input
            data, validation, or dynamic changes. Use uncontrolled components
            for simple forms or when you want to minimize boilerplate code.
            Understanding the difference and colocating your state effectively
            is key to building efficient and maintainable React applications.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ControlAndUn;
