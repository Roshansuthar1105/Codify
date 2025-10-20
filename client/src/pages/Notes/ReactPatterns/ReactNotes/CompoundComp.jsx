import React from "react";
import CodeBlock from "../../components/CodeBlock";

const CompoundComp = () => {
  const examples = [
    {
      title: "Basic Compound Component",
      code: `function Tab({ children }) {
  return <div className="tab">{children}</div>;
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>;
}

export { Tab, TabList, TabPanel };`,
      explanation:
        "A basic compound component setup where Tab contains TabList and TabPanel as children. This helps in structuring complex UI components cleanly.",
    },
    {
      title: "Using Compound Components",
      code: `import { Tab, TabList, TabPanel } from './TabComponents';

function App() {
  return (
    <Tab>
      <TabList>
        <button>Tab 1</button>
        <button>Tab 2</button>
      </TabList>
      <TabPanel>Content for Tab 1</TabPanel>
      <TabPanel>Content for Tab 2</TabPanel>
    </Tab>
  );
}

export default App;`,
      explanation:
        "Shows how to use the compound component by nesting children components. This ensures state and behavior are shared and controlled from the parent component.",
    },
  ];

  const bestPractices = [
    "Group related components to manage state and behavior together.",
    "Expose only the top-level component API, keeping inner details private.",
    "Use React context internally to share state between compound components.",
    "Keep component API simple and predictable for easier usage.",
  ];

  const commonMistakes = [
    "Exposing too many props on child components, breaking encapsulation.",
    "Not using context internally, forcing prop drilling.",
    "Incorrectly ordering children, which can cause unexpected UI behavior.",
    "Using compound components for simple components unnecessarily.",
  ];

  const whyUseCompoundComponents = [
    {
      title: "Encapsulation",
      description:
        "Keep component state and logic internal, only exposing the API necessary for composition.",
    },
    {
      title: "Reusability",
      description:
        "Compose complex UI components without repeating logic or state management across components.",
    },
    {
      title: "Flexibility",
      description:
        "Allow developers to arrange children components as needed while still maintaining shared behavior.",
    },
    {
      title: "Cleaner Code",
      description:
        "Avoid prop drilling and keep state management centralized within the parent component.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Compound Components
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Compound components in React allow you to group multiple related
          components together, sharing state and behavior internally while
          exposing a clean, composable API. This pattern is especially useful
          for complex UI structures like tabs, accordions, or menus.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Compound components
            should encapsulate behavior and state internally while giving
            flexibility to the developer for layout and arrangement of child
            components.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Why Use Compound Components?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {whyUseCompoundComponents.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Code Examples
          </h2>
          <div className="space-y-6">
            {examples.map((ex, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
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
            Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Compound components help build reusable, flexible, and maintainable
            UI patterns. By sharing state internally via context and exposing a
            simple API, they make complex components easy to use and customize,
            while keeping internal implementation encapsulated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CompoundComp;
