import CodeBlock from '../../../components/CodeBlock';

const RunningPythonCode = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Running <span className='text-primary-600 dark:text-primary-400'>Python Code</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    After installing Python, you need to know how to run your code. There are simple ways to do this. 
                    Let&apos;s learn the easiest methods step by step.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Interactive Mode (Python Shell)</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This is like a calculator where you can type Python commands and see results immediately. 
                        Perfect for beginners to test small pieces of code.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">How to Start</h3>
                        <p className="text-blue-700 dark:text-blue-300 mb-3">Open your terminal or command prompt and type:</p>
                        <CodeBlock code={`python

# You will see something like this:
Python 3.12.0
>>> 

# The >>> means Python is ready for your commands`} />
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Simple Examples</h3>
                        <CodeBlock code={`# Try these simple commands:
>>> 5 + 3
8

>>> 10 * 2
20

>>> name = "John"
>>> print("Hello " + name)
Hello John

>>> 2 > 1
True`} />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Quick Tips</h3>
                        <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
                            <li>• Press Up Arrow to repeat previous commands</li>
                            <li>• Type exit() to quit</li>
                            <li>• Use help() for help</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Writing Python Files</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        For longer programs, you write code in files ending with .py and then run them.
                    </p>
                    
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Step 1: Create a File</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Make a new file called hello.py and write this:</p>
                        <CodeBlock code={`# hello.py
print("Hello World!")
print("My name is Python")

name = input("What is your name? ")
print("Nice to meet you, " + name)`} />
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Step 2: Run the File</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Open terminal in the same folder and type:</p>
                        <CodeBlock code={`python hello.py

# Your program will run and show:
# Hello World!
# My name is Python
# What is your name? 
# (You can type your name here)`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Using Code Editors</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Code editors make writing Python easier with colors and helpful features.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Visual Studio Code</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                                <li>• Free to use</li>
                                <li>• Easy for beginners</li>
                                <li>• Has Python support</li>
                            </ul>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs">
                                <strong>How to use:</strong><br/>
                                1. Download VS Code<br/>
                                2. Install Python extension<br/>
                                3. Open your .py file<br/>
                                4. Press F5 to run
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-3">IDLE (Comes with Python)</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                                <li>• Already installed with Python</li>
                                <li>• Simple to use</li>
                                <li>• Good for learning</li>
                            </ul>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs">
                                <strong>How to use:</strong><br/>
                                1. Search IDLE in your computer<br/>
                                2. File → New File<br/>
                                3. Write your code<br/>
                                4. Press F5 to run
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Online Python (No Installation Needed)</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can also run Python in your web browser without installing anything.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Replit</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Easy online coding</p>
                            <p className="text-xs text-gray-500">replit.com</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Python.org</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Official Python shell</p>
                            <p className="text-xs text-gray-500">python.org/shell</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                            <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Google Colab</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">For advanced users</p>
                            <p className="text-xs text-gray-500">colab.research.google.com</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Your First Simple Program</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Let&apos;s create a simple program to practice:
                    </p>
                    
                    <CodeBlock code={`# simple_program.py
print("Welcome to Python!")
print("Let's do some math")

# Ask user for two numbers
num1 = input("Enter first number: ")
num2 = input("Enter second number: ")

# Convert to numbers and add
result = int(num1) + int(num2)

# Show the result
print("The sum is: " + str(result))
print("Thanks for using Python!")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Common Problems and Solutions</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Common Problems</h3>
                            <div className="space-y-2 text-red-700 dark:text-red-300">
                                <p><strong>Problem:</strong> &quot;python is not recognized&quot;</p>
                                <p><strong>Solution:</strong> Python is not installed properly</p>
                                <br/>
                                <p><strong>Problem:</strong> File not found</p>
                                <p><strong>Solution:</strong> Make sure you are in the right folder</p>
                            </div>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Quick Fixes</h3>
                            <div className="space-y-2 text-green-700 dark:text-green-300">
                                <p><strong>Check if Python works:</strong> Type python --version</p>
                                <p><strong>Check your location:</strong> Type dir (Windows) or ls (Mac/Linux)</p>
                                <p><strong>Try using:</strong> python3 instead of python</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Practice Time!</h3>
                    <div className="space-y-2 text-blue-700 dark:text-blue-300">
                        <p><strong>Easy:</strong> Make a program that says &quot;Hello&quot; and asks for your age</p>
                        <p><strong>Medium:</strong> Create a calculator that adds two numbers</p>
                        <p><strong>Fun:</strong> Write a program that tells jokes</p>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 mt-4 font-medium">
                        Start with the interactive mode, then try making files!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RunningPythonCode;