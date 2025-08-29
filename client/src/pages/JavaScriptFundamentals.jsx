import React from 'react';
import { useTheme } from '../context/ThemeContext';

const JS_FUNDAMENTALS = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    content:
      "JavaScript is a versatile, high-level programming language primarily used for web development to add interactivity and dynamic behavior to web pages."
  },
  {
    id: 2,
    title: "Variables & Data Types",
    content: [
      "Variables store data values. Use let, const, or var to declare variables.",
      "Data types: string, number, boolean, null, undefined, object, symbol."
    ],
    code: `let name = "Alice"; // string\nconst age = 25; // number\nlet isStudent = true; // boolean`
  },
  {
    id: 3,
    title: "Operators",
    content: [
      "+, -, *, /, %, ++, -- (Arithmetic)",
      "=, +=, -=, *=, /= (Assignment)",
      ">, <, >=, <=, ==, ===, !=, !== (Comparison)",
      "&&, ||, ! (Logical)"
    ]
  },
  {
    id: 4,
    title: "Control Structures",
    content: [
      "if, else if, else",
      "switch",
      "for, while, do...while loops"
    ],
    code: `if (age > 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}`
  },
  {
    id: 5,
    title: "Functions",
    content: [
      "Reusable blocks of code.",
      "Can be declared using function keyword or as arrow functions."
    ],
    code: `function greet(name) {\n  return 'Hello, ' + name;\n}\n\nconst add = (a, b) => a + b;`
  },
  {
    id: 6,
    title: "Arrays & Objects",
    content: [
      "Arrays store ordered lists of values.",
      "Objects store key-value pairs."
    ],
    code: `let colors = ['red', 'green', 'blue'];\nlet person = { name: 'Alice', age: 25 };`
  },
  {
    id: 7,
    title: "DOM Manipulation",
    content: [
      "JavaScript can interact with and modify the HTML DOM.",
      "Use document.getElementById, querySelector, etc."
    ],
    code: `document.getElementById('demo').textContent = 'Hello JS!';`
  },
  {
    id: 8,
    title: "Events",
    content: [
      "Respond to user actions like clicks, keypresses, etc.",
      "Use addEventListener to handle events."
    ],
    code: `button.addEventListener('click', function() {\n  alert('Button clicked!');\n});`
  },
  {
    id: 9,
    title: "ES6+ Features",
    content: [
      "let & const, arrow functions, template literals, destructuring, spread/rest, classes, modules, promises, async/await."
    ],
    code: `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);`
  },
  {
    id: 10,
    title: "Template Literals",
    content: [
      "Template literals allow embedding expressions in strings.",
      "Use backticks (\`) instead of quotes."
    ],
    code: "const name = 'Alice';\nconsole.log(`Hello, ${name}!`);"
  },
  {
    id: 11,
    title: "Destructuring",
    content: [
      "Destructuring allows easy extraction of array or object values."
    ],
    code: `const [a, b] = [1, 2];\nconst { name, age } = { name: 'Bob', age: 30 };`
  },
  {
    id: 12,
    title: "Spread & Rest Operators",
    content: [
      "Spread (...) expands elements of arrays/objects.",
      "Rest collects multiple arguments into one array."
    ],
    code: `const arr = [1, 2, 3];\nconst newArr = [...arr, 4];\n\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b);\n}`
  },
  {
    id: 13,
    title: "Classes",
    content: [
      "Classes provide a blueprint for creating objects."
    ],
    code: `class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return 'Hello ' + this.name;\n  }\n}\n\nconst p = new Person('Alice');`
  },
  {
    id: 14,
    title: "Modules",
    content: [
      "Modules allow code splitting and reusability.",
      "Use export and import."
    ],
    code: `// math.js\nexport const add = (a, b) => a + b;\n\n// app.js\nimport { add } from './math.js';`
  },
  {
    id: 15,
    title: "Promises",
    content: [
      "Promises handle asynchronous tasks and represent future values."
    ],
    code: `const fetchData = () => new Promise((resolve) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});`
  },
  {
    id: 16,
    title: "Async / Await",
    content: [
      "Async/await makes asynchronous code easier to read and write."
    ],
    code: `async function getData() {\n  const data = await fetchData();\n  console.log(data);\n}`
  },
  {
    id: 17,
    title: "Error Handling",
    content: [
      "Use try...catch for handling exceptions."
    ],
    code: `try {\n  throw new Error('Something went wrong');\n} catch (e) {\n  console.error(e.message);\n}`
  },
  {
    id: 18,
    title: "Set & Map",
    content: [
      "Set: Stores unique values.",
      "Map: Stores key-value pairs with any key type."
    ],
    code: `const mySet = new Set([1, 2, 2]);\nconst myMap = new Map([['a', 1], ['b', 2]]);`
  },
  {
    id: 19,
    title: "JSON",
    content: [
      "JSON is used for data exchange between client & server."
    ],
    code: `const obj = { name: 'Alice' };\nconst str = JSON.stringify(obj);\nconst parsed = JSON.parse(str);`
  },
  {
    id: 20,
    title: "Timers",
    content: [
      "Use setTimeout and setInterval for delayed or repeated actions."
    ],
    code: `setTimeout(() => console.log('Hello after 1s'), 1000);\nsetInterval(() => console.log('Tick'), 1000);`
  },
  {
    id: 21,
    title: "LocalStorage & SessionStorage",
    content: [
      "Store data in the browser for persistence."
    ],
    code: `localStorage.setItem('user', 'Alice');\nconsole.log(localStorage.getItem('user'));`
  },
  {
    id: 22,
    title: "Fetch API",
    content: [
      "Fetch API is used for HTTP requests."
    ],
    code: `fetch('https://api.example.com')\n  .then(res => res.json())\n  .then(data => console.log(data));`
  },
  {
    id: 23,
    title: "Event Loop",
    content: [
      "Event loop handles asynchronous callbacks and ensures non-blocking execution."
    ]
  },
  {
    id: 24,
    title: "Summary",
    content:
      "JavaScript is essential for modern web development. Mastering its fundamentals, ES6+ features, and async concepts is key to building interactive apps."
  }
];


const JavaScriptFundamentals = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className={`relative min-h-screen py-12 px-4 z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background grid and gradient overlay */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-4 transition-colors duration-300 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            JavaScript Fundamentals
          </h1>
          <div className={`h-1 w-32 mx-auto rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'} mb-4`}></div>
          <p className={`mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            A comprehensive guide to JavaScript concepts and syntax
          </p>
        </div>
        <div className="jsfund-vertical-stack">
          {JS_FUNDAMENTALS.length === 0 ? (
            <div style={{color: '#ff6b6b', textAlign: 'center', fontSize: '1.2rem', marginTop: '40px'}}>No notes available.</div>
          ) : (
            JS_FUNDAMENTALS.map(note => (
              <div key={note.id} className={`jsfund-card group relative p-6 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-2xl mx-auto mb-8 hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}>
                <h2 className="text-xl font-semibold mb-4 text-primary">{note.title}</h2>
                {note.content && Array.isArray(note.content) ? (
                  <ul className="list-disc pl-5 mb-2">
                    {note.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : note.content ? (
                  <p className="mb-2">{note.content}</p>
                ) : null}
                {note.code && (
                  <pre className="bg-gray-950 text-blue-200 text-sm rounded-lg p-4 mt-2 overflow-x-auto border border-blue-800 font-mono">
                    <code>{note.code}</code>
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        .font-righteous {
          font-family: 'Righteous', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .jsfund-vertical-stack {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .jsfund-card {
          width: 100%;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .jsfund-card {
            min-width: 95vw;
            max-width: 99vw;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default JavaScriptFundamentals;
