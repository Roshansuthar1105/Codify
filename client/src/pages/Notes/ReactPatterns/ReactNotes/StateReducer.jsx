import React from "react";
import CodeBlock from "../../components/CodeBlock";

const StateReducer = () => {
  const examples = [
    {
      title: "Basic useReducer Example",
      code: `import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default Counter;`,
      explanation:
        "`useReducer` is an alternative to `useState` for managing complex state logic. It uses a reducer function to determine how the state should update based on dispatched actions.",
    },
    {
      title: "Managing Form State with useReducer",
      code: `import { useReducer } from "react";

const initialForm = { name: "", email: "" };

function formReducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function ContactForm() {
  const [form, dispatch] = useReducer(formReducer, initialForm);

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

export default ContactForm;`,
      explanation:
        "`useReducer` is ideal for handling form inputs, where multiple related state variables need to update together in a predictable manner.",
    },
    {
      title: "Combining useReducer with Context",
      code: `import { createContext, useContext, useReducer } from "react";

const CounterContext = createContext();

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext);
}

function CounterDisplay() {
  const { state, dispatch } = useCounter();
  return (
    <div>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default CounterDisplay;`,
      explanation:
        "By combining `useReducer` with Context, you can manage global state efficiently without needing a library like Redux.",
    },
  ];

  const bestPractices = [
    "Use `useReducer` when state transitions are complex or interdependent.",
    "Keep reducer functions pure — they should not contain side effects like API calls.",
    "Use descriptive action types like 'ADD_TODO' or 'UPDATE_USER'.",
    "Combine `useReducer` with Context for scalable global state management.",
    "Keep reducer logic simple and predictable for easier debugging.",
  ];

  const commonMistakes = [
    "Mutating state directly inside the reducer.",
    "Using non-descriptive or inconsistent action types.",
    "Putting side effects (like API calls) inside the reducer.",
    "Recreating reducer or initial state inside component re-renders.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React{" "}
        <span className="text-primary-600 dark:text-primary-400">
          State Reducer
        </span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          The <strong>useReducer</strong> Hook is a powerful alternative to{" "}
          <code>useState</code> when managing complex state logic in React. It
          centralizes state updates in a reducer function, improving clarity and
          predictability for larger applications.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Think of reducers as
            traffic controllers — they decide how your state should change based
            on the incoming action type.
          </p>
        </div>

        {/* Examples Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Common useReducer Patterns
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

        {/* useState vs useReducer Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            useState vs useReducer
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    useState
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    useReducer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Simplicity
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Best for simple or single-value state
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Better for complex or related state logic
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    State Updates
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Directly updates via setState function
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Updates via dispatched actions
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Readability
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Simple for small components
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Easier to manage in large applications
                  </td>
                </tr>
              </tbody>
            </table>
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
            `useReducer` is a predictable and structured way to handle complex
            state updates. It shines in apps with multi-step logic, nested data,
            or when scaling local state into global contexts — making your code
            cleaner and easier to reason about.
          </p>
        </section>
      </div>
    </div>
  );
};

export default StateReducer;
