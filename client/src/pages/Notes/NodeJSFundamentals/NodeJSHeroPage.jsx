import { Link } from 'react-router-dom';
import { FiCode, FiBookOpen, FiLayers, FiChevronRight } from 'react-icons/fi';
import CodeBlock from '../components/CodeBlock';

const NodeJSHeroPage = () => {
    const features = [
        {
            icon: <FiCode className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Server-Side JavaScript',
            description: 'Learn to build powerful server applications using JavaScript with Node.js runtime environment.'
        },
        {
            icon: <FiBookOpen className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Real-World Projects',
            description: 'Build APIs, web servers, and full-stack applications with practical, hands-on examples.'
        },
        {
            icon: <FiLayers className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Complete Ecosystem',
            description: 'Master Node.js fundamentals, Express.js, databases, authentication, and deployment strategies.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Learn <span className="text-primary-600 dark:text-primary-400">Node.js</span> Development
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    Master backend JavaScript development with Node.js — build scalable web servers, REST APIs, and microservices from scratch to production.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/notes/nodejs/introduction-to-node.js"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200"
                    >
                        Start Learning
                        <FiChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/notes/nodejs/modules-and-npm"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Explore Basics
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    Why Learn Node.js?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Start Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Start</h2>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Your First Node.js Server</h3>
                    <CodeBlock
                        code={`// Import the HTTP module
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello, Node.js World!</h1>');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(\`Server running at http://localhost:\${PORT}/\`);
});

// Using Express.js (Popular Framework)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Node.js!' });
});

app.listen(PORT, () => {
    console.log(\`Express server running on port \${PORT}\`);
});`}
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                        This example shows how to create a simple HTTP server and an Express.js app in Node.js!
                    </p>
                </div>
            </section>

            {/* Node.js Applications Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Can You Build with Node.js?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Web APIs & Microservices</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Build scalable REST APIs, GraphQL endpoints, and microservices architectures using Express.js and Fastify.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Real-Time Applications</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Develop chat apps, live dashboards, and collaborative tools using WebSockets and Socket.io.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Command Line Tools</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Create CLI tools and automation scripts that simplify developer workflows, publishable on NPM.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Full-Stack Applications</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Build complete web apps with authentication, databases, and deployment strategies using Node.js and Express.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NodeJSHeroPage;
