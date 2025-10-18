import { Link } from 'react-router-dom';
import { FiCode, FiBookOpen, FiLayers, FiChevronRight } from 'react-icons/fi';
import CodeBlock from '../components/CodeBlock';

const TsHeroPage = () => {
    const features = [
        {
            icon: <FiCode className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Type Safety',
            description: 'Catch errors at compile time with TypeScript\'s powerful type system and static analysis.'
        },
        {
            icon: <FiBookOpen className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Modern JavaScript',
            description: 'Use the latest JavaScript features with full type support and enhanced developer experience.'
        },
        {
            icon: <FiLayers className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Scalable Development',
            description: 'Build large-scale applications with confidence using TypeScript\'s advanced type features.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Master TypeScript <span className="text-primary-600 dark:text-primary-400">Essentials</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    Learn TypeScript from the ground up with our comprehensive guide covering types, interfaces, generics, and more.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/notes/typescript/introduction"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200"
                    >
                        Get Started
                        <FiChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/notes/typescript/what-is-typescript"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Explore Topics
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    What You'll Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
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
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Try TypeScript in your browser</h3>
                    <CodeBlock
                        code={`// Welcome to TypeScript!
interface User {
    name: string;
    age: number;
    email?: string; // Optional property
}

const user: User = {
    name: "John Doe",
    age: 30
};

// Function with type annotations
function greetUser(user: User): string {
    return \`Hello, \${user.name}!\`;
}

console.log(greetUser(user)); // Output: Hello, John Doe!`}
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Copy and paste this code into the TypeScript playground to see it in action!
                    </p>
                </div>
            </section>

            {/* Learning Path Section */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    Learning Path
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Introduction</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Get started with TypeScript basics, installation, and configuration.
                        </p>
                        <Link 
                            to="/notes/typescript/introduction" 
                            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                        >
                            Start Learning →
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                            <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">TypeScript Basics</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Learn about type annotations, basic types, and type inference.
                        </p>
                        <Link 
                            to="/notes/typescript/what-is-typescript" 
                            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                        >
                            Start Learning →
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                            <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Types</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Master union types, generics, and utility types.
                        </p>
                        <Link 
                            to="/notes/typescript/union-types" 
                            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                        >
                            Start Learning →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TsHeroPage;
