import CodeBlock from "../../components/CodeBlock";
const FunctionComp = () => {
  const examples = [
    {
      title: "Basic Functional Component",
      code: `// Simple functional component
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Using the component
export default function App() {
  return <Welcome />;
}`,
      explanation:
        "A basic functional component that returns JSX. This is the simplest way to create UI in React.",
    },
    {
      title: "Functional Component with Props",
      code: `function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// Using destructuring
function GreetingDestructured({ name }) {
  return <h2>Welcome, {name}!</h2>;
}

export default function App() {
  return (
    <>
      <Greeting name="Ankita" />
      <GreetingDestructured name="Developer" />
    </>
  );
}`,
      explanation:
        "Functional components can receive data via props. Props are read-only and help make components reusable.",
    },
    {
      title: "Using useState Hook",
      code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;`,
      explanation:
        "The useState hook allows you to add state to functional components.",
    },
    {
      title: "Using useEffect Hook",
      code: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval); // Cleanup
  }, []);

  return <h2>Timer: {seconds}s</h2>;
}

export default Timer;`,
      explanation:
        "The useEffect hook lets you handle side effects such as data fetching, timers, and DOM manipulation.",
    },
  ];

  const bestPractices = [
    "Use PascalCase for component names (e.g., MyComponent)",
    "Keep components small and focused on a single responsibility",
    "Use props to make components reusable and dynamic",
    "Prefer functional components over class components",
    "Use hooks (useState, useEffect, etc.) for state and lifecycle logic",
    "Return a single parent element (use fragments <> </> if needed)",
    "Avoid deeply nested components — break them into smaller ones",
  ];

  const commonMistakes = [
    "Forgetting to export the component",
    "Returning multiple JSX elements without a parent wrapper",
    "Using hooks inside loops or conditional statements",
    "Mutating state directly instead of using the setter function",
    "Not passing required props to child components",
    "Using `this` keyword inside functional components",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        <span className="text-primary-600 dark:text-primary-400">React</span>{" "}
        Functional Components
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Functional components are the core building blocks of React
          applications. They are JavaScript functions that return JSX (React’s
          syntax extension for UI) and are used to render UI elements. With the
          introduction of hooks, functional components can now manage state,
          handle side effects, and access lifecycle features.
        </p>

        <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Key Concept: </strong>
            Functional components are simpler, faster, and more readable than
            class components. Hooks allow them to be equally powerful.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            What Are Functional Components?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Functional components are plain JavaScript functions that return
            JSX. They can accept inputs (called props) and use hooks to handle
            state or side effects.
          </p>
          <CodeBlock
            code={`function MyComponent() {
  return <h1>Hello, React!</h1>;
}

export default MyComponent;`}
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Code Examples
          </h2>
          <div className="space-y-6">
            {examples.map((example, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {example.title}
                </h3>
                <CodeBlock code={example.code} />
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                  {example.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Best Practices
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {bestPractices.map((practice, index) => (
                <li key={`best-${index}`} className="text-sm">
                  {practice}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Common Mistakes
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {commonMistakes.map((mistake, index) => (
                <li key={`mistake-${index}`} className="text-sm">
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
            Hooks and Reusability
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Hooks like <code>useState</code>, <code>useEffect</code>, and
            <code> useContext</code> make functional components powerful and
            reusable. You can even create custom hooks to share logic between
            components.
          </p>
          <CodeBlock
            code={`import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function DisplayWidth() {
  const width = useWindowWidth();
  return <h2>Window width: {width}px</h2>;
}

export default DisplayWidth;`}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionComp;
