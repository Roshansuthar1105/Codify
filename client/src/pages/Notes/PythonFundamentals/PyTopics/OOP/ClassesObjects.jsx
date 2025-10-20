import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ClassesObjects = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Classes & Objects</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Classes are like blueprints for creating objects. Think of a class as a cookie cutter and objects as the cookies made from it.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Class?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A class is a template that defines what data and actions an object can have.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Simple class example
class Dog:
    pass  # Empty class for now

# Create an object
my_dog = Dog()
print(type(my_dog))  # <class '__main__.Dog'>`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibont text-gray-800 dark:text-white mb-4">Adding Properties to Classes</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__init__</code> method to give your objects properties when they are created.
                    </p>
                    
                    <CodeBlock code={`class Dog:
    def __init__(self, name, age):
        self.name = name  # Property
        self.age = age    # Property

# Create objects with properties
dog1 = Dog("Buddy", 5)
dog2 = Dog("Max", 3)

print(dog1.name)  # Buddy
print(dog2.age)   # 3`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Adding Methods to Classes</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Methods are functions that belong to a class. They define what actions objects can perform.
                    </p>
                    
                    <CodeBlock code={`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says Woof!"
    
    def get_age(self):
        return f"{self.name} is {self.age} years old"

# Use methods
my_dog = Dog("Buddy", 5)
print(my_dog.bark())     # Buddy says Woof!
print(my_dog.get_age())  # Buddy is 5 years old`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-World Example: Car Class</h2>
                    
                    <CodeBlock code={`class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.speed = 0
    
    def start(self):
        return f"{self.brand} {self.model} started!"
    
    def accelerate(self):
        self.speed += 10
        return f"Speed is now {self.speed} km/h"

# Create and use a car
my_car = Car("Toyota", "Camry")
print(my_car.start())       # Toyota Camry started!
print(my_car.accelerate())  # Speed is now 10 km/h
print(my_car.accelerate())  # Speed is now 20 km/h`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Class vs Instance Variables</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Class Variables</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm">Shared by all objects of the class</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">Instance Variables</h3>
                            <p className="text-purple-700 dark:text-purple-300 text-sm">Unique to each object</p>
                        </div>
                    </div>
                    
                    <CodeBlock code={`class Student:
    school = "ABC High School"  # Class variable (same for all)
    
    def __init__(self, name, grade):
        self.name = name    # Instance variable (unique)
        self.grade = grade  # Instance variable (unique)

# Create students
student1 = Student("Alice", "A")
student2 = Student("Bob", "B")

print(student1.school)  # ABC High School
print(student2.school)  # ABC High School (same for all)
print(student1.name)    # Alice (unique)
print(student2.name)    # Bob (unique)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Understanding &apos;self&apos;</h2>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                        <p className="text-yellow-700 dark:text-yellow-300">
                            <strong>&apos;self&apos;</strong> refers to the current object. It&apos;s how methods access the object&apos;s properties.
                        </p>
                    </div>
                    
                    <CodeBlock code={`class Person:
    def __init__(self, name):
        self.name = name  # self.name belongs to this object
    
    def introduce(self):
        return f"Hi, I am {self.name}"  # self.name refers to this object's name

person1 = Person("John")
person2 = Person("Jane")

print(person1.introduce())  # Hi, I am John
print(person2.introduce())  # Hi, I am Jane`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Simple Practice Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 1: Book Class</h4>
                            <CodeBlock code={`class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def info(self):
        return f"{self.title} by {self.author}"

my_book = Book("Harry Potter", "J.K. Rowling")
print(my_book.info())  # Harry Potter by J.K. Rowling`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 2: Calculator Class</h4>
                            <CodeBlock code={`class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(calc.add(5, 3))      # 8
print(calc.multiply(4, 2)) # 8`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Points to Remember</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">class</code> keyword to create a class
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__init__</code> method runs when you create an object
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">self</code> refers to the current object
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Methods are functions inside a class
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Objects are created by calling the class like a function
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Practice Exercise</h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-3">
                        Try creating a simple <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">Phone</code> class with:
                    </p>
                    <ul className="text-blue-600 dark:text-blue-400 space-y-1">
                        <li>• Properties: brand, model</li>
                        <li>• Methods: make_call(), send_text()</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ClassesObjects;