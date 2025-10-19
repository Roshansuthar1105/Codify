import React from 'react';

const PyIntroduction = () => {
    const pythonFeatures = [
        {
            title: "Easy to Learn",
            description: "Python has a simple, readable syntax that makes it perfect for beginners"
        },
        {
            title: "Versatile",
            description: "Used in web development, data science, AI, automation, and more"
        },
        {
            title: "Large Community",
            description: "Extensive libraries and active community support"
        },
        {
            title: "Cross-Platform",
            description: "Runs on Windows, macOS, Linux, and other operating systems"
        }
    ];

    const pythonHistory = [
        {
            version: "Python 1.0",
            year: 1994,
            features: "First major release with core functionality"
        },
        {
            version: "Python 2.0",
            year: 2000,
            features: "List comprehensions, garbage collection"
        },
        {
            version: "Python 3.0",
            year: 2008,
            features: "Modern Python with improved syntax and Unicode support"
        },
        {
            version: "Python 3.12",
            year: 2023,
            features: "Latest version with performance improvements"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Introduction to <span className='text-primary-600 dark:text-primary-400'>Python</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Welcome to your Python learning journey! Python is a high-level, interpreted programming language 
                    created by Guido van Rossum and first released in 1991. Named after the British comedy group 
                    &quot;Monty Python,&quot; it emphasizes code readability and simplicity.
                </p>

                <div className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Fun Fact:</strong> Python is one of the most popular programming languages in the world and is the language of choice for many tech giants like Google, Netflix, and Instagram!
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Choose Python?</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python&apos;s philosophy is summarized in &quot;The Zen of Python&quot; - Beautiful is better than ugly, 
                        Simple is better than complex, and Readability counts. Here&apos;s why Python is perfect for beginners and experts alike:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {pythonFeatures.map((feature, index) => (
                            <div key={index} className='bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors'>
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">{feature.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Python&apos;s Evolution</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python has evolved significantly since its creation. Here&apos;s a brief timeline of major versions:
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-900 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-950">
                                <tr className='border-b border-gray-200 dark:border-gray-600'>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Version</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Year</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Key Features</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {pythonHistory.map((rowData) => (
                                    <tr key={rowData.version} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.version}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.year}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.features}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Can You Do with Python?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">🌐 Web Development</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Build powerful web applications with Django, Flask, and FastAPI
                                </p>
                            </div>
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">🤖 Artificial Intelligence</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Create AI and machine learning models with TensorFlow, PyTorch, and scikit-learn
                                </p>
                            </div>
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">🔧 Automation</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Automate repetitive tasks and create powerful scripts
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">📊 Data Science</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Analyze data and create visualizations with Pandas, NumPy, and Matplotlib
                                </p>
                            </div>
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">🖥️ Desktop Applications</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Create desktop apps with Tkinter, PyQt, and modern frameworks
                                </p>
                            </div>
                            <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 mb-2">🎮 Game Development</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Build games using Pygame and other game development libraries
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 mb-2">Ready to Start?</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        In the next sections, we&apos;ll cover Python installation, setting up your development environment, 
                        and writing your first Python programs. Let&apos;s begin this exciting journey together!
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PyIntroduction;