/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function DecoratorsAndGenerators() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-purple-600 dark:text-purple-400">Decorators & Generators</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Decorators and generators are advanced Python features that make your code cleaner, reusable, and memory-efficient.
        <strong>Decorators</strong> add extra functionality to functions without modifying them, while <strong>generators</strong> produce values lazily using <code>yield</code>.
      </p>

      {/* ✅ Section 1 - What is a Decorator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Decorator?
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            A decorator is a function that wraps another function to extend its behavior without modifying its code.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Enhances functions dynamically</li>
          <li>Useful for logging, authentication, or timing functions</li>
          <li>Applied using the <code>@decorator_name</code> syntax</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Decorator Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Simple Decorator Example
        </h2>
        <CodeBlock
          code={`def decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: The <code>@decorator</code> wraps <code>say_hello</code>, printing messages before and after the function runs.
        </p>
      </section>

      {/* ✅ Section 3 - Chaining Decorators */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Chaining Multiple Decorators
        </h2>
        <CodeBlock
          code={`def bold(func):
    def wrapper():
        return "<b>" + func() + "</b>"
    return wrapper

def italic(func):
    def wrapper():
        return "<i>" + func() + "</i>"
    return wrapper

@bold
@italic
def greet():
    return "Hello!"

print(greet())  # Output: <b><i>Hello!</i></b>`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Multiple decorators can be applied on a function. Execution happens from bottom to top.
        </p>
      </section>

      {/* ✅ Section 4 - What is a Generator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Generator?
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            A generator is a special type of function that returns values one at a time using <code>yield</code>, instead of returning all values at once.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Memory-efficient for large sequences</li>
          <li>Values are generated lazily when requested</li>
          <li>Supports iteration like lists but without storing all items in memory</li>
        </ul>
      </section>

      {/* ✅ Section 5 - Generator Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Simple Generator Example
        </h2>
        <CodeBlock
          code={`def squares(n):
    for i in range(n):
        yield i*i

for val in squares(5):
    print(val)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>yield</code> produces one value at a time instead of storing the full list in memory.
        </p>
      </section>

      {/* ✅ Section 6 - Generator with Large Data */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using Generators with Large Data
        </h2>
        <CodeBlock
          code={`def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Generates Fibonacci numbers on-the-fly, saving memory for large sequences.
        </p>
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a decorator to log function execution time.</li>
            <li>Create a generator that yields odd numbers up to 20.</li>
            <li>Chain two decorators to format a string in multiple ways.</li>
            <li>Implement a generator to produce prime numbers lazily.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 text-purple-700 dark:text-purple-300 space-y-2">
            <li>Define a decorator to print messages before and after a function</li>
            <li>Apply the decorator using <code>@decorator</code></li>
            <li>Define a generator to produce squares of numbers</li>
            <li>Iterate through the generator using a for loop</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tips & Best Practices</h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use decorators for cross-cutting concerns (logging, timing, caching)</li>
            <li>Use generators for memory efficiency with large sequences</li>
            <li>Avoid storing large lists; yield values instead</li>
            <li>Chain decorators carefully to maintain readability</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <ul className="text-purple-800 dark:text-purple-300 space-y-2">
            <li>Decorators add extra functionality without modifying original functions</li>
            <li>Generators produce values lazily using <code>yield</code></li>
            <li>Generators save memory for large datasets</li>
            <li>Decorators can be chained for multiple behaviors</li>
            <li>Use generators and decorators to write cleaner, efficient Python code</li>
          </ul>
        </div>
      </section>

      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md border border-purple-200 dark:border-purple-700">
        <p className="text-purple-700 dark:text-purple-300">
          💡 <strong>Pro Tip:</strong> Practice by creating small utilities like logging decorators or sequence generators!
        </p>
      </div>
    </div>
  );
}
