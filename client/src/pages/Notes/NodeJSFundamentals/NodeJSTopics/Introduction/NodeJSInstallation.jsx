/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const NodeJSInstallation = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className='text-primary-600 dark:text-primary-400'>Node.js</span> Installation
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Installing Node.js is the first step to start building server-side applications with JavaScript. 
                    This guide will walk you through different installation methods for Windows, macOS, and Linux.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Gets Installed?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            When you install Node.js, you get two main tools: Node.js runtime (to run JavaScript) 
                            and NPM (Node Package Manager) to install additional packages.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🟢 Node.js Runtime</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Executes JavaScript code outside the browser. Includes V8 engine and built-in modules.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">📦 NPM (Package Manager)</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                Tool to install, update, and manage JavaScript packages from the NPM registry.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Installation Methods</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Method 1: Official Website (Recommended)</h3>
                            
                            <div className="space-y-4">
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Step 1: Download Node.js</h4>
                                    <ol className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                                        <li>1. Visit <a href="https://nodejs.org" className="underline">nodejs.org</a></li>
                                        <li>2. Choose <strong>LTS version</strong> (Long Term Support) - more stable</li>
                                        <li>3. Download the installer for your operating system</li>
                                        <li>4. Run the downloaded installer file</li>
                                    </ol>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">LTS vs Current Version</h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <strong className="text-blue-700 dark:text-blue-300">LTS (Recommended)</strong>
                                            <ul className="text-blue-600 dark:text-blue-400 mt-2">
                                                <li>• Stable and reliable</li>
                                                <li>• Long-term support</li>
                                                <li>• Perfect for production</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <strong className="text-blue-700 dark:text-blue-300">Current</strong>
                                            <ul className="text-blue-600 dark:text-blue-400 mt-2">
                                                <li>• Latest features</li>
                                                <li>• Experimental features</li>
                                                <li>• For testing new features</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Method 2: Package Managers</h3>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🪟 Windows (Chocolatey)</h4>
                                    <CodeBlock code={`# Install Chocolatey first (if not installed)
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs

# Verify installation
node --version
npm --version`} />
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🍎 macOS (Homebrew)</h4>
                                    <CodeBlock code={`# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version`} />
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🐧 Linux (Ubuntu/Debian)</h4>
                                    <CodeBlock code={`# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# For latest version, use NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Verify Installation</h2>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Check Versions</h4>
                        <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                            Open your terminal/command prompt and run these commands to verify the installation:
                        </p>
                        <CodeBlock code={`# Check Node.js version
node --version
# Output: v18.17.0 (or your installed version)

# Check NPM version  
npm --version
# Output: 9.6.7 (or your installed version)

# Test Node.js with a simple command
node -e "console.log('Node.js is working!')"
# Output: Node.js is working!`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Create Your First File</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Step 1: Create a JavaScript File</h4>
                            <CodeBlock code={`// Create a new file called 'hello.js'
// Add this content:

console.log('Hello, Node.js!');
console.log('Welcome to server-side JavaScript!');

const name = 'Developer';
console.log(\`Hello, \${name}! Node.js is awesome!\`);`} />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Step 2: Run the File</h4>
                            <CodeBlock code={`# Navigate to the folder containing hello.js
cd path/to/your/file

# Run the JavaScript file with Node.js
node hello.js

# Expected output:
# Hello, Node.js!
# Welcome to server-side JavaScript!
# Hello, Developer! Node.js is awesome!`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Installation Issues</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">❌ Command Not Found</h4>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                If you get "node: command not found" error:
                            </p>
                            <ul className="text-red-600 dark:text-red-400 text-sm space-y-1">
                                <li>• Restart your terminal/command prompt</li>
                                <li>• Check if Node.js is added to your PATH environment variable</li>
                                <li>• Try reinstalling Node.js</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-3">⚠️ Permission Issues (Linux/macOS)</h4>
                            <CodeBlock code={`# If you get permission errors with npm:
# Option 1: Use a Node version manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Option 2: Change npm default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH`} />
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Installation Complete! 🎉</h3>
                    <ul className="text-green-700 dark:text-green-300 space-y-2">
                        <li>• Node.js runtime is installed and ready to execute JavaScript</li>
                        <li>• NPM is available for installing packages and managing dependencies</li>
                        <li>• You can run JavaScript files directly from the command line</li>
                        <li>• Your development environment is set up for Node.js projects</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-800 rounded">
                        <strong>Next Step:</strong> Let&apos;s set up your development environment and create your first Node.js project!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeJSInstallation;