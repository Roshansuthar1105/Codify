import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const StaticMethods = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Static Methods</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Static methods are special functions inside a class that work independently. 
                    They don&apos;t need access to the object (self) or class data. Think of them as helper functions.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Static Method?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A static method belongs to a class but works like a normal function. 
                            You can call it without creating an object.
                        </p>
                    </div>
                    
                    <CodeBlock code={`class Calculator:
    @staticmethod
    def add(x, y):
        return x + y
    
    @staticmethod
    def multiply(x, y):
        return x * y

# Call without creating object
result1 = Calculator.add(5, 3)      # 8
result2 = Calculator.multiply(4, 2) # 8
print(result1, result2)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Difference Between Method Types</h2>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Instance Method</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm">Uses self</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Class Method</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">Uses cls</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">Static Method</h3>
                            <p className="text-purple-700 dark:text-purple-300 text-sm">Uses neither</p>
                        </div>
                    </div>
                    
                    <CodeBlock code={`class Person:
    count = 0  # Class variable
    
    def __init__(self, name):
        self.name = name  # Instance variable
        Person.count += 1
    
    def greet(self):  # Instance method
        return f"Hi, I am {self.name}"
    
    @classmethod
    def get_count(cls):  # Class method
        return f"Total people: {cls.count}"
    
    @staticmethod
    def is_adult(age):  # Static method
        return age >= 18

person = Person("John")
print(person.greet())        # Hi, I am John
print(Person.get_count())    # Total people: 1
print(Person.is_adult(20))   # True`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Uses for Static Methods</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">1. Math Helper Functions</h4>
                            <CodeBlock code={`class MathHelper:
    @staticmethod
    def is_even(number):
        return number % 2 == 0
    
    @staticmethod
    def square(number):
        return number * number

print(MathHelper.is_even(4))  # True
print(MathHelper.square(5))   # 25`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">2. Validation Functions</h4>
                            <CodeBlock code={`class Validator:
    @staticmethod
    def is_valid_email(email):
        return "@" in email and "." in email
    
    @staticmethod
    def is_strong_password(password):
        return len(password) >= 8

print(Validator.is_valid_email("test@gmail.com"))  # True
print(Validator.is_strong_password("12345"))       # False`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">3. String Utilities</h4>
                            <CodeBlock code={`class StringUtils:
    @staticmethod
    def reverse_text(text):
        return text[::-1]
    
    @staticmethod
    def word_count(text):
        return len(text.split())

print(StringUtils.reverse_text("hello"))     # olleh
print(StringUtils.word_count("Hello World")) # 2`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real Example: User Management</h2>
                    
                    <CodeBlock code={`class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
    
    @staticmethod
    def is_valid_username(username):
        return len(username) >= 3 and username.isalnum()
    
    @staticmethod
    def generate_password():
        import random
        import string
        chars = string.ascii_letters + string.digits
        return ''.join(random.choice(chars) for _ in range(8))

# Use static methods before creating user
username = "john123"
if User.is_valid_username(username):
    password = User.generate_password()
    user = User(username, "john@email.com")
    print(f"User created: {user.username}")
    print(f"Generated password: {password}")
else:
    print("Invalid username")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">When to Use Static Methods</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Use static methods when:</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                Function is related to the class but doesn&apos;t need object data
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You want to group utility functions with a class
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                Function can work independently
                            </li>
                        </ul>
                        
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3 mt-4">Don&apos;t use when:</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                You need to access object properties (use instance method)
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                You need to access class variables (use class method)
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Quick Summary</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Static methods use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">@staticmethod</code> decorator</li>
                        <li>• Call them directly on the class: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">ClassName.method()</code></li>
                        <li>• They don&apos;t use self or cls parameters</li>
                        <li>• Perfect for utility and helper functions</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Create a Temperature class with static methods to convert between Celsius and Fahrenheit!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticMethods;