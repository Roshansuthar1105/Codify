import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TsInstallation = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Installing TypeScript
                </h1>
                
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-800 dark:text-green-200">
                        <strong>TypeScript</strong> can be installed globally or locally in your project. 
                        We'll cover both methods and their use cases.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Prerequisites
                </h2>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Before installing TypeScript, ensure you have:</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li><strong>Node.js</strong> (version 14 or higher recommended)</li>
                        <li><strong>npm</strong> (comes with Node.js) or <strong>yarn</strong></li>
                        <li>A code editor like <strong>VS Code</strong> (recommended for TypeScript)</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Installation Methods
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Method 1: Global Installation
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Install TypeScript globally on your system. This allows you to use the <code>tsc</code> command from anywhere.
                </p>

                <CodeBlock
                    code={`# Install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version

# Expected output: Version 5.x.x`}
                />

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">✅ Pros of Global Installation:</h4>
                    <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 text-sm space-y-1">
                        <li>Available system-wide</li>
                        <li>Good for learning and quick experiments</li>
                        <li>No need to install in each project</li>
                    </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Method 2: Local Installation (Recommended)
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Install TypeScript as a development dependency in your project. This ensures version consistency across team members.
                </p>

                <CodeBlock
                    code={`# Navigate to your project directory
cd my-typescript-project

# Install TypeScript locally
npm install --save-dev typescript

# Or with yarn
yarn add -D typescript

# Verify installation
npx tsc --version`}
                />

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Pros of Local Installation:</h4>
                    <ul className="list-disc list-inside text-green-700 dark:text-green-300 text-sm space-y-1">
                        <li>Version consistency across team members</li>
                        <li>Project-specific TypeScript version</li>
                        <li>Better for production projects</li>
                        <li>Works with CI/CD pipelines</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Setting Up Your First TypeScript Project
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Step 1: Initialize a New Project
                </h3>

                <CodeBlock
                    code={`# Create a new directory
mkdir my-typescript-project
cd my-typescript-project

# Initialize npm project
npm init -y

# Install TypeScript locally
npm install --save-dev typescript

# Install Node.js types (optional but recommended)
npm install --save-dev @types/node`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Step 2: Create TypeScript Configuration
                </h3>

                <CodeBlock
                    code={`# Generate tsconfig.json
npx tsc --init

# This creates a tsconfig.json file with default settings`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Step 3: Create Your First TypeScript File
                </h3>

                <CodeBlock
                    code={`// Create src/index.ts
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

const message = greet("TypeScript");
console.log(message);`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Step 4: Compile and Run
                </h3>

                <CodeBlock
                    code={`# Compile TypeScript to JavaScript
npx tsc src/index.ts

# This creates src/index.js
# Run the compiled JavaScript
node src/index.js

# Output: Hello, TypeScript!`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Package.json Scripts
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Add convenient scripts to your <code>package.json</code> for common TypeScript operations.
                </p>

                <CodeBlock
                    code={`{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "start": "node dist/index.js",
    "dev": "tsc --watch & nodemon dist/index.js"
  }
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    IDE Setup
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    VS Code (Recommended)
                </h3>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Install these VS Code extensions:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li><strong>TypeScript Importer</strong> - Auto-import TypeScript modules</li>
                        <li><strong>TypeScript Hero</strong> - Advanced TypeScript features</li>
                        <li><strong>Error Lens</strong> - Show errors inline</li>
                        <li><strong>TypeScript Importer</strong> - Auto-import functionality</li>
                    </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Other Editors
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">WebStorm/IntelliJ</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Built-in TypeScript support. No additional setup required.
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Sublime Text</h4>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                            Install TypeScript package for syntax highlighting and basic support.
                        </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Vim/Neovim</h4>
                        <p className="text-purple-700 dark:text-purple-300 text-sm">
                            Use coc.nvim or nvim-lspconfig for TypeScript support.
                        </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Atom</h4>
                        <p className="text-orange-700 dark:text-orange-300 text-sm">
                            Install atom-typescript package for full TypeScript support.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Troubleshooting
                </h2>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">Common Issues:</h3>
                    <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-2">
                        <li><strong>"tsc command not found"</strong> - Make sure TypeScript is installed globally or use npx</li>
                        <li><strong>Permission errors</strong> - Use sudo on macOS/Linux or run as administrator on Windows</li>
                        <li><strong>Version conflicts</strong> - Use local installation to avoid global version conflicts</li>
                        <li><strong>Node.js version</strong> - Ensure you're using Node.js 14 or higher</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Tip:</strong> For most projects, use local installation with npx to ensure 
                        version consistency across your team and deployment environments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TsInstallation;
