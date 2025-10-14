import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const VariablesDataTypes = () => {
    const dataTypes = [
        {
            type: "int",
            description: "Integer numbers (whole numbers)",
            example: "age = 25",
            output: "25"
        },
        {
            type: "float",
            description: "Decimal numbers",
            example: "price = 19.99",
            output: "19.99"
        },
        {
            type: "str",
            description: "Text strings",
            example: "name = \"Alice\"",
            output: "Alice"
        },
        {
            type: "bool",
            description: "True or False values",
            example: "is_student = True",
            output: "True"
        },
        {
            type: "list",
            description: "Ordered collection of items",
            example: "fruits = [\"apple\", \"banana\"]",
            output: "[&apos;apple&apos;, &apos;banana&apos;]"
        },
        {
            type: "dict",
            description: "Key-value pairs",
            example: "person = {\"name\": \"Bob\", \"age\": 30}",
            output: "{&apos;name&apos;: &apos;Bob&apos;, &apos;age&apos;: 30}"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Variables & Data Types</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Variables are containers that store data values. In Python, you don&apos;t need to declare the type of a variable 
                    explicitly - Python automatically determines the type based on the value you assign.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Creating Variables</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Creating variables in Python is simple - just assign a value using the equals sign (=):
                    </p>
                    <CodeBlock code={`# Creating variables
x = 10        # integer
y = 3.14      # float  
name = "Alex" # string
is_active = True  # boolean

# You can print variables
print(x)       # Output: 10
print(name)    # Output: Alex
print(type(x)) # Output: <class 'int'>`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Python Data Types</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python has several built-in data types. Here are the most common ones:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Output</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {dataTypes.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">{item.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.description}</td>
                                        <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{item.example}</td>
                                        <td className="px-4 py-3 text-sm font-mono text-gray-500 dark:text-gray-500">{item.output}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Numbers</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python supports integers and floating-point numbers. You can perform mathematical operations on them:
                    </p>
                    <CodeBlock code={`# Integer and float examples
age = 25          # int
height = 5.9      # float
temperature = -10 # negative int

# Mathematical operations
a = 10
b = 3

print(a + b)    # Addition: 13
print(a - b)    # Subtraction: 7
print(a * b)    # Multiplication: 30
print(a / b)    # Division: 3.333...
print(a // b)   # Floor division: 3
print(a % b)    # Modulo (remainder): 1
print(a ** b)   # Exponentiation: 1000`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Strings</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Strings are sequences of characters enclosed in quotes. You can use single or double quotes:
                    </p>
                    <CodeBlock code={`# String examples
name = "Alice"
message = 'Hello, World!'
multiline = """This is a
multi-line
string"""

# String operations
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # Concatenation
print(full_name)  # Output: John Doe

# String methods
text = "python programming"
print(text.upper())        # PYTHON PROGRAMMING
print(text.capitalize())   # Python programming
print(text.replace("python", "Python"))  # Python programming`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Boolean Values</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Booleans represent True or False values and are often used in conditions:
                    </p>
                    <CodeBlock code={`# Boolean examples
is_student = True
is_graduated = False
has_job = True

# Boolean operations
print(is_student and has_job)    # True (both are True)
print(is_student or is_graduated)  # True (at least one is True)
print(not is_graduated)          # True (opposite of False)

# Comparison operations return booleans
age = 20
print(age >= 18)    # True
print(age < 18)     # False`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Multiple Assignment</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python allows you to assign values to multiple variables in one line:
                    </p>
                    <CodeBlock code={`# Multiple assignment
x, y, z = 1, 2, 3
print(x, y, z)  # Output: 1 2 3

# Assign same value to multiple variables
a = b = c = 10
print(a, b, c)  # Output: 10 10 10

# Swapping variables
x, y = 5, 10
x, y = y, x  # Swap values
print(x, y)  # Output: 10 5`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Checking Variable Types</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can check the type of any variable using the type() function:
                    </p>
                    <CodeBlock code={`# Checking types
name = "Alice"
age = 25
height = 5.8
is_student = True

print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>

# You can also use isinstance()
print(isinstance(age, int))     # True
print(isinstance(name, str))    # True`} />
                </section>

                <div className={`bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-700`}>
                    <p className="text-yellow-700 dark:text-yellow-300">
                        <strong className="font-semibold">💡 Remember:</strong> Variable names should be descriptive and follow Python naming conventions. 
                        Use lowercase with underscores (snake_case) for variable names: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">user_name</code>, <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">total_price</code>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VariablesDataTypes;