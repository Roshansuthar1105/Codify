import React from "react";
import CodeBlock from "../../components/CodeBlock";

const LayoutComp = () => {
  const layoutExamples = [
    {
      title: "Simple Layout Component",
      code: `function Page({ children }) {
  return (
    <div className="container mx-auto p-4">
      <header className="bg-gray-200 p-4">Header</header>
      <main>{children}</main>
      <footer className="bg-gray-200 p-4">Footer</footer>
    </div>
  );
}`,
      explanation:
        "A basic layout component that wraps content with a header and footer. Simple and reusable.",
    },
    {
      title: "Layout with Sidebar",
      code: `function PageWithSidebar({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">Sidebar</aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}`,
      explanation:
        "A layout component including a sidebar for navigation or additional content. Useful for dashboards or admin panels.",
    },
    {
      title: "Responsive Layout",
      code: `function ResponsiveLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="md:w-64 bg-gray-100 p-4">Sidebar</aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}`,
      explanation:
        "This layout adjusts for small and large screens. Sidebar collapses below content on mobile devices.",
    },
    {
      title: "Nested Layouts",
      code: `function MainLayout({ children }) {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}`,
      explanation:
        "Nested layouts allow multiple layers of layout components, useful for complex applications with consistent UI structure.",
    },
  ];

  const bestPractices = [
    "Keep layout components reusable and minimal.",
    "Use the children prop to pass dynamic content.",
    "Separate layout from business logic.",
    "Implement responsive design for small and large screens.",
    "Use semantic HTML elements (header, main, footer, aside).",
    "Compose layouts with multiple nested components for flexibility.",
  ];

  const commonMistakes = [
    "Hardcoding content inside layout components.",
    "Mixing business logic with layout components.",
    "Not considering responsive design for mobile users.",
    "Creating very large layout components instead of splitting them.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Layout Components
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Layout components in React allow you to define reusable page
          structures that include headers, footers, sidebars, and main content
          areas. They are key to building consistent, maintainable, and
          responsive user interfaces.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Keep layout
            components separate from business logic. This ensures reusability
            and a cleaner codebase.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Layout Examples
          </h2>
          <div className="space-y-6">
            {layoutExamples.map((ex, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {ex.title}
                </h3>
                <div className="overflow-x-auto">
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
            Why Use Layout Components?
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Maintain consistent UI across pages.</li>
            <li>Reduce duplication by reusing common structures.</li>
            <li>Improve maintainability by separating structure from logic.</li>
            <li>Enable responsive and adaptive designs easily.</li>
            <li>Make the app scalable for future UI enhancements.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {bestPractices.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common Mistakes
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {commonMistakes.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            Pro Tip
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Layout components are the backbone of a professional and
            maintainable React application. Combine them with responsive design
            and nested components to create flexible, modern, and scalable UIs.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LayoutComp;
