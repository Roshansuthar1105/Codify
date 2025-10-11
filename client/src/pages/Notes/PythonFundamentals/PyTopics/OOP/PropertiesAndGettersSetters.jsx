/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

const PropertiesAndGettersSetters = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Properties & Getters/Setters</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Properties in Python allow you to control access to instance variables using getters, setters, and the <code>@property</code> decorator. This helps in encapsulating data and adding validation.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Property?</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            A property allows you to define methods that can be accessed like attributes. It provides a clean way to get, set, or delete values.
          </p>
        </div>

        <CodeBlock code={`class Circle:
    def __init__(self, radius):
        self._radius = radius  # Underscore indicates "private" variable

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = value

c = Circle(5)
print(c.radius)  # 5
c.radius = 10
print(c.radius)  # 10
# c.radius = -3   # Raises ValueError`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Properties?</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Control access to instance variables without changing interface</li>
          <li>Add validation logic for setting values</li>
          <li>Compute values dynamically when accessed</li>
          <li>Encapsulate data while keeping simple syntax</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Getter Method Example</h2>
        <CodeBlock code={`class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Setter Method Example</h2>
        <CodeBlock code={`class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature cannot be below absolute zero")
        self._celsius = value

t = Temperature(20)
t.celsius = 100
print(t.celsius)  # 100
# t.celsius = -300  # Raises ValueError`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Delete Property Example</h2>
        <CodeBlock code={`class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value

    @name.deleter
    def name(self):
        print("Deleting name...")
        del self._name

p = Person("Alice")
print(p.name)  # Alice
del p.name     # Deleting name...`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Computed Properties</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Properties can be computed dynamically without storing them explicitly.
        </p>
        <CodeBlock code={`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area)      # 15
print(rect.perimeter) # 16`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Advantages of Using @property</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Encapsulates data without changing interface</li>
          <li>Adds validation when setting values</li>
          <li>Supports dynamic or computed attributes</li>
          <li>Keeps code clean and readable</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-World Example: Bank Account</h2>
        <CodeBlock code={`class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = amount

acc = BankAccount("John", 1000)
print(acc.balance)  # 1000
acc.balance = 500
print(acc.balance)  # 500
# acc.balance = -100  # Raises ValueError`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a <code>Student</code> class with <code>name</code> and <code>marks</code> properties. Ensure marks are between 0 and 100.</li>
            <li>Create a <code>Car</code> class with <code>speed</code> property. Validate speed cannot be negative.</li>
            <li>Create a <code>Employee</code> class with <code>salary</code> property and ensure it cannot go below 0.</li>
            <li>Create a <code>Circle</code> class with <code>radius</code> property, and a computed property <code>area</code>.</li>
            <li>Create a <code>Rectangle</code> class with <code>width</code> and <code>height</code> properties and computed <code>perimeter</code>.</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Use <code>@property</code> to define getter methods</li>
            <li>Use <code>@property_name.setter</code> to define setter methods</li>
            <li>Use <code>@property_name.deleter</code> to define delete behavior</li>
            <li>Encapsulate data and add validation without changing class interface</li>
            <li>Properties can also be computed dynamically</li>
            <li>Keeps code clean, readable, and maintainable</li>
          </ul>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Pro Tip:</strong> Always use <code>@property</code> for sensitive attributes like balance, marks, or age to prevent invalid values!
        </p>
      </div>
    </div>
  );
};

export default PropertiesAndGettersSetters;
