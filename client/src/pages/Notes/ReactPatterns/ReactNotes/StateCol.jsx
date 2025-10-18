import React from 'react';
import CodeBlock from '../../components/CodeBlock';
const StateCol = () => {

    const stateUsedFor = [
        {
            title: "Component State",
            description: "Storing and managing data that changes over time within a single component using useState."
        },
        {
            title: "Derived State",
            description: "Calculating values based on props or other state, often within the render or via useMemo."
        },
        {
            title: "Shared State",
            description: "State that needs to be shared between components, often lifted up to a common ancestor or managed with context."
        },
        {
            title: "Server / Async State",
            description: "Managing data fetched from APIs or asynchronous sources, often using useEffect or custom hooks."
        }
    ];

    const bestPractices = [
        "Keep state as close as possible to where it is needed (colocation).",
        "Avoid duplicating state across components.",
        "Use multiple small state variables instead of a single large object when appropriate.",
        "Prefer derived values over storing redundant state.",
        "Use state updater functions for dependent updates.",
        "Keep components pure: state changes should trigger predictable renders."
    ];

    const commonMistakes = [
        "Lifting state unnecessarily too high in the component tree.",
        "Duplicating state in multiple components instead of lifting or sharing.",
        "Mutating state directly instead of using setter functions.",
        "Using state for values that can be computed from props or other state.",
        "Overusing context for state that doesn't need to be global."
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                React <span className='text-primary-600 dark:text-primary-400'>State & Colocation</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    State is a fundamental concept in React that allows components to remember information and respond to user actions dynamically. Proper colocation of state means keeping the state in the component that needs it most, avoiding unnecessary complexity and prop drilling.
                </p>

                <div className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors `}>
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Tip:</strong> Always colocate state as close as possible to the components that use it. This reduces re-renders and keeps your code more maintainable.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why State Matters</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        State allows React components to be interactive. Without state, components would be static and unable to respond to user input or asynchronous data.
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li><strong className="font-semibold text-gray-800 dark:text-white">Local State:</strong> Data specific to a component, e.g., form inputs.</li>
                        <li><strong className="font-semibold text-gray-800 dark:text-white">Shared State:</strong> Data used across multiple components, managed via lifting state up or context.</li>
                        <li><strong className="font-semibold text-gray-800 dark:text-white">Server State:</strong> Data fetched from APIs that may change asynchronously.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">React State in Modern Development</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        React state is often used for:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {stateUsedFor.map((item, index) => (
                            <div key={index} className='bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors'>
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h2>
                    <div className="space-y-6">
                        <div className='bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700'>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Basic useState Example</h3>
                            <CodeBlock code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;`} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">This demonstrates local component state using the useState hook.</p>
                        </div>

                        <div className='bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700'>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Lifting State Up</h3>
                            <CodeBlock code={`function TemperatureInput({ temperature, onChange }) {
  return (
    <input value={temperature} onChange={e => onChange(e.target.value)} />
  );
}

function Calculator() {
  const [temp, setTemp] = useState('');

  return (
    <div>
      <TemperatureInput temperature={temp} onChange={setTemp} />
      <TemperatureInput temperature={temp} onChange={setTemp} />
      <p>Current temperature: {temp}</p>
    </div>
  );
}`} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">Shows how to lift state up to a common parent for sharing between multiple child components.</p>
                        </div>

                        <div className='bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700'>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">State with Async Data</h3>
                            <CodeBlock code={`import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default UsersList;`} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">Demonstrates managing asynchronous server state with useEffect and useState.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {bestPractices.map((practice, index) => (
                            <li key={`best-${index}`} className="text-sm">{practice}</li>
                        ))}
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {commonMistakes.map((mistake, index) => (
                            <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 mb-2">Getting Started with State Colocation</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Start by identifying which components truly need a piece of state. Keep it local if only one component uses it, lift it to a parent if multiple components need access, and use context or global state management for application-wide data. This helps keep your React app efficient, predictable, and easier to maintain.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default StateCol;
