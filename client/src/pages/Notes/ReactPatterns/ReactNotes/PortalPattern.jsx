import React from "react";
import CodeBlock from "../../components/CodeBlock";

const PortalPattern = () => {
  const examples = [
    {
      title: "Basic React Portal",
      code: `import React from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root")
  );
}

function App() {
  return (
    <div>
      <h1>App Content</h1>
      <Modal>
        <p>This is rendered in a portal!</p>
      </Modal>
    </div>
  );
}

export default App;`,
      explanation:
        "React Portals allow you to render a component's children into a DOM node that exists outside the main DOM hierarchy of the parent component.",
    },
    {
      title: "Using Portals for Modals",
      code: `function App() {
  return (
    <div>
      <h1>Website Content</h1>
      <Modal>
        <div className="modal-box">
          <h2>Modal Header</h2>
          <p>Modal content rendered using portal.</p>
        </div>
      </Modal>
    </div>
  );
}`,
      explanation:
        "Portals are especially useful for modals, tooltips, and dropdowns to escape overflow or z-index issues and render at the top-level of the DOM.",
    },
  ];

  const bestPractices = [
    "Use portals for components that need to visually break out of parent container constraints.",
    "Keep portal usage limited to UI overlays like modals, tooltips, or context menus.",
    "Ensure proper cleanup of event listeners or side effects in portal components.",
  ];

  const commonMistakes = [
    "Rendering everything in a portal unnecessarily.",
    "Forgetting to provide a DOM element to attach the portal.",
    "Not handling z-index or focus management correctly for modals.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Portals
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          <strong>React Portals</strong> provide a way to render children into a
          DOM node outside of the parent component’s DOM hierarchy. This is
          helpful for UI elements like modals, tooltips, and overlays.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Use portals when
            you need components to escape overflow, z-index, or stacking
            context issues.
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
            React Portals allow components to render outside their parent
            hierarchy, solving overflow and z-index issues. Use them for
            modals, tooltips, and overlays for clean and predictable UI
            rendering.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PortalPattern;
