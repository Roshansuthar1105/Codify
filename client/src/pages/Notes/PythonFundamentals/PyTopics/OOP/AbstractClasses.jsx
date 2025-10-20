/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

const AbstractClasses = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Abstract Classes</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Abstract classes in Python define a blueprint for other classes. They cannot be instantiated directly but can provide common structure for child classes.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is an Abstract Class?</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Abstract classes are classes that contain one or more abstract methods. These methods must be implemented by any subclass.
          </p>
        </div>

        <CodeBlock code={`from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

# This will give an error:
# animal = Animal()  # TypeError: Can't instantiate abstract class Animal with abstract method make_sound`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Creating Subclasses</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Subclasses must implement all abstract methods to be instantiated.
        </p>

        <CodeBlock code={`class Dog(Animal):
    def make_sound(self):
        return "Woof!"

class Cat(Animal):
    def make_sound(self):
        return "Meow!"

dog = Dog()
cat = Cat()
print(dog.make_sound())  # Woof!
print(cat.make_sound())  # Meow!`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Abstract Class vs Interface</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Abstract classes can have implemented methods and properties, unlike pure interfaces. Interfaces are fully abstract with no implementation.
          </p>
        </div>

        <CodeBlock code={`from abc import ABC, abstractmethod

class Vehicle(ABC):
    def start(self):
        return "Starting vehicle"

    @abstractmethod
    def move(self):
        pass

class Car(Vehicle):
    def move(self):
        return "Car is moving"

car = Car()
print(car.start())  # Starting vehicle
print(car.move())   # Car is moving`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Multiple Abstract Methods</h2>
        <CodeBlock code={`class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area())       # 15
print(rect.perimeter())  # 16`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Points</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Use <code>ABC</code> as base class to create abstract classes</li>
          <li>Use <code>@abstractmethod</code> to declare abstract methods</li>
          <li>Abstract classes cannot be instantiated directly</li>
          <li>Subclasses must implement all abstract methods</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create an abstract class <code>Appliance</code> with abstract method <code>turn_on()</code>.</li>
            <li>Create subclasses <code>Fan</code> and <code>Light</code> implementing <code>turn_on()</code>.</li>
            <li>Create an abstract class <code>Employee</code> with <code>calculate_salary()</code> abstract method and implement it in <code>Manager</code> and <code>Developer</code>.</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Abstract classes define a blueprint for other classes</li>
            <li>Use <code>ABC</code> and <code>@abstractmethod</code></li>
            <li>Cannot instantiate abstract classes directly</li>
            <li>All abstract methods must be implemented in subclasses</li>
            <li>Can include implemented methods too</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AbstractClasses;
