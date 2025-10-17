import React from "react";

const ReactIntroduction = () => {
  const reactUsedFor = [
    {
      title: "Frontend Development",
      description:
        "Building interactive user interfaces with React and managing state efficiently using hooks like useState and useEffect.",
    },
    {
      title: "Mobile Development",
      description:
        "Creating cross-platform mobile apps with React Native using a single codebase.",
    },
    {
      title: "Component Libraries",
      description:
        "Building reusable UI components and design systems with libraries like Material-UI, Ant Design, or Chakra UI.",
    },
    {
      title: "Single Page Applications (SPA)",
      description:
        "Developing fast, dynamic web apps with client-side routing using React Router.",
    },
  ];

  const reactFeatures = [
    {
      version: "React 16",
      year: 2017,
      features: "Error boundaries, fragments, improved lifecycle methods",
    },
    {
      version: "React 16.8",
      year: 2019,
      features: "Introduction of hooks: useState, useEffect, and custom hooks",
    },
    {
      version: "React 17",
      year: 2020,
      features: "Gradual updates, JSX transform improvements",
    },
    {
      version: "React 18",
      year: 2022,
      features: "Concurrent mode, automatic batching, new hooks like useId",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Introduction to{" "}
        <span className="text-primary-600 dark:text-primary-400">React</span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Welcome to the React fundamentals course on Codify! This tutorial will
          guide you from the basics to advanced concepts of React, helping you
          build interactive web applications efficiently.
        </p>

        <div
          className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors `}
        >
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Did you know?</strong> React is a
            popular JavaScript library developed by Facebook. It powers many
            large-scale applications including Facebook, Instagram, and WhatsApp
            Web.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Why Learn React?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            React makes it easier to build dynamic web applications with
            reusable components. Think of it like LEGO blocks for your UI:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="font-semibold text-gray-800 dark:text-white">
                Components
              </strong>{" "}
              are reusable building blocks of UI
            </li>
            <li>
              <strong className="font-semibold text-gray-800 dark:text-white">
                JSX
              </strong>{" "}
              lets you write HTML-like code inside JavaScript
            </li>
            <li>
              <strong className="font-semibold text-gray-800 dark:text-white">
                Hooks
              </strong>{" "}
              allow functional components to handle state and side effects
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            React in Modern Development
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            React is widely used to build fast and responsive web apps. Common
            use cases include:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {reactUsedFor.map((item, index) => (
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
            React Versions & Key Features
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-900 rounded-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Version
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Year
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Key Features
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reactFeatures.map((row) => (
                  <tr
                    key={row.version}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {row.version}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {row.features}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            Getting Started with React
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Ready to start building React applications? Next, we'll cover JSX,
            components, props, state, and hooks to help you create interactive
            web apps efficiently.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReactIntroduction;
