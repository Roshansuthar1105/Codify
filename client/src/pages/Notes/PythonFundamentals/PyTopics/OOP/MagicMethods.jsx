import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const MagicMethods = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Magic Methods</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Magic methods are special methods that start and end with double underscores (__). 
                    They let you control how your objects work with Python operators and built-in functions.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What are Magic Methods?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Magic methods (also called dunder methods) make your objects work with Python operators like +, -, ==, and functions like len(), str().
                        </p>
                    </div>
                    
                    <CodeBlock code={`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):  # Magic method for print()
        return f"{self.name}, {self.age} years old"

person = Person("Alice", 25)
print(person)  # Alice, 25 years old`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Magic Methods</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">__str__</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm">Controls print() output</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">__len__</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">Controls len() function</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">__add__</h3>
                            <p className="text-purple-700 dark:text-purple-300 text-sm">Controls + operator</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">__eq__</h3>
                            <p className="text-red-700 dark:text-red-300 text-sm">Controls == operator</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">String Representation</h2>
                    
                    <CodeBlock code={`class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"

book = Book("1984", "George Orwell")
print(book)       # 1984 by George Orwell (__str__)
print(repr(book)) # Book('1984', 'George Orwell') (__repr__)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Math Operations</h2>
                    
                    <CodeBlock code={`class Number:
    def __init__(self, value):
        self.value = value
    
    def __add__(self, other):
        return Number(self.value + other.value)
    
    def __sub__(self, other):
        return Number(self.value - other.value)
    
    def __str__(self):
        return str(self.value)

num1 = Number(10)
num2 = Number(5)

result = num1 + num2  # Uses __add__
print(result)  # 15

result = num1 - num2  # Uses __sub__
print(result)  # 5`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Comparison Operators</h2>
                    
                    <CodeBlock code={`class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __eq__(self, other):  # ==
        return self.grade == other.grade
    
    def __lt__(self, other):  # <
        return self.grade < other.grade
    
    def __str__(self):
        return f"{self.name}: {self.grade}"

alice = Student("Alice", 85)
bob = Student("Bob", 92)

print(alice == bob)  # False
print(alice < bob)   # True`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Container Behavior</h2>
                    
                    <CodeBlock code={`class SimpleList:
    def __init__(self):
        self.items = []
    
    def __len__(self):
        return len(self.items)
    
    def __getitem__(self, index):
        return self.items[index]
    
    def add(self, item):
        self.items.append(item)

my_list = SimpleList()
my_list.add("apple")
my_list.add("banana")

print(len(my_list))  # 2 (uses __len__)
print(my_list[0])    # apple (uses __getitem__)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibont text-gray-800 dark:text-white mb-4">Making Objects Callable</h2>
                    
                    <CodeBlock code={`class Multiplier:
    def __init__(self, factor):
        self.factor = factor
    
    def __call__(self, number):
        return number * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))  # 10 (calls __call__)
print(triple(4))  # 12 (calls __call__)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Real Example: Bank Account</h2>
                    
                    <CodeBlock code={`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def __str__(self):
        return f"Account Balance: ${self.balance}"
    
    def __add__(self, amount):  # Deposit money
        return BankAccount(self.balance + amount)
    
    def __sub__(self, amount):  # Withdraw money
        if amount <= self.balance:
            return BankAccount(self.balance - amount)
        else:
            print("Insufficient funds!")
            return self
    
    def __eq__(self, other):
        return self.balance == other.balance

account1 = BankAccount(1000)
account2 = account1 + 500    # Deposit $500
account3 = account2 - 200    # Withdraw $200

print(account1)  # Account Balance: $1000
print(account2)  # Account Balance: $1500
print(account3)  # Account Balance: $1300`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Quick Reference</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibond text-gray-800 dark:text-white mb-3">Basic Methods</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__init__</code> - Constructor</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__str__</code> - String representation</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__len__</code> - Length</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__call__</code> - Make callable</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibond text-gray-800 dark:text-white mb-3">Operators</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__add__</code> - + operator</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__eq__</code> - == operator</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__lt__</code> - &lt; operator</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__getitem__</code> - [] access</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibond text-blue-800 dark:text-blue-300 mb-3">Key Points</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Magic methods start and end with double underscores __</li>
                        <li>• They make your objects work with Python operators and functions</li>
                        <li>• <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">__str__</code> controls how print() shows your object</li>
                        <li>• <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">__add__</code> lets you use + operator with your objects</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Create a simple Calculator class with __add__ and __sub__ methods!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagicMethods;