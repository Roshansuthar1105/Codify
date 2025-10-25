import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const WhatIsTypeScript = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    What is TypeScript?
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>TypeScript</strong> is a programming language that extends JavaScript by adding static type definitions. 
                        It's designed for the development of large applications and transcompiles to JavaScript.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Understanding TypeScript
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. 
                    It's developed and maintained by Microsoft and is open source.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Core Concepts
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Static Typing</h4>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                            Types are checked at compile time, not runtime. This catches errors before your code runs.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">JavaScript Superset</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            All valid JavaScript code is also valid TypeScript code.
                        </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Compile Time</h4>
                        <p className="text-purple-700 dark:text-purple-300 text-sm">
                            TypeScript compiles to JavaScript, which runs in any JavaScript environment.
                        </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Optional Types</h4>
                        <p className="text-orange-700 dark:text-orange-300 text-sm">
                            You can add types gradually to existing JavaScript projects.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    TypeScript vs JavaScript
                </h2>

                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Aspect</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">JavaScript</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">TypeScript</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Type System</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Dynamic</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Static</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Error Detection</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Runtime</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Compile Time</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">IDE Support</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Basic</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Advanced</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Refactoring</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Manual</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Automated</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Learning Curve</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gentle</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Moderate</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Why Use TypeScript?
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Early Error Detection
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">JavaScript (Runtime Error)</h4>
                        <CodeBlock
                            code={`function calculateArea(length, width) {
    return length * width;
}

// This will cause a runtime error
const area = calculateArea("5", "3"); // "15" (string concatenation)
console.log(area); // "15" instead of 15`}
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">TypeScript (Compile Error)</h4>
                        <CodeBlock
                            code={`function calculateArea(length: number, width: number): number {
    return length * width;
}

// This will cause a compile-time error
const area = calculateArea("5", "3"); 
// Error: Argument of type 'string' is not assignable to parameter of type 'number'`}
                        />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Better IDE Support
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">TypeScript provides:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li><strong>IntelliSense:</strong> Smart autocomplete based on types</li>
                        <li><strong>Error Highlighting:</strong> Real-time error detection</li>
                        <li><strong>Refactoring:</strong> Safe renaming and restructuring</li>
                        <li><strong>Navigation:</strong> Go to definition, find references</li>
                        <li><strong>Documentation:</strong> Hover information and parameter hints</li>
                    </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Self-Documenting Code
                </h3>
                
                <CodeBlock
                    code={`// JavaScript - unclear what this function expects
function processUser(user) {
    return user.name + " is " + user.age + " years old";
}

// TypeScript - clear interface and expectations
interface User {
    name: string;
    age: number;
}

function processUser(user: User): string {
    return \`\${user.name} is \${user.age} years old\`;
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    TypeScript Features
                </h2>

                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Type System</h3>
                        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                            <li>Basic types (string, number, boolean, etc.)</li>
                            <li>Array and object types</li>
                            <li>Union and intersection types</li>
                            <li>Generic types for reusable code</li>
                            <li>Utility types for type manipulation</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Advanced Features</h3>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1">
                            <li>Interfaces and type aliases</li>
                            <li>Classes with access modifiers</li>
                            <li>Enums for named constants</li>
                            <li>Decorators for metadata</li>
                            <li>Modules and namespaces</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">Modern JavaScript</h3>
                        <ul className="list-disc list-inside text-purple-700 dark:text-purple-300 space-y-1">
                            <li>ES6+ features with type safety</li>
                            <li>Async/await with proper typing</li>
                            <li>Destructuring with type annotations</li>
                            <li>Template literals with type checking</li>
                            <li>Arrow functions with return types</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    When to Use TypeScript
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Good for:</h4>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-300 text-sm space-y-1">
                            <li>Large applications with multiple developers</li>
                            <li>Long-term projects requiring maintenance</li>
                            <li>APIs and libraries used by other developers</li>
                            <li>Projects where type safety is critical</li>
                            <li>Teams transitioning from statically typed languages</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Consider alternatives for:</h4>
                        <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                            <li>Quick prototypes or small scripts</li>
                            <li>Projects with very tight deadlines</li>
                            <li>Teams completely new to JavaScript</li>
                            <li>Legacy codebases with complex build processes</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    TypeScript Compilation
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    TypeScript code is compiled to JavaScript. The TypeScript compiler (tsc) performs type checking 
                    and then generates JavaScript code that can run in any JavaScript environment.
                </p>

                <CodeBlock
                    code={`// TypeScript source (index.ts)
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

const message = greet("TypeScript");

// Compiled JavaScript (index.js)
function greet(name) {
    return \`Hello, \${name}!\`;
}

const message = greet("TypeScript");`}
                />

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 text-sm space-y-1">
                        <li>Type annotations are removed during compilation</li>
                        <li>Only valid JavaScript is generated</li>
                        <li>Type checking happens before compilation</li>
                        <li>Source maps can be generated for debugging</li>
                        <li>Declaration files (.d.ts) can be generated for type information</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Remember:</strong> TypeScript is a tool that helps you write better JavaScript. 
                        It doesn't replace JavaScript - it enhances it with type safety and better developer experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhatIsTypeScript;
