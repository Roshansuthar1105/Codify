import { Link } from "react-router-dom";
import { FiCode, FiBookOpen, FiLayers, FiChevronRight } from "react-icons/fi";
import CodeBlock from "../../components/CodeBlock";

const IntroductionToReactPage = () => {
  const features = [
    {
      icon: (
        <FiCode className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      ),
      title: "Component-Based Architecture",
      description:
        "Learn how to break your UI into reusable, maintainable React components.",
    },
    {
      icon: (
        <FiBookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      ),
      title: "State & Props",
      description:
        "Manage dynamic data in your apps with state, props, and context API.",
    },
    {
      icon: (
        <FiLayers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      ),
      title: "Hooks & Modern React",
      description:
        "Master useState, useEffect, useRef, and custom hooks for modern React development.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Level Up Your{" "}
          <span className="text-primary-600 dark:text-primary-400">
            React Skills
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Master components, state, and hooks to build dynamic and modern web
          applications with confidence.{" "}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-white rounded-full text-sm">
            Components
          </span>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-white rounded-full text-sm">
            State & Props
          </span>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-white rounded-full text-sm">
            Hooks
          </span>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-white rounded-full text-sm">
            Routing
          </span>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-white rounded-full text-sm">
            Custom Hooks
          </span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-8">
          Let's Begin!
        </h2>
        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Create Your First Component
          </h3>
          <CodeBlock
            code={`import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default Counter;`}
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Copy and paste this code into a React project to see your first
            component in action!
          </p>
        </div>
      </section>
    </div>
  );
};

export default IntroductionToReactPage;
