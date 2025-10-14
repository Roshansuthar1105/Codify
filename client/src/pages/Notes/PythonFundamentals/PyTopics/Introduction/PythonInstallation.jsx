import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const PythonInstallation = () => {
    const installationSteps = {
        windows: [
            "Visit python.org and download the latest Python version",
            "Run the installer and check 'Add Python to PATH'",
            "Click 'Install Now' and wait for completion",
            "Open Command Prompt and type 'python --version' to verify"
        ],
        mac: [
            "Visit python.org and download the latest Python version",
            "Open the downloaded .pkg file and follow the installer",
            "Or use Homebrew: brew install python",
            "Open Terminal and type 'python3 --version' to verify"
        ],
        linux: [
            "Most Linux distributions come with Python pre-installed",
            "To install latest version: sudo apt update && sudo apt install python3",
            "For other distributions, use your package manager",
            "Type 'python3 --version' to verify installation"
        ]
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className='text-primary-600 dark:text-primary-400'>Python</span> Installation
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Before we start coding in Python, we need to install it on your computer. Python is available for 
                    Windows, macOS, and Linux. This guide will help you install Python and set up your development environment.
                </p>

                <div className={`mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700`}>
                    <p className="text-blue-700 dark:text-blue-300">
                        <strong className="font-semibold">💡 Quick Tip:</strong> Python 3.x is the current version and what we&apos;ll be using in this course. 
                        Python 2.x is no longer supported as of January 2020.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Installation by Operating System</h2>
                    
                    {/* Windows Installation */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">🪟 Windows</h3>
                        <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                {installationSteps.windows.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* macOS Installation */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">🍎 macOS</h3>
                        <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                {installationSteps.mac.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Linux Installation */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">🐧 Linux</h3>
                        <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                {installationSteps.linux.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Verifying Installation</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        After installation, let&apos;s verify that Python is installed correctly. Open your terminal or command prompt and run:
                    </p>
                    <CodeBlock code={`# Check Python version
python --version
# or on Mac/Linux
python3 --version

# You should see something like:
# Python 3.12.0`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Python Package Manager (pip)</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        pip comes pre-installed with Python 3.4+. It&apos;s used to install additional Python packages. Check if pip is installed:
                    </p>
                    <CodeBlock code={`# Check pip version
pip --version
# or
pip3 --version

# Install a package example
pip install requests`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Development Environment Options</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-primary-600 mb-3">🔤 Text Editors</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                <li>• VS Code (Recommended)</li>
                                <li>• Sublime Text</li>
                                <li>• Atom</li>
                                <li>• Vim/Neovim</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-primary-600 mb-3">🚀 IDEs</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                <li>• PyCharm</li>
                                <li>• IDLE (comes with Python)</li>
                                <li>• Jupyter Notebook</li>
                                <li>• Spyder</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your First Python Command</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Let&apos;s test Python with a simple command. Open your terminal/command prompt and type:
                    </p>
                    <CodeBlock code={`python -c "print('Hello, Python!')"
# or
python3 -c "print('Hello, Python!')"`} />
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                        If you see &quot;Hello, Python!&quot; printed, congratulations! Python is working correctly.
                    </p>
                </section>

                <div className={`bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-700`}>
                    <p className="text-green-700 dark:text-green-300">
                        <strong className="font-semibold">🎉 Success!</strong> You now have Python installed and ready to use. 
                        In the next section, we&apos;ll learn different ways to run Python code.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PythonInstallation;