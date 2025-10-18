import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Props = () => {
  const examples = [
    {
      title: "Basic Props Example",
      code: `function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Ankita" />
      <Welcome name="Alex" />
    </div>
  );
}

export default App;`,
      explanation:
        "Props allow data to be passed from a parent component to a child component. They make components reusable and dynamic.",
    },
    {
      title: "Destructuring Props",
      code: `function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

function App() {
  return <UserCard name="Ankita" age={21} />;
}

export default App;`,
      explanation:
        "Destructuring props directly in the function parameters makes the code cleaner and easier to read.",
    },
    {
      title: "Props with Default Values",
      code: `function Button({ label = "Click Me", color = "blue" }) {
  return <button style={{ backgroundColor: color }}>{label}</button>;
}

function App() {
  return (
    <>
      <Button label="Submit" color="green" />
      <Button /> {/* Uses default props */}
    </>
  );
}

export default App;`,
      explanation:
        "You can define default values for props to ensure components behave predictably even if props are not passed.",
    },
  ];

  const bestPractices = [
    "Always use meaningful and descriptive prop names.",
    "Use prop destructuring for cleaner syntax.",
    "Validate props using PropTypes or TypeScript.",
    "Keep components pure—avoid mutating props.",
    "Use default props to handle missing values gracefully.",
  ];

  const commonMistakes = [
    "Mutating props inside a child component.",
    "Passing unnecessary or unused props.",
    "Not defining defaults for optional props.",
    "Forgetting to validate prop types in large codebases.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">Props</span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          In React, <strong>props</strong> (short for properties) are used to
          pass data from one component to another. They make components dynamic,
          reusable, and configurable. Props flow **from parent to child** and
          help build flexible UI hierarchies.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Think of props like
            function parameters — you pass them in, and they help customize how
            a component behaves or looks.
          </p>
        </div>

        {/* Examples Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common Patterns with Props
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

        {/* Props Comparison Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Props vs State
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Props
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    State
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Mutability
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Immutable (read-only)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Mutable (can change over time)
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Ownership
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Passed from parent component
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Managed within the same component
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Purpose
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Used to configure components
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Used to store component data
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
            Props are the backbone of React component communication. They
            promote reusability, maintainability, and separation of concerns.
            By mastering props, you can build flexible, modular components that
            scale across your application with ease.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Props;
