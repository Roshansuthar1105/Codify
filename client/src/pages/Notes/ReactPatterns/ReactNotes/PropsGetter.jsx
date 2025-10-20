import React from "react";
import CodeBlock from "../../components/CodeBlock";

const PropsGetter = () => {
  const examples = [
    {
      title: "Basic Props Getter Pattern",
      code: `function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn((o) => !o);

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: (e) => {
        onClick?.(e);
        toggle();
      },
      ...props,
    };
  }

  return { on, toggle, getTogglerProps };
}

function Toggle() {
  const { on, getTogglerProps } = useToggle();

  return (
    <button
      {...getTogglerProps({
        onClick: () => console.log("User clicked!"),
        style: {
          padding: "8px 16px",
          background: on ? "limegreen" : "gray",
          color: "white",
          borderRadius: "8px",
        },
      })}
    >
      {on ? "ON" : "OFF"}
    </button>
  );
}

export default Toggle;`,
      explanation:
        "The Props Getter Pattern helps share reusable logic with full control over props merging. The `getTogglerProps` function merges user-provided props with internal ones like event handlers or accessibility attributes.",
    },
    {
      title: "Adding Custom Events with Props Getter",
      code: `function useInput() {
  const [value, setValue] = React.useState("");

  function getInputProps({ onChange, ...rest } = {}) {
    return {
      value,
      onChange: (e) => {
        setValue(e.target.value);
        onChange?.(e);
      },
      ...rest,
    };
  }

  return { value, getInputProps };
}

function InputField() {
  const { value, getInputProps } = useInput();

  return (
    <div>
      <input
        {...getInputProps({
          placeholder: "Type here...",
          onChange: () => console.log("User typing..."),
        })}
      />
      <p>Current: {value}</p>
    </div>
  );
}

export default InputField;`,
      explanation:
        "Props getters can inject internal behavior (like `setValue`) while allowing consumers to extend or override props such as `onChange`, `className`, or `aria-*` attributes.",
    },
    {
      title: "Combining Multiple Props Getters",
      code: `function useDropdown() {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((o) => !o);

  function getButtonProps({ onClick, ...props } = {}) {
    return {
      "aria-expanded": open,
      onClick: (e) => {
        onClick?.(e);
        toggle();
      },
      ...props,
    };
  }

  function getMenuProps({ style, ...props } = {}) {
    return {
      style: {
        display: open ? "block" : "none",
        border: "1px solid gray",
        padding: "8px",
        background: "white",
        borderRadius: "4px",
        ...style,
      },
      ...props,
    };
  }

  return { open, getButtonProps, getMenuProps };
}

function Dropdown() {
  const { getButtonProps, getMenuProps } = useDropdown();

  return (
    <div>
      <button {...getButtonProps({ style: { marginBottom: "8px" } })}>
        Toggle Menu
      </button>
      <div {...getMenuProps()}>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </div>
    </div>
  );
}

export default Dropdown;`,
      explanation:
        "You can expose multiple props getters to handle different UI elements. This pattern is used by libraries like Downshift or Reach UI to offer composable, flexible APIs without losing control over accessibility.",
    },
  ];

  const bestPractices = [
    "Always merge user props with internal ones rather than replacing them.",
    "Use optional chaining (e.g. `onClick?.(e)`) to safely call user handlers.",
    "Keep prop getter functions pure — they should not cause side effects.",
    "Name your getters descriptively: `getButtonProps`, `getInputProps`, etc.",
    "Expose only what consumers need — keep internal logic encapsulated.",
  ];

  const commonMistakes = [
    "Overwriting user-provided event handlers.",
    "Returning incomplete props (missing accessibility attributes).",
    "Running logic inside prop getters instead of event handlers.",
    "Not spreading user props — losing flexibility for consumers.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          Props Getter Pattern
        </span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        The <strong>Props Getter Pattern</strong> is an advanced React technique
        for building reusable hooks that let users extend behavior while
        preserving internal logic and accessibility. This pattern is commonly
        used in headless component libraries and custom hook design.
      </p>

      <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
        <p className="text-primary-500 dark:text-primary-400">
          <strong className="font-semibold">Tip:</strong> Think of props getters
          as “bridges” between internal logic and consumer customization —
          ensuring flexibility without breaking your hook’s core behavior.
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
          The Props Getter Pattern is a powerful abstraction for reusable,
          accessible hooks. It ensures users can customize behavior safely while
          your internal logic remains consistent — forming the foundation for
          flexible, composable UI libraries.
        </p>
      </section>
    </div>
  );
};

export default PropsGetter;
