import React from "react";
import CodeBlock from "../../components/CodeBlock";

const HOC = () => {
  const examples = [
    {
      title: "Basic Higher-Order Component Example",
      code: `import React from 'react';

function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log('Props:', props);
    return <WrappedComponent {...props} />;
  };
}

function Hello({ name }) {
  return <h2>Hello, {name}!</h2>;
}

export default withLogger(Hello);`,
      explanation:
        "This example shows a simple HOC that logs props before rendering the wrapped component.",
    },
    {
      title: "HOC for Loading State",
      code: `import React from 'react';

function withLoading(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

function DataDisplay({ data }) {
  return <div>Data: {data}</div>;
}

export default withLoading(DataDisplay);`,
      explanation:
        "This HOC adds a loading UI to any component, improving reusability across multiple components.",
    },
    {
      title: "HOC with Authentication Check",
      code: `import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuth(Component) {
  return function ProtectedRoute(props) {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };
}

function Dashboard() {
  return <h2>Welcome to Dashboard</h2>;
}

export default withAuth(Dashboard);`,
      explanation:
        "This HOC ensures only authenticated users can access certain components or routes.",
    },
    {
      title: "HOC for Error Handling",
      code: `import React from 'react';

function withErrorBoundary(WrappedComponent) {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.error('Error caught by HOC:', error, info);
    }

    render() {
      if (this.state.hasError) {
        return <h3 style={{ color: 'red' }}>Something went wrong 😢</h3>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

function Profile({ user }) {
  if (!user) throw new Error('User data missing!');
  return <h2>Welcome, {user.name}</h2>;
}

export default withErrorBoundary(Profile);`,
      explanation:
        "This HOC adds an error boundary to any component. If a wrapped component throws an error, it displays a fallback UI instead of breaking the entire app.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Higher-Order Components (HOC)
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          A <strong>Higher-Order Component (HOC)</strong> is an advanced React
          pattern for reusing logic between components. It’s a **function that
          takes a component and returns a new enhanced component**. HOCs enable
          composition of behavior — separating logic from UI — making code
          cleaner, modular, and reusable.
        </p>

        {/* Info Tip */}
        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            💡 <strong>Tip:</strong> Think of an HOC as a “wrapper” that
            decorates a component with extra powers, without changing its
            original source code.
          </p>
        </div>

        {/* What Are HOCs */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            What Are Higher-Order Components?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            HOCs are **not part of React’s core API**, but a **pattern** that
            emerges naturally when composing components. They’re a way to share
            behavior — for example, authentication, logging, data fetching, or
            analytics — across multiple components.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The key principle: <br />
            <code>
              const EnhancedComponent = higherOrderComponent(WrappedComponent);
            </code>
          </p>
        </section>

        {/* Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Examples of HOCs
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors"
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

        {/* Real-world Use Cases */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Real-World Use Cases
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Wrapping pages that require authentication (Protected Routes)
            </li>
            <li>Tracking analytics and user interactions globally</li>
            <li>Injecting theme, language, or layout props dynamically</li>
            <li>Adding caching or data prefetching logic to components</li>
            <li>Feature toggling or role-based rendering in enterprise apps</li>
          </ul>
        </section>

        {/* Comparison with Custom Hooks */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            HOC vs Custom Hooks
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In modern React, <strong>Custom Hooks</strong> often replace HOCs
            for logic reuse because they are simpler, more readable, and work
            seamlessly with functional components.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 text-left">Aspect</th>
                  <th className="p-2 text-left">HOCs</th>
                  <th className="p-2 text-left">Custom Hooks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-t dark:border-gray-700">Usage</td>
                  <td className="p-2 border-t dark:border-gray-700">
                    Wrap components
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">
                    Called inside components
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-t dark:border-gray-700">
                    Complexity
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">Higher</td>
                  <td className="p-2 border-t dark:border-gray-700">Lower</td>
                </tr>
                <tr>
                  <td className="p-2 border-t dark:border-gray-700">
                    Readability
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">
                    Harder with nesting
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">
                    Easy to follow
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-t dark:border-gray-700">
                    Recommended
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">
                    For class components
                  </td>
                  <td className="p-2 border-t dark:border-gray-700">
                    For functional components
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ref Forwarding */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Forwarding Refs in HOCs
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By default, refs are not passed through HOCs. To fix this, React
            provides the <code>forwardRef</code> API.
          </p>
          <CodeBlock
            code={`function withForwardedRef(WrappedComponent) {
  const HOC = React.forwardRef((props, ref) => {
    return <WrappedComponent ref={ref} {...props} />;
  });
  return HOC;
}`}
          />
        </section>

        {/* Do’s and Don’ts */}
        <section className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            ✅ Do’s & ❌ Don’ts
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ Keep HOCs pure — don’t modify the wrapped component.</li>
            <li>✅ Give your HOC a meaningful display name for debugging.</li>
            <li>❌ Avoid deeply nested HOCs (also called “HOC hell”).</li>
            <li>
              ❌ Don’t use HOCs for simple logic reuse — prefer hooks instead.
            </li>
          </ul>
        </section>

        {/* Summary */}
        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">
            Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Higher-Order Components are a powerful concept for adding reusable
            functionality across multiple components. While HOCs remain valuable
            for class-based architectures, modern React apps prefer **custom
            hooks** and **composition patterns** for simpler and cleaner code.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HOC;
