import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ContainerPresenter = () => {
  const examples = [
    {
      title: "Basic Container-Presenter Example",
      code: `// Container Component
function UserContainer() {
  const user = { name: "Ankita", age: 22 };
  return <UserPresenter user={user} />;
}

// Presenter Component
function UserPresenter({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UserContainer;`,
      explanation:
        "The Container-Presenter pattern separates logic (Container) from UI (Presenter). Containers handle data, state, and API calls, while Presenters focus purely on rendering.",
    },
    {
      title: "Using Multiple Presenters",
      code: `function UsersContainer() {
  const users = [
    { name: "Ankita", age: 22 },
    { name: "Alex", age: 25 },
  ];

  return (
    <>
      {users.map((user) => (
        <UserPresenter key={user.name} user={user} />
      ))}
    </>
  );
}

function UserPresenter({ user }) {
  return (
    <div style={{ border: "1px solid gray", padding: "8px", margin: "4px" }}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UsersContainer;`,
      explanation:
        "Using multiple presenter components allows you to keep UI reusable and clean. The container just maps over data and delegates rendering to presenters.",
    },
  ];

  const bestPractices = [
    "Always keep Container logic separate from Presenter UI.",
    "Containers should fetch data, manage state, and handle events.",
    "Presenters should be pure, receiving props and rendering UI.",
    "Use multiple presenter components for reusable UI blocks.",
    "Write unit tests for both Container and Presenter independently.",
  ];

  const commonMistakes = [
    "Mixing UI and business logic in the same component.",
    "Passing unnecessary state to presenter components.",
    "Mutating props inside the presenter.",
    "Using too many nested containers which complicate the structure.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Container-Presenter Pattern
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          The <strong>Container-Presenter Pattern</strong> is a design pattern
          in React that separates data and business logic (Container) from the
          UI rendering (Presenter). This makes components easier to maintain,
          test, and reuse.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Think of containers
            as controllers and presenters as pure views.
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
            The Container-Presenter Pattern helps you create clean separation of
            concerns in React components. Containers handle data and logic,
            while Presenters focus on rendering UI. This results in maintainable,
            testable, and reusable components.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContainerPresenter;
