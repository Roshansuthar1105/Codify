import React from "react";
import CodeBlock from "../../components/CodeBlock";

const SlotPattern = () => {
  const examples = [
    {
      title: "Basic Slot Pattern Example",
      code: `function Card({ children }) {
  return (
    <div style={{
      border: "1px solid gray",
      borderRadius: "8px",
      padding: "16px",
      maxWidth: "300px"
    }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is some content inside the card.</p>
      <button>Click Me</button>
    </Card>
  );
}

export default App;`,
      explanation:
        "The Slot Pattern lets you create flexible component layouts by passing JSX elements as children. Instead of hardcoding structure, it gives control to the parent to define the layout content dynamically.",
    },
    {
      title: "Named Slots Using Props",
      code: `function Modal({ header, body, footer }) {
  return (
    <div style={{
      border: "1px solid gray",
      borderRadius: "8px",
      padding: "16px",
      background: "#fff",
      width: "400px"
    }}>
      <div>{header}</div>
      <div style={{ margin: "12px 0" }}>{body}</div>
      <div>{footer}</div>
    </div>
  );
}

function App() {
  return (
    <Modal
      header={<h2>Confirm Delete</h2>}
      body={<p>Are you sure you want to delete this item?</p>}
      footer={
        <>
          <button>Cancel</button>
          <button style={{ marginLeft: "8px" }}>Confirm</button>
        </>
      }
    />
  );
}

export default App;`,
      explanation:
        "Named slots allow you to define different sections of a component (like `header`, `body`, `footer`) for greater control. This approach is ideal for modals, cards, or layouts.",
    },
    {
      title: "Advanced: Cloning Children for Slot Control",
      code: `function Tooltip({ children, content }) {
  const child = React.Children.only(children);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(child, {
        onMouseEnter: () => console.log("Tooltip shown!"),
      })}
      <div style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "black",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px"
      }}>
        {content}
      </div>
    </div>
  );
}

function App() {
  return (
    <Tooltip content="This is a tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}

export default App;`,
      explanation:
        "By using `React.cloneElement`, you can enhance child elements passed through slots with extra behavior, events, or props—without losing their original structure or functionality.",
    },
  ];

  const bestPractices = [
    "Use children for flexible, composable layouts.",
    "Provide named slots (`header`, `footer`, etc.) when specific structure is expected.",
    "Avoid deeply nesting slot components—it can harm readability.",
    "Use `React.Children` utilities to safely handle children props.",
    "Document slot usage clearly for other developers.",
  ];

  const commonMistakes = [
    "Assuming all children are valid React elements without checking.",
    "Mutating children directly instead of cloning them.",
    "Overcomplicating slots with too many named sections.",
    "Not handling edge cases when no slot content is passed.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Slot Pattern
        </span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        The <strong>Slot Pattern</strong> is a design approach that allows
        components to receive and render custom elements (children) in flexible
        ways. It’s widely used in component libraries to enable developers to
        control layout composition without losing functionality or style.
      </p>

      <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
        <p className="text-primary-500 dark:text-primary-400">
          <strong className="font-semibold">Tip:</strong> Think of slots as
          placeholders where parent components can “inject” JSX elements, giving
          full control over what’s rendered inside a component’s layout.
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
        <h3 className="text-lg font-semibold text-primary-600 mb-2">Summary</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          The Slot Pattern is all about flexibility and composition. It lets
          consumers inject structure into reusable components while maintaining
          encapsulated logic and consistent styling — a cornerstone of modern
          React architecture.
        </p>
      </section>
    </div>
  );
};

export default SlotPattern;
