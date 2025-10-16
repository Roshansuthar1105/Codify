// WhatIsReact.jsx
import React from "react";
import { useTheme } from "../../../../context/ThemeContext";
import CodeBlock from "../../components/CodeBlock";
const WhatIsReact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sections = [
    {
      title: "Introduction",
      content: `React is a powerful JavaScript library for building interactive user interfaces.
It allows developers to create reusable components, manage state efficiently, and build scalable web applications.`,
      keyConcept:
        "Think of React as a set of building blocks for UI development.",
    },
    {
      title: "Key Features",
      content: [
        "Declarative: Design UIs by describing each state.",
        "Component-Based: Encapsulate UI into reusable components.",
        "Virtual DOM: Efficiently updates only changed elements.",
        "JSX: HTML-like syntax in JavaScript for readability.",
      ],
    },
    {
      title: "Components",
      content:
        "Components are the building blocks of React applications. They can be Functional, Class-based, and Reusable.",
      code: `function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}`,
    },
    {
      title: "Props",
      content:
        "Props (properties) are used to pass data from parent to child components.",
      code: `<Hello name="Ankita" />`,
    },
    {
      title: "State",
      content:
        "State allows components to keep track of data and update the UI dynamically.",
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    },
    {
      title: "Hooks",
      content:
        "Hooks let you use state and other React features in functional components.",
      tags: ["useState", "useEffect", "useContext"],
    },
    {
      title: "Lifecycle",
      content:
        "Components go through mounting, updating, and unmounting phases. Functional components use useEffect for lifecycle events.",
    },
    {
      title: "Best Practices",
      content: [
        "Keep components small and reusable.",
        "Use hooks for state and side-effects.",
        "Lift state up only when necessary.",
        "Write clear and readable JSX.",
      ],
      tags: ["Reusable", "Hooks", "Clean Code", "Lift State"],
    },
  ];

  const cardClass = `mb-8 rounded-lg p-6 border transition-colors duration-200 shadow-sm hover:shadow-md ${
    isDark
      ? "bg-gray-800 text-gray-100 border-gray-700 hover:border-primary-400"
      : "bg-white text-gray-900 border-gray-200 hover:border-primary-600"
  }`;

  const titleClass = `text-2xl font-semibold mb-4 ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  const tagClass = `inline-block bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm mr-2 mb-2`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-600 dark:text-primary-400">
        What is React?
      </h1>

      {sections.map((section, index) => (
        <div className={cardClass} key={index}>
          <h2 className={titleClass}>{section.title}</h2>

          {section.content && Array.isArray(section.content) ? (
            <ul className="list-disc pl-5 space-y-2 mb-4">
              {section.content.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            section.content && (
              <p className="mb-4 leading-relaxed">{section.content}</p>
            )
          )}

          {section.keyConcept && (
            <div
              className={`p-4 rounded-md mb-4 border-l-4 ${
                isDark
                  ? "bg-gray-700 border-primary-400 text-primary-200"
                  : "bg-gray-50 border-primary-600 text-primary-700"
              }`}
            >
              <strong>Key Concept:</strong> {section.keyConcept}
            </div>
          )}

          {section.code && <CodeBlock code={section.code} />}

          {section.tags && (
            <div className="flex flex-wrap mt-4">
              {section.tags.map((tag, i) => (
                <span className={tagClass} key={i}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WhatIsReact;
