import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
/* eslint-disable react/no-unescaped-entities */

const FileSystem = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Node.js <span className='text-primary-600 dark:text-primary-400'>File System</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The File System (fs) module is one of Node.js's most powerful features, allowing you to interact with files and directories on your computer. 
                    You can read, write, create, and delete files programmatically using JavaScript.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is the File System Module?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            The fs module provides an API for interacting with the file system. It allows you to perform operations like 
                            reading files, writing files, creating directories, and much more - all from your Node.js applications.
                        </p>
                    </div>
                    
                    <CodeBlock code={`// Import the file system module
const fs = require('fs');

// Or use ES6 import (with type: "module" in package.json)
import fs from 'fs';

// For promises-based operations
const fsPromises = require('fs').promises;`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Reading Files</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">📖 Synchronous Reading (Blocking)</h4>
                            <p className="text-green-700 dark:text-green-300 mb-3">
                                Synchronous operations block the execution until the operation completes.
                            </p>
                            <CodeBlock code={`const fs = require('fs');

try {
    // Read file synchronously
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File contents:', data);
} catch (error) {
    console.error('Error reading file:', error.message);
}

console.log('This runs after file is read');`} />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">⚡ Asynchronous Reading (Non-blocking)</h4>
                            <p className="text-blue-700 dark:text-blue-300 mb-3">
                                Asynchronous operations don't block execution. Code continues running while the file is being read.
                            </p>
                            <CodeBlock code={`const fs = require('fs');

// Callback-based approach
fs.readFile('example.txt', 'utf8', (error, data) => {
    if (error) {
        console.error('Error reading file:', error.message);
        return;
    }
    console.log('File contents:', data);
});

console.log('This runs immediately, before file is read');

// Promise-based approach
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf8');
        console.log('File contents:', data);
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

readFileAsync();`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Writing Files</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">✍️ Creating and Writing Files</h4>
                            <CodeBlock code={`const fs = require('fs');

// Synchronous write (overwrites existing file)
try {
    fs.writeFileSync('output.txt', 'Hello from Node.js!');
    console.log('File written successfully');
} catch (error) {
    console.error('Error writing file:', error.message);
}

// Asynchronous write with callback
const content = 'This is new content\\nSecond line here';
fs.writeFile('async-output.txt', content, 'utf8', (error) => {
    if (error) {
        console.error('Error writing file:', error.message);
        return;
    }
    console.log('File written successfully');
});

// Promise-based write
async function writeFileAsync() {
    try {
        await fsPromises.writeFile('promise-output.txt', 'Promise-based content');
        console.log('File written with promises');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

writeFileAsync();`} />
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">➕ Appending to Files</h4>
                            <CodeBlock code={`const fs = require('fs');

// Append content to existing file (creates file if it doesn't exist)
fs.appendFile('log.txt', '\\nNew log entry: ' + new Date(), (error) => {
    if (error) {
        console.error('Error appending to file:', error.message);
        return;
    }
    console.log('Content appended successfully');
});

// Synchronous append
try {
    fs.appendFileSync('sync-log.txt', '\\nSync log entry: ' + new Date());
    console.log('Content appended synchronously');
} catch (error) {
    console.error('Error:', error.message);
}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Directories</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                            <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">📁 Directory Operations</h4>
                            <CodeBlock code={`const fs = require('fs');
const path = require('path');

// Create directory
fs.mkdir('new-folder', (error) => {
    if (error) {
        console.error('Error creating directory:', error.message);
        return;
    }
    console.log('Directory created successfully');
});

// Create nested directories
fs.mkdir('parent/child/grandchild', { recursive: true }, (error) => {
    if (error) {
        console.error('Error creating nested directories:', error.message);
        return;
    }
    console.log('Nested directories created');
});

// Read directory contents
fs.readdir('.', (error, files) => {
    if (error) {
        console.error('Error reading directory:', error.message);
        return;
    }
    console.log('Files in current directory:', files);
});

// Remove directory (must be empty)
fs.rmdir('empty-folder', (error) => {
    if (error) {
        console.error('Error removing directory:', error.message);
        return;
    }
    console.log('Directory removed successfully');
});`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">File and Directory Information</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                            <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-3">📊 Getting File Stats</h4>
                            <CodeBlock code={`const fs = require('fs');

// Get file/directory information
fs.stat('example.txt', (error, stats) => {
    if (error) {
        console.error('Error getting file stats:', error.message);
        return;
    }
    
    console.log('File Stats:');
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
});

// Check if file exists
fs.access('example.txt', fs.constants.F_OK, (error) => {
    if (error) {
        console.log('File does not exist');
        return;
    }
    console.log('File exists');
});

// Synchronous version
try {
    const stats = fs.statSync('example.txt');
    console.log('File size:', stats.size, 'bytes');
} catch (error) {
    console.log('File does not exist or error:', error.message);
}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Examples</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">📝 Simple Log File Manager</h4>
                            <CodeBlock code={`const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFile = 'app.log') {
        this.logFile = logFile;
        this.ensureLogFile();
    }
    
    ensureLogFile() {
        // Create log file if it doesn't exist
        if (!fs.existsSync(this.logFile)) {
            fs.writeFileSync(this.logFile, '--- Log Started ---\\n');
        }
    }
    
    log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = \`[\${timestamp}] \${message}\\n\`;
        
        fs.appendFile(this.logFile, logEntry, (error) => {
            if (error) {
                console.error('Failed to write log:', error.message);
            }
        });
    }
    
    readLogs() {
        try {
            const logs = fs.readFileSync(this.logFile, 'utf8');
            return logs;
        } catch (error) {
            console.error('Failed to read logs:', error.message);
            return null;
        }
    }
}

// Usage
const logger = new Logger();
logger.log('Application started');
logger.log('User logged in');

console.log('All logs:');
console.log(logger.readLogs());`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">📋 File Copy Utility</h4>
                            <CodeBlock code={`const fs = require('fs');
const path = require('path');

function copyFile(source, destination) {
    return new Promise((resolve, reject) => {
        // Check if source file exists
        if (!fs.existsSync(source)) {
            reject(new Error('Source file does not exist'));
            return;
        }
        
        // Create destination directory if it doesn't exist
        const destDir = path.dirname(destination);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy file
        fs.copyFile(source, destination, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(\`File copied from \${source} to \${destination}\`);
        });
    });
}

// Usage
async function copyExample() {
    try {
        const result = await copyFile('source.txt', 'backup/source-copy.txt');
        console.log(result);
    } catch (error) {
        console.error('Copy failed:', error.message);
    }
}

copyExample();`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🗂️ Directory Scanner</h4>
                            <CodeBlock code={`const fs = require('fs');
const path = require('path');

function scanDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, { withFileTypes: true }, (error, entries) => {
            if (error) {
                reject(error);
                return;
            }
            
            const result = {
                files: [],
                directories: [],
                total: entries.length
            };
            
            entries.forEach(entry => {
                if (entry.isFile()) {
                    result.files.push(entry.name);
                } else if (entry.isDirectory()) {
                    result.directories.push(entry.name);
                }
            });
            
            resolve(result);
        });
    });
}

// Usage
async function scanCurrentDirectory() {
    try {
        const scan = await scanDirectory('.');
        console.log('Directory Scan Results:');
        console.log('Files:', scan.files);
        console.log('Directories:', scan.directories);
        console.log('Total items:', scan.total);
    } catch (error) {
        console.error('Scan failed:', error.message);
    }
}

scanCurrentDirectory();`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices and Tips</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">✅ Do's</h4>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                                <li>• Use asynchronous methods for better performance</li>
                                <li>• Always handle errors with try-catch or error callbacks</li>
                                <li>• Use path.join() for cross-platform file paths</li>
                                <li>• Check if files exist before operating on them</li>
                                <li>• Use streams for large files to avoid memory issues</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">❌ Don'ts</h4>
                            <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                                <li>• Avoid synchronous methods in production (they block the event loop)</li>
                                <li>• Don't ignore error handling</li>
                                <li>• Don't hard-code file paths (use path module)</li>
                                <li>• Don't read very large files into memory all at once</li>
                                <li>• Don't forget to specify encoding when reading text files</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">File System Mastery! 📁</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Read and write files both synchronously and asynchronously</li>
                        <li>• Create, read, and manage directories programmatically</li>
                        <li>• Get detailed information about files and directories</li>
                        <li>• Handle errors gracefully in file operations</li>
                        <li>• Build practical utilities like loggers and file managers</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Next Step:</strong> Learn about Node.js Path module to work with file paths more effectively!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileSystem;