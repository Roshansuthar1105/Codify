import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Polymorphism = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Polymorphism</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Polymorphism means &quot;many forms&quot;. It allows different objects to respond to the same action in their own way. 
                    Like how both a dog and a cat can &quot;make sound&quot;, but they sound different.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is Polymorphism?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Polymorphism lets you use the same method name for different classes, 
                            but each class can do it their own way.
                        </p>
                    </div>
                    
                    <CodeBlock code={`class Dog:
    def make_sound(self):
        return "Woof!"

class Cat:
    def make_sound(self):
        return "Meow!"

class Bird:
    def make_sound(self):
        return "Tweet!"

# Same method name, different results
animals = [Dog(), Cat(), Bird()]

for animal in animals:
    print(animal.make_sound())
# Output: Woof!, Meow!, Tweet!`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Method Overriding</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Child classes can change how parent methods work.
                    </p>
                    
                    <CodeBlock code={`class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):  # Override parent method
        return "Woof!"

class Cat(Animal):
    def speak(self):  # Override parent method
        return "Meow!"

# Same method call, different behaviors
dog = Dog()
cat = Cat()

print(dog.speak())  # Woof!
print(cat.speak())  # Meow!`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real Example: Shape Calculator</h2>
                    
                    <CodeBlock code={`class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius * self.radius

# Same method, different calculations
shapes = [Rectangle(5, 3), Circle(4)]

for shape in shapes:
    print(f"Area: {shape.area()}")
# Output: Area: 15, Area: 50.24`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Duck Typing</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        &quot;If it walks like a duck and talks like a duck, it&apos;s a duck.&quot; 
                        Objects just need to have the same methods, not the same parent class.
                    </p>
                    
                    <CodeBlock code={`class Duck:
    def sound(self):
        return "Quack"

class Dog:
    def sound(self):
        return "Woof"

def make_sound(animal):
    return animal.sound()  # Works for any object with sound() method

duck = Duck()
dog = Dog()

print(make_sound(duck))  # Quack
print(make_sound(dog))   # Woof`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Operator Overloading</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can change how operators (+, -, *, ==) work with your objects.
                    </p>
                    
                    <CodeBlock code={`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):  # Overload + operator
        return Point(self.x + other.x, self.y + other.y)
    
    def __str__(self):  # Overload str() function
        return f"Point({self.x}, {self.y})"

point1 = Point(1, 2)
point2 = Point(3, 4)

result = point1 + point2  # Uses __add__ method
print(result)  # Point(4, 6)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Simple Payment Example</h2>
                    
                    <CodeBlock code={`class CreditCard:
    def pay(self, amount):
        return f"Paid \${amount} with Credit Card"

class PayPal:
    def pay(self, amount):
        return f"Paid \${amount} with PayPal"

class Cash:
    def pay(self, amount):
        return f"Paid \${amount} with Cash"

def process_payment(payment_method, amount):
    return payment_method.pay(amount)

# Same function works with different payment methods
credit = CreditCard()
paypal = PayPal()
cash = Cash()

print(process_payment(credit, 100))  # Paid $100 with Credit Card
print(process_payment(paypal, 50))   # Paid $50 with PayPal
print(process_payment(cash, 25))     # Paid $25 with Cash`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Built-in Polymorphism</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Python already uses polymorphism in many built-in functions.
                    </p>
                    
                    <CodeBlock code={`# len() works with different types
print(len("Hello"))      # 5 (string)
print(len([1, 2, 3]))    # 3 (list)
print(len({'a': 1}))     # 1 (dictionary)

# + operator works differently
print(5 + 3)             # 8 (numbers)
print("Hello" + "World") # HelloWorld (strings)
print([1, 2] + [3, 4])   # [1, 2, 3, 4] (lists)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibont text-gray-800 dark:text-white mb-4">When to Use Polymorphism</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Use polymorphism when:</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                Different objects need to respond to the same action
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You want to treat different objects the same way
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                You want to add new types without changing existing code
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Benefits</h3>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>• Same code works with different objects</li>
                            <li>• Easy to add new types</li>
                            <li>• Code is more flexible</li>
                            <li>• Less code duplication</li>
                        </ul>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                        <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Types</h3>
                        <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                            <li>• Method overriding</li>
                            <li>• Duck typing</li>
                            <li>• Operator overloading</li>
                            <li>• Built-in polymorphism</li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Key Points</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Polymorphism = same interface, different implementations</li>
                        <li>• Override methods in child classes to change behavior</li>
                        <li>• Duck typing: objects just need the right methods</li>
                        <li>• Operator overloading uses special methods like __add__</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Create Vehicle, Car, and Bike classes with a start() method that works differently for each!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Polymorphism;