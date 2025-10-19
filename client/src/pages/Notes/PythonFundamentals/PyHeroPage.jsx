import { Link } from 'react-router-dom';
import { FiCode, FiBookOpen, FiLayers, FiChevronRight } from 'react-icons/fi';
import CodeBlock from '../components/CodeBlock';

const PyHeroPage = () => {
    const features = [
        {
            icon: <FiCode className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Beginner Friendly',
            description: 'Start from zero and build your Python skills step-by-step with clear explanations and examples.'
        },
        {
            icon: <FiBookOpen className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Practical Examples',
            description: 'Learn through hands-on examples that demonstrate real-world Python applications.'
        },
        {
            icon: <FiLayers className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Complete Coverage',
            description: 'Master Python fundamentals including syntax, data structures, OOP, and advanced concepts.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Learn <span className="text-primary-600 dark:text-primary-400">Python</span> Programming
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    Master Python from basics to advanced topics with our comprehensive guide. Perfect for beginners and those looking to strengthen their Python foundation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/notes/python/introduction-to-python"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200"
                    >
                        Start Learning
                        <FiChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/notes/python/variables-&-data-types"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Explore Basics
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    Why Learn Python?
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
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Your First Python Program</h3>
                    <CodeBlock
                        code={`# Welcome to Python!
print("Hello, World!")

# Variables and Data Types
name = "Python Learner"
age = 25
is_learning = True

# Function Example
def greet(person_name):
    return f"Hello, {person_name}! Welcome to Python."

# Using the function
message = greet(name)
print(message)

# Lists and Loops
favorite_languages = ["Python", "JavaScript", "Java"]
for language in favorite_languages:
    print(f"I love {language}!")`}
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                        This example shows Python&apos;s clean syntax, variables, functions, and basic data structures!
                    </p>
                </div>
            </section>

            {/* Python Applications Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Can You Build with Python?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Web Development</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Build powerful web applications using frameworks like Django, Flask, and FastAPI.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Data Science & AI</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Analyze data and build machine learning models with NumPy, Pandas, and TensorFlow.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Automation</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Automate repetitive tasks, web scraping, and create powerful scripts to boost productivity.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Desktop Apps</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Create desktop applications using Tkinter, PyQt, or modern frameworks like Kivy.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PyHeroPage;