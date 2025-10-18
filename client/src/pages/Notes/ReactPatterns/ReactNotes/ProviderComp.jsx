import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ProviderComp = () => {
  const providerExamples = [
    {
      title: "Basic Context Provider",
      description:
        "Creating a simple context provider to share state across components.",
      code: `import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };`,
    },
    {
      title: "Using Context in Child Component",
      description:
        "Consuming the context value in a child component using useContext.",
      code: `import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}

export default ThemedButton;`,
    },
  ];

  const bestPractices = [
    "Use providers at the top level for shared state that is needed by many components.",
    "Avoid deeply nested providers unless necessary; consider combining contexts.",
    "Keep context state minimal to reduce unnecessary re-renders.",
    "Use custom hooks to encapsulate context logic for cleaner code.",
    "Always provide default values in your context to avoid undefined errors.",
  ];

  const commonMistakes = [
    "Placing providers too deep in the component tree, causing unnecessary re-renders.",
    "Using context for state that changes very frequently and causes performance issues.",
    "Mutating context values directly instead of updating them through setter functions.",
    "Overusing context for local state that can stay within a single component.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Provider Pattern
        </span>
      </h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The Provider Pattern in React allows you to share state across
            multiple components using the Context API. It's ideal for theming,
            user authentication, and global state management.
          </p>
          <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
            <p className="text-primary-500 dark:text-primary-400">
              <strong className="font-semibold">Tip:</strong> Use Provider
              Pattern to avoid prop drilling and make your components more
              modular and maintainable.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {providerExamples.map((example, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {example.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
                  <CodeBlock code={example.code} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {bestPractices.map((practice, index) => (
              <li key={index} className="text-sm">
                {practice}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common Mistakes
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {commonMistakes.map((mistake, index) => (
              <li key={index} className="text-sm">
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            Getting Started with Provider Pattern
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            Start by creating a context and wrapping your application (or part
            of it) with the provider component. Consume the context in child
            components with{" "}
            <code className="bg-gray-100 dark:bg-gray-900 p-1 rounded">
              useContext
            </code>
            . This makes your components cleaner, reduces prop drilling, and
            centralizes state management for shared data.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            As your app grows, consider splitting context into multiple
            providers for different concerns (e.g., authentication, theme,
            settings). Encapsulating context logic inside custom hooks can make
            your code more reusable and maintainable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProviderComp;
