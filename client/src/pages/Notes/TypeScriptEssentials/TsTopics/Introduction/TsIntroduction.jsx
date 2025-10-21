import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TsIntroduction = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    TypeScript Introduction
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>TypeScript</strong> is a strongly typed programming language that builds on JavaScript, 
                        giving you better tooling at any scale.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    What is TypeScript?
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical 
                    superset of JavaScript and adds optional static type checking to the language. TypeScript is designed 
                    for the development of large applications and transcompiles to JavaScript.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Key Features
                </h3>
                
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                    <li><strong>Static Type Checking:</strong> Catch errors at compile time</li>
                    <li><strong>Enhanced IDE Support:</strong> Better autocomplete, refactoring, and navigation</li>
                    <li><strong>Modern JavaScript Features:</strong> Use latest ES features with type safety</li>
                    <li><strong>Gradual Adoption:</strong> Add types incrementally to existing JavaScript projects</li>
                    <li><strong>Rich Type System:</strong> Advanced types like generics, unions, and intersections</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    TypeScript vs JavaScript
                </h3>
                
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Feature</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">JavaScript</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">TypeScript</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Type Checking</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Runtime</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Compile Time</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Error Detection</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Runtime</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Development Time</td>
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
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Example: JavaScript vs TypeScript
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">JavaScript</h4>
                        <CodeBlock
                            code={`function add(a, b) {
    return a + b;
}

// This will cause runtime error
console.log(add("5", "3")); // "53" instead of 8`}
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">TypeScript</h4>
                        <CodeBlock
                            code={`function add(a: number, b: number): number {
    return a + b;
}

// This will cause compile-time error
console.log(add("5", "3")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'`}
                        />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Benefits of Using TypeScript
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Early Error Detection</h4>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                            Catch bugs before they reach production with compile-time type checking.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Better Refactoring</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Safely rename variables and functions across your entire codebase.
                        </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Enhanced Documentation</h4>
                        <p className="text-purple-700 dark:text-purple-300 text-sm">
                            Types serve as living documentation for your code.
                        </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Improved Team Collaboration</h4>
                        <p className="text-orange-700 dark:text-orange-300 text-sm">
                            Clear contracts between different parts of your application.
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    When to Use TypeScript
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">✅ Good for:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                        <li>Large applications with multiple developers</li>
                        <li>Long-term projects that need maintenance</li>
                        <li>APIs and libraries that other developers will use</li>
                        <li>Projects where type safety is critical</li>
                        <li>Teams transitioning from statically typed languages</li>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">⚠️ Consider alternatives for:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li>Quick prototypes or small scripts</li>
                        <li>Projects with tight deadlines</li>
                        <li>Teams new to JavaScript</li>
                        <li>Legacy codebases with complex build processes</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> TypeScript is not a replacement for JavaScript. It's a tool that helps 
                        you write better JavaScript by adding type safety and modern development features.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TsIntroduction;
