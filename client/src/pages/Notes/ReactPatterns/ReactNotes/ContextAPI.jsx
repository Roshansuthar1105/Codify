import React from 'react';
import CodeBlock from "../../components/CodeBlock";

const ContextAPI = () => {
  const examples = [
    {
      title: "Basic Context Creation",
      code: `import React, { createContext, useContext } from 'react';

// Create a Context
const ThemeContext = createContext('light');

function DisplayTheme() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <DisplayTheme />
    </ThemeContext.Provider>
  );
}

export default App;`,
      explanation: "Create a context, provide a value, and consume it in a child component using `useContext`."
    },
    {
      title: "Context with Multiple Values",
      code: `import React, { createContext, useContext } from 'react';

const UserContext = createContext({ name: '', role: '' });

function UserInfo() {
  const { name, role } = useContext(UserContext);
  return <p>User: {name}, Role: {role}</p>;
}

function App() {
  return (
    <UserContext.Provider value={{ name: 'Alice', role: 'Admin' }}>
      <UserInfo />
    </UserContext.Provider>
  );
}

export default App;`,
      explanation: "Context can store objects or arrays, allowing multiple values to be shared easily."
    },
    {
      title: "Updating Context from a Child Component",
      code: `import React, { createContext, useState, useContext } from 'react';

const CountContext = createContext();

function IncrementButton() {
  const { count, setCount } = useContext(CountContext);
  return <button onClick={() => setCount(count + 1)}>Increment ({count})</button>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <IncrementButton />
    </CountContext.Provider>
  );
}

export default App;`,
      explanation: "Context can also be used to share functions or state setters to allow child components to update shared state."
    },
    {
      title: "Custom Context Hook",
      code: `import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}`,
      explanation: "Creating custom hooks for context makes consuming context cleaner and easier throughout your app."
    }
  ];

  const keyPoints = [
    "Context API helps avoid prop drilling by providing global or shared state.",
    "Use Context for global themes, authentication, language, or user settings.",
    "Keep component-specific state local and only move shared state to context.",
    "Be careful with high-frequency updates: Context updates can cause re-renders of all consuming components.",
    "You can create multiple contexts for different concerns instead of one massive global context.",
    "Custom hooks can simplify access to context values."
  ];

  const whenNotToUse = [
    "Avoid using context for frequently updating state, like form inputs that update on every keystroke.",
    "Don't use context as a substitute for component state where local state is sufficient.",
    "Avoid storing large objects or deeply nested data that may trigger unnecessary renders."
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        React <span className="text-primary-600 dark:text-primary-400">Context API</span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          React Context API allows sharing state or data across your component tree without manually passing props at every level. It's ideal for global settings like themes, authentication, or language preferences.
        </p>

        <div className="mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <p className="text-primary-500 dark:text-primary-400">
            <strong className="font-semibold">Tip:</strong> Use context sparingly for truly shared state. Local component state is better kept in individual components for performance and clarity.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Context?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Passing props through many layers can become cumbersome (prop drilling). Context solves this by providing a central place for shared values.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h2>
          <div className="space-y-6">
            {examples.map((ex, i) => (
              <div key={i} className='bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700'>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{ex.title}</h3>
                <div className="w-full overflow-x-auto">
                  <CodeBlock code={ex.code} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Points</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {keyPoints.map((point, i) => (
              <li key={`point-${i}`} className="text-sm">{point}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">When Not To Use Context</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
            {whenNotToUse.map((point, i) => (
              <li key={`not-${i}`} className="text-sm">{point}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
          <h3 className="text-lg font-semibold text-primary-600 mb-2">Getting Started</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Identify which data is truly global or shared. Wrap your component tree with a context provider and consume it with `useContext`. Combine context with custom hooks for cleaner, maintainable, and scalable React applications.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContextAPI;
