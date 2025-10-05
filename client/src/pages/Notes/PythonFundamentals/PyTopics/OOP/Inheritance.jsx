import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Inheritance = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Inheritance</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Inheritance is like a family tree. Children inherit traits from their parents. 
                    In programming, a child class inherits methods and properties from a parent class.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is Inheritance?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Inheritance lets you create a new class based on an existing class. 
                            The new class gets all the features of the old class plus its own new features.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Parent class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

# Child class inherits from Animal
class Dog(Animal):
    def speak(self):
        return "Woof!"

# Dog gets everything from Animal + its own features
my_dog = Dog("Buddy")
print(my_dog.name)   # Buddy (inherited from Animal)
print(my_dog.speak()) # Woof! (overridden in Dog)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Simple Inheritance Example</h2>
                    
                    <CodeBlock code={`class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    
    def start(self):
        return f"{self.brand} started"

class Car(Vehicle):  # Car inherits from Vehicle
    def __init__(self, brand, doors):
        super().__init__(brand)  # Call parent constructor
        self.doors = doors
    
    def honk(self):
        return "Beep beep!"

# Usage
my_car = Car("Toyota", 4)
print(my_car.start())  # Toyota started (inherited)
print(my_car.honk())   # Beep beep! (own method)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibont text-gray-800 dark:text-white mb-4">Using super() Function</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">super()</code> lets you call methods from the parent class.
                    </p>
                    
                    <CodeBlock code={`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I am {self.name}"

class Student(Person):
    def __init__(self, name, age, school):
        super().__init__(name, age)  # Use parent's __init__
        self.school = school
    
    def introduce(self):
        parent_intro = super().introduce()  # Get parent's method
        return f"{parent_intro} from {self.school}"

student = Student("Alice", 20, "ABC College")
print(student.introduce())  # Hi, I am Alice from ABC College`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Method Overriding</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Child classes can change how parent methods work by overriding them.
                    </p>
                    
                    <CodeBlock code={`class Shape:
    def area(self):
        return "Area not defined"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):  # Override parent method
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):  # Override parent method
        return 3.14 * self.radius * self.radius

rect = Rectangle(5, 3)
circle = Circle(4)
print(rect.area())    # 15
print(circle.area())  # 50.24`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Types of Inheritance</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Single Inheritance</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm">One child, one parent</p>
                            <CodeBlock code={`class Animal:
    pass

class Dog(Animal):  # Dog inherits from Animal
    pass`} />
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">Multiple Inheritance</h3>
                            <p className="text-purple-700 dark:text-purple-300 text-sm">One child, multiple parents</p>
                            <CodeBlock code={`class Flyable:
    def fly(self):
        return "Flying"

class Swimmable:
    def swim(self):
        return "Swimming"

class Duck(Flyable, Swimmable):  # Multiple parents
    pass`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real Example: Employee System</h2>
                    
                    <CodeBlock code={`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def work(self):
        return f"{self.name} is working"

class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language
    
    def work(self):
        return f"{self.name} is coding in {self.language}"

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size
    
    def work(self):
        return f"{self.name} is managing {self.team_size} people"

# Usage
dev = Developer("Alice", 70000, "Python")
manager = Manager("Bob", 80000, 5)

print(dev.work())     # Alice is coding in Python
print(manager.work()) # Bob is managing 5 people`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Checking Inheritance</h2>
                    
                    <CodeBlock code={`# Check if object belongs to a class
print(isinstance(my_dog, Dog))     # True
print(isinstance(my_dog, Animal))  # True (Dog inherits from Animal)

# Check if class inherits from another
print(issubclass(Dog, Animal))     # True
print(issubclass(Animal, Dog))     # False`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibont text-gray-800 dark:text-white mb-4">When to Use Inheritance</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Use inheritance when:</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You can say &quot;is-a&quot; relationship (Dog IS-A Animal)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You want to reuse code from another class
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You need to override some methods
                            </li>
                        </ul>
                        
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3 mt-4">Avoid inheritance when:</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                You can only say &quot;has-a&quot; relationship (Car HAS-A Engine)
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                Classes are not related
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Child class inherits everything from parent class</li>
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">super()</code> to access parent methods</li>
                        <li>• Override methods to change behavior in child class</li>
                        <li>• Use inheritance for &quot;is-a&quot; relationships</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Create a Vehicle parent class and Car, Bike child classes with their own unique methods!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inheritance;