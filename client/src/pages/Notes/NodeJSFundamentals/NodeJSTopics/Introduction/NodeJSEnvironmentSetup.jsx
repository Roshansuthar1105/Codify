/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const NodeJSEnvironmentSetup = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Node.js <span className='text-primary-600 dark:text-primary-400'>Environment Setup</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Setting up a proper development environment makes Node.js development more efficient and enjoyable. 
                    This guide covers essential tools, editors, and configurations for Node.js development.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Editor Setup</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">📝 Visual Studio Code (Recommended)</h4>
                            <p className="text-blue-700 dark:text-blue-300 mb-3">
                                VS Code is the most popular editor for Node.js development with excellent built-in support.
                            </p>
                            
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-3">
                                <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Essential VS Code Extensions</h5>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            <li>• <strong>Node.js Extension Pack</strong> - Complete Node.js support</li>
                                            <li>• <strong>ESLint</strong> - Code quality and error detection</li>
                                            <li>• <strong>Prettier</strong> - Code formatting</li>
                                            <li>• <strong>Auto Rename Tag</strong> - HTML/JSX tag editing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            <li>• <strong>GitLens</strong> - Enhanced Git integration</li>
                                            <li>• <strong>Thunder Client</strong> - API testing</li>
                                            <li>• <strong>Auto Import</strong> - Automatic import statements</li>
                                            <li>• <strong>Bracket Pair Colorizer</strong> - Better code readability</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Alternative Editors</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">⚛️</div>
                                    <h5 className="font-semibold text-gray-800 dark:text-white">WebStorm</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Full-featured IDE</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📝</div>
                                    <h5 className="font-semibold text-gray-800 dark:text-white">Sublime Text</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Lightweight and fast</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🔥</div>
                                    <h5 className="font-semibold text-gray-800 dark:text-white">Vim/Neovim</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Terminal-based</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Create Your First Project</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Step 1: Initialize Project</h4>
                            <CodeBlock code={`# Create a new project folder
mkdir my-first-node-app
cd my-first-node-app

# Initialize a new Node.js project
npm init

# Or use defaults (skip questions)
npm init -y

# This creates package.json file`} />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Step 2: Understanding package.json</h4>
                            <CodeBlock code={`{
  "name": "my-first-node-app",
  "version": "1.0.0",
  "description": "My first Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js",
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": ["nodejs", "javascript"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}`} />
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">Step 3: Create Main Application File</h4>
                            <CodeBlock code={`// Create index.js file
// This is your main application entry point

console.log('🚀 Starting my Node.js application...');

// Simple HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(\`
        <h1>Welcome to Node.js!</h1>
        <p>Your server is running successfully!</p>
        <p>Time: \${new Date()}</p>
    \`);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(\`🌐 Server running at http://localhost:\${PORT}\`);
});`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Development Tools</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🔄 Nodemon (Auto-restart)</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                Automatically restart your application when files change during development.
                            </p>
                            <CodeBlock code={`# Install nodemon globally
npm install -g nodemon

# Or install locally in your project
npm install --save-dev nodemon

# Update package.json scripts
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}

# Run with auto-restart
npm run dev`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🐛 Node.js Debugger</h4>
                            <CodeBlock code={`# Run with built-in debugger
node --inspect index.js

# Run with debugger that breaks on first line
node --inspect-brk index.js

# Access debugger at: chrome://inspect in Chrome browser

# Add breakpoints in your code
debugger; // This will pause execution`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">📊 Environment Variables</h4>
                            <CodeBlock code={`# Create .env file for environment variables
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your-secret-api-key

# Install dotenv package
npm install dotenv

# Use in your application
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Project Structure Best Practices</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">📁 Recommended Folder Structure</h4>
                        <CodeBlock code={`my-node-app/
├── src/                    # Source code
│   ├── controllers/        # Route handlers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
├── tests/                 # Test files
├── public/                # Static files (CSS, JS, images)
├── uploads/               # File uploads
├── node_modules/          # Dependencies (auto-generated)
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
└── README.md             # Project documentation`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Git Setup</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">📋 Create .gitignore</h4>
                            <CodeBlock code={`# Create .gitignore file to exclude unnecessary files

# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local
.env.development
.env.production

# Build outputs
dist/
build/

# Logs
logs/
*.log

# Runtime data
pids/
*.pid

# Coverage directory used by tools like istanbul
coverage/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
Thumbs.db`} />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">🔧 Initialize Git Repository</h4>
                            <CodeBlock code={`# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Basic Node.js setup"

# Connect to remote repository (optional)
git remote add origin https://github.com/username/my-node-app.git
git branch -M main
git push -u origin main`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Testing Your Setup</h2>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">✅ Verification Checklist</h4>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <div>
                                    <strong>Run your application:</strong>
                                    <CodeBlock code={`npm start
# or
npm run dev`} />
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <div>
                                    <strong>Visit in browser:</strong>
                                    <p className="text-sm">Open <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">http://localhost:3000</code></p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <div>
                                    <strong>Test auto-restart:</strong>
                                    <p className="text-sm">Modify index.js and save - nodemon should restart automatically</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Environment Ready! 🎉</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Code editor configured with essential extensions</li>
                        <li>• Project initialized with proper folder structure</li>
                        <li>• Development tools (nodemon, debugger) set up</li>
                        <li>• Git repository initialized with proper .gitignore</li>
                        <li>• Environment variables and configuration ready</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Next Step:</strong> Let&apos;s dive into Node.js basics and start building amazing applications!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeJSEnvironmentSetup;