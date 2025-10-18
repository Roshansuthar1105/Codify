import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
/* eslint-disable react/no-unescaped-entities */

const ModulesAndNPM = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Node.js <span className="text-primary-600 dark:text-primary-400">Modules and NPM</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    In Node.js, modules and NPM form the foundation of how code is organized, shared, and reused. 
                    Modules allow you to break your application into smaller, manageable pieces, while NPM 
                    (Node Package Manager) enables you to install and manage external libraries easily.
                </p>

                {/* What are Modules */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What are Modules?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A module in Node.js is simply a JavaScript file that can export code to be reused elsewhere in your application.
                            Node.js has a built-in module system that supports CommonJS (using <code>require</code>) and ES Modules (using <code>import/export</code>).
                        </p>
                    </div>

                    <CodeBlock code={`// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// Exporting functions
module.exports = { add, subtract };`} />

                    <CodeBlock code={`// main.js
const math = require('./math');

console.log('Addition:', math.add(10, 5));
console.log('Subtraction:', math.subtract(10, 5));`} />
                </section>

                {/* Types of Modules */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Types of Modules</h2>
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">1️⃣ Built-in (Core) Modules</h4>
                            <p className="text-green-700 dark:text-green-300">
                                Node.js provides several core modules like <code>fs</code>, <code>path</code>, <code>os</code>, <code>http</code>, and more.
                                You can use them directly without installing.
                            </p>
                            <CodeBlock code={`const os = require('os');
console.log('Operating System:', os.platform());
console.log('Total Memory:', os.totalmem());`} />
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">2️⃣ Local Modules</h4>
                            <p className="text-purple-700 dark:text-purple-300">
                                These are custom modules you create in your project, like <code>math.js</code> or <code>logger.js</code>.
                            </p>
                            <CodeBlock code={`const logger = require('./logger');
logger.log('App started successfully');`} />
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">3️⃣ Third-Party Modules</h4>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                These are external packages installed using NPM. Example: <code>express</code>, <code>lodash</code>, <code>mongoose</code>.
                            </p>
                            <CodeBlock code={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(3000, () => console.log('Server running on port 3000'));`} />
                        </div>
                    </div>
                </section>

                {/* Understanding NPM */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Understanding NPM (Node Package Manager)</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            NPM is the world's largest software registry that allows developers to share and reuse code.
                            It manages packages (modules) for your Node.js project and handles dependencies automatically.
                        </p>
                    </div>

                    <CodeBlock code={`// Initialize a new project
npm init -y

// Install a package
npm install express

// Install a package globally
npm install -g nodemon

// Uninstall a package
npm uninstall express`} />
                </section>

                {/* package.json */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The package.json File</h2>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
                        <p className="text-indigo-700 dark:text-indigo-300">
                            The <code>package.json</code> file stores metadata about your project — such as name, version, scripts, and dependencies.
                            It’s automatically created when you run <code>npm init</code>.
                        </p>
                    </div>

                    <CodeBlock code={`{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`} />
                </section>

                {/* Global vs Local Packages */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Global vs Local Packages</h2>
                    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                        <ul className="list-disc list-inside text-teal-700 dark:text-teal-300">
                            <li>Local packages are installed inside your project folder (used only by that project).</li>
                            <li>Global packages are installed system-wide and can be used anywhere.</li>
                        </ul>
                    </div>

                    <CodeBlock code={`// Local installation (saved in node_modules)
npm install nodemon

// Global installation
npm install -g nodemon`} />
                </section>

                {/* Semantic Versioning */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Semantic Versioning in NPM</h2>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                        <p className="text-yellow-700 dark:text-yellow-300">
                            Packages in NPM follow <strong>semantic versioning</strong> — <code>major.minor.patch</code> — to indicate update types.
                        </p>
                    </div>

                    <CodeBlock code={`"dependencies": {
  "express": "^4.18.2"
}
// ^ means compatible updates
// ~ means only patch updates`} />
                </section>

                {/* Best Practices */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices and Tips</h2>
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">✅ Do's</h4>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                                <li>• Keep modules small and reusable</li>
                                <li>• Always initialize your project with <code>npm init</code></li>
                                <li>• Save dependencies with <code>--save</code></li>
                                <li>• Use semantic versioning for stability</li>
                                <li>• Regularly update outdated packages</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">❌ Don'ts</h4>
                            <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                                <li>• Don’t use global packages unless necessary</li>
                                <li>• Avoid installing unnecessary dependencies</li>
                                <li>• Don’t modify files inside <code>node_modules</code></li>
                                <li>• Don’t forget to add <code>node_modules</code> to .gitignore</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Summary Box */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Module Mastery with NPM 🚀</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Understand local, built-in, and third-party modules</li>
                        <li>• Use NPM to manage and install dependencies efficiently</li>
                        <li>• Create reusable modules using CommonJS or ES Modules</li>
                        <li>• Manage your project’s configuration using <code>package.json</code></li>
                        <li>• Follow best practices for scalability and maintainability</li>
                    </ul>

                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Next Step:</strong> Learn about the <strong>HTTP module</strong> to create your first server in Node.js!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModulesAndNPM;
