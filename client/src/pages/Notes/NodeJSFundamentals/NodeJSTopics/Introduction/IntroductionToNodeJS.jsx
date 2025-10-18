import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
/* eslint-disable react/no-unescaped-entities */

const IntroductionToNodeJS = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Introduction to <span className='text-primary-600 dark:text-primary-400'>Node.js</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Node.js is a powerful JavaScript runtime that lets you run JavaScript on the server side. 
                    Think of it as bringing JavaScript outside the browser to build web servers, APIs, and desktop applications.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is Node.js?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to execute 
                            JavaScript code outside of a web browser, making it perfect for server-side development.
                        </p>
                    </div>
                    
                    <CodeBlock code={`// Your first Node.js program
console.log("Hello, Node.js!");
console.log("JavaScript running on the server!");

// This runs in terminal, not browser!`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Node.js?</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">⚡ Fast & Efficient</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                                <li>• Built on Google's V8 engine (super fast)</li>
                                <li>• Non-blocking I/O operations</li>
                                <li>• Event-driven architecture</li>
                                <li>• Single-threaded but highly scalable</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🛠️ Developer Friendly</h3>
                            <ul className="space-y-2 text-purple-700 dark:text-purple-300 text-sm">
                                <li>• Same language for frontend and backend</li>
                                <li>• Huge package ecosystem (NPM)</li>
                                <li>• Active community support</li>
                                <li>• Cross-platform compatibility</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Can You Build?</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🌐 Web Applications</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                Build dynamic websites and web applications with frameworks like Express.js
                            </p>
                            <CodeBlock code={`// Simple web server
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello from Node.js Server!</h1>');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🔌 APIs & Microservices</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                Create RESTful APIs and microservices for mobile apps and web applications
                            </p>
                            <CodeBlock code={`// Simple API endpoint
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];
    res.json(users);
});`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Features</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">🔄 Event-Driven Programming</h4>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                                Node.js uses events to handle operations, making it very efficient for I/O operations.
                            </p>
                            <CodeBlock code={`// Event-driven example
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listen for an event
emitter.on('message', (data) => {
    console.log('Received:', data);
});

// Trigger the event
emitter.emit('message', 'Hello Node.js!');`} />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">📦 NPM Package Manager</h4>
                            <p className="text-blue-700 dark:text-blue-300 mb-3">
                                Access to millions of packages to add functionality to your applications quickly.
                            </p>
                            <CodeBlock code={`// Install packages with NPM
npm install express        // Web framework
npm install mongoose       // MongoDB integration
npm install axios         // HTTP client

// Use installed packages
const express = require('express');
const app = express();`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Node.js vs Browser JavaScript</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🌐 Browser JavaScript</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li>• Runs in web browsers</li>
                                    <li>• Has DOM and window objects</li>
                                    <li>• Limited file system access</li>
                                    <li>• Sandboxed environment</li>
                                    <li>• Client-side only</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">🖥️ Node.js JavaScript</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li>• Runs on servers/computers</li>
                                    <li>• Has global and process objects</li>
                                    <li>• Full file system access</li>
                                    <li>• Can access databases</li>
                                    <li>• Server-side development</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Popular Companies Using Node.js</h2>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">📺</div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">Netflix</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Streaming platform</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">🚗</div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">Uber</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ride-sharing app</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">💬</div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">WhatsApp</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Messaging platform</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Getting Started</h2>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Your Learning Path</h4>
                        <ol className="space-y-2 text-green-700 dark:text-green-300">
                            <li><strong>1. Install Node.js</strong> - Download and set up Node.js on your computer</li>
                            <li><strong>2. Learn the Basics</strong> - Understand modules, file system, and core concepts</li>
                            <li><strong>3. Build Web Apps</strong> - Start with Express.js framework</li>
                            <li><strong>4. Work with Databases</strong> - Connect to MongoDB or SQL databases</li>
                            <li><strong>5. Deploy Your Apps</strong> - Learn to deploy applications to production</li>
                        </ol>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-green-700 dark:text-green-300 space-y-2">
                        <li>• Node.js brings JavaScript to server-side development</li>
                        <li>• It is fast, scalable, and has a huge ecosystem (NPM)</li>
                        <li>• Perfect for building APIs, web applications, and real-time apps</li>
                        <li>• Same language for both frontend and backend development</li>
                        <li>• Event-driven and non-blocking I/O makes it very efficient</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-800 rounded">
                        <strong>Next Step:</strong> Let&apos;s install Node.js on your computer and create your first application!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroductionToNodeJS;