import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ErrorBoundaryPattern = () => {
  const examples = [
    {
      title: "Basic Error Boundary Example",
      code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error("I crashed!");
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;`,
      explanation:
        "Error Boundaries in React catch JavaScript errors in their child component tree, log them, and display a fallback UI instead of crashing the whole app.",
    },
    {
      title: "Multiple Error Boundaries",
      code: `function App() {
  return (
    <>
      <ErrorBoundary>
        <ComponentA />
      </ErrorBoundary>
      <ErrorBoundary>
        <ComponentB />
      </ErrorBoundary>
    </>
  );
}`,
      explanation:
        "You can wrap different parts of your app with separate Error Boundaries to isolate errors and prevent one component crash from affecting the whole application.",
    },
  ];

  const bestPractices = [
    "Use Error Boundaries at high-level component boundaries.",
    "Always provide a user-friendly fallback UI.",
    "Log errors for debugging and monitoring.",
    "Do not use Error Boundaries for handling event handlers, async code, or server-side errors.",
    "Combine with logging services for production apps.",
  ];

  const commonMistakes = [
    "Using functional components as Error Boundaries (only class components work).",
    "Wrapping every small component with an Error Boundary unnecessarily.",
    "Hiding errors without logging them.",
    "Trying to catch errors inside event handlers (Error Boundaries don't catch these).",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Error Boundary Pattern
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          The <strong>Error Boundary Pattern</strong> in React is used to catch
          runtime errors in components, log them, and display a fallback UI
          instead of breaking the entire application.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Only class components
            can be used as Error Boundaries. Functional components cannot catch
            errors with getDerivedStateFromError or componentDidCatch.
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
            Error Boundaries provide a robust way to handle runtime errors in
            React applications. By isolating errors and showing fallback UI,
            they improve the reliability and user experience of your app.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ErrorBoundaryPattern;
