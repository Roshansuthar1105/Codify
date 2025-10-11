import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Dictionaries = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Dictionaries</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Dictionaries are like real-world dictionaries where you look up a word (key) to find its meaning (value). 
                    They store data in key-value pairs and are perfect for organizing related information.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Dictionary?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A dictionary stores data as key-value pairs. Keys are unique identifiers, and values are the data you want to store.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Creating a dictionary
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print(student)  # {'name': 'Alice', 'age': 20, 'grade': 'A'}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Creating Dictionaries</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Method 1: Using Curly Braces {}</h4>
                            <CodeBlock code={`# Empty dictionary
empty_dict = {}

# Dictionary with data
person = {"name": "John", "age": 25}
print(person)  # {'name': 'John', 'age': 25}`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Method 2: Using dict() Function</h4>
                            <CodeBlock code={`# Using dict() function
person = dict(name="John", age=25)
print(person)  # {'name': 'John', 'age': 25}

# From a list of tuples
pairs = [("name", "John"), ("age", 25)]
person = dict(pairs)
print(person)  # {'name': 'John', 'age': 25}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Accessing Dictionary Values</h2>
                    
                    <CodeBlock code={`student = {"name": "Alice", "age": 20, "grade": "A"}

# Method 1: Using square brackets []
print(student["name"])  # Alice
print(student["age"])   # 20

# Method 2: Using get() method (safer)
print(student.get("name"))     # Alice
print(student.get("city"))     # None (doesn't exist)
print(student.get("city", "Unknown"))  # Unknown (default value)`} />
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">💡 Tip</h3>
                        <p className="text-yellow-700 dark:text-yellow-300">
                            Use <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">get()</code> method to avoid errors when a key doesn&apos;t exist.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Adding and Updating Values</h2>
                    
                    <CodeBlock code={`student = {"name": "Alice", "age": 20}

# Adding new key-value pair
student["grade"] = "A"
student["city"] = "New York"

# Updating existing value
student["age"] = 21

print(student)
# {'name': 'Alice', 'age': 21, 'grade': 'A', 'city': 'New York'}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Removing Items from Dictionary</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Using del keyword</h4>
                            <CodeBlock code={`student = {"name": "Alice", "age": 20, "grade": "A"}

del student["grade"]
print(student)  # {'name': 'Alice', 'age': 20}`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Using pop() method</h4>
                            <CodeBlock code={`student = {"name": "Alice", "age": 20, "grade": "A"}

removed_grade = student.pop("grade")
print(removed_grade)  # A
print(student)        # {'name': 'Alice', 'age': 20}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Dictionary Methods</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Getting Keys and Values</h3>
                            <CodeBlock code={`student = {"name": "Alice", "age": 20}

# Get all keys
keys = student.keys()
print(list(keys))  # ['name', 'age']

# Get all values
values = student.values()
print(list(values))  # ['Alice', 20]

# Get key-value pairs
items = student.items()
print(list(items))  # [('name', 'Alice'), ('age', 20)]`} />
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">Other Useful Methods</h3>
                            <CodeBlock code={`student = {"name": "Alice", "age": 20}

# Check if key exists
print("name" in student)  # True
print("grade" in student)  # False

# Get length
print(len(student))  # 2

# Clear all items
student.clear()
print(student)  # {}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Looping Through Dictionaries</h2>
                    
                    <CodeBlock code={`student = {"name": "Alice", "age": 20, "grade": "A"}

# Loop through keys
for key in student:
    print(key)  # name, age, grade

# Loop through values
for value in student.values():
    print(value)  # Alice, 20, A

# Loop through key-value pairs
for key, value in student.items():
    print(f"{key}: {value}")
# name: Alice
# age: 20
# grade: A`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Nested Dictionaries</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can store dictionaries inside dictionaries to organize complex data.
                    </p>
                    
                    <CodeBlock code={`# Dictionary containing other dictionaries
students = {
    "student1": {"name": "Alice", "grade": "A"},
    "student2": {"name": "Bob", "grade": "B"},
    "student3": {"name": "Charlie", "grade": "A"}
}

# Accessing nested values
print(students["student1"]["name"])  # Alice
print(students["student2"]["grade"])  # B

# Adding to nested dictionary
students["student1"]["age"] = 20
print(students["student1"])  # {'name': 'Alice', 'grade': 'A', 'age': 20}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-World Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 1: Contact Book</h4>
                            <CodeBlock code={`contacts = {
    "John": "123-456-7890",
    "Alice": "987-654-3210",
    "Bob": "555-123-4567"
}

# Add new contact
contacts["Charlie"] = "111-222-3333"

# Look up a contact
name = "Alice"
if name in contacts:
    print(f"{name}: {contacts[name]}")  # Alice: 987-654-3210`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 2: Word Counter</h4>
                            <CodeBlock code={`text = "hello world hello python"
words = text.split()

word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print(word_count)  # {'hello': 2, 'world': 1, 'python': 1}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Dictionary vs List vs Tuple</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Dictionary</h4>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• Key-value pairs</li>
                                    <li>• Unordered</li>
                                    <li>• Mutable</li>
                                    <li>• No duplicates</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">List</h4>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• Indexed items</li>
                                    <li>• Ordered</li>
                                    <li>• Mutable</li>
                                    <li>• Allows duplicates</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Tuple</h4>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• Indexed items</li>
                                    <li>• Ordered</li>
                                    <li>• Immutable</li>
                                    <li>• Allows duplicates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Dictionary Operations</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Create:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">my_dict = {'{'}&quot;key&quot;: &quot;value&quot;{'}'}</code>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Access:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">my_dict[&quot;key&quot;]</code> or <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">my_dict.get(&quot;key&quot;)</code>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Add/Update:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">my_dict[&quot;key&quot;] = &quot;new_value&quot;</code>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Remove:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">del my_dict[&quot;key&quot;]</code> or <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">my_dict.pop(&quot;key&quot;)</code>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Check:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">&quot;key&quot; in my_dict</code>
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Dictionaries store data as key-value pairs</li>
                        <li>• Keys must be unique and immutable (strings, numbers, tuples)</li>
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">get()</code> method for safe access</li>
                        <li>• Dictionaries are mutable - you can change them after creation</li>
                        <li>• Perfect for storing related information about objects</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Create a student grade book dictionary and practice adding, updating, and accessing student information!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dictionaries;