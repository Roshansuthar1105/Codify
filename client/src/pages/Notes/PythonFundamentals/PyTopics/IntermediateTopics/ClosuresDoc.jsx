/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ClosuresDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Closures</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        A <strong>Closure</strong> in Python is a function that remembers the variables from
        its enclosing scope, even after the outer function has finished executing.
        Closures make it possible to create <strong>functions with memory</strong> — 
        they "remember" the data they were created with.
      </p>

      {/* ✅ Section 1 - Why Closures */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Why Do We Need Closures?
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Closures help us retain the state of a function between calls — without using 
            global variables or classes. This makes code cleaner, safer, and more modular.
          </p>
        </div>

        <CodeBlock
          code={`def outer_function(msg):
    def inner_function():
        print(msg)   # inner function remembers 'msg'
    return inner_function

greet = outer_function("Hello, Python!")
greet()   # Output: Hello, Python!`}
        />
      </section>

      {/* ✅ Section 2 - How Closures Work */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How Closures Work
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A Closure works when three conditions are met:
          </p>
          <ul className="list-disc ml-6 mt-2 text-green-700 dark:text-green-300 space-y-1">
            <li>There must be a nested (inner) function.</li>
            <li>The inner function must reference a variable from the outer function.</li>
            <li>The outer function must return the inner function.</li>
          </ul>
        </div>

        <CodeBlock
          code={`def outer():
    x = 5
    def inner():
        print(x)   # inner remembers x
    return inner

func = outer()
func()   # Output: 5`}
        />
      </section>

      {/* ✅ Section 3 - Example with Parameters */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Closures with Parameters
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Closures can also accept parameters in the inner function while keeping memory 
            of the outer variable.
          </p>
        </div>

        <CodeBlock
          code={`def multiplier(n):
    def multiply(x):
        return x * n
    return multiply

times2 = multiplier(2)
times3 = multiplier(3)

print(times2(5))  # Output: 10
print(times3(5))  # Output: 15`}
        />
      </section>

      {/* ✅ Section 4 - Checking Closure Variables */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Checking Closure Variables
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            You can inspect what variables are stored inside a closure using the
            <code>.__closure__</code> attribute.
          </p>
        </div>

        <CodeBlock
          code={`def outer():
    val = "remember me"
    def inner():
        return val
    return inner

fn = outer()
print(fn.__closure__[0].cell_contents)  # Output: remember me`}
        />
      </section>

      {/* ✅ Section 5 - Real World Use Cases */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Real-World Uses of Closures
        </h2>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
            1️⃣ Logging Function
          </h3>
          <CodeBlock
            code={`def logger(prefix):
    def log_message(msg):
        print(f"[{prefix}] {msg}")
    return log_message

info = logger("INFO")
error = logger("ERROR")

info("File opened successfully")
error("File not found!")`}
          />

          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mt-6 mb-2">
            2️⃣ Access Control
          </h3>
          <CodeBlock
            code={`def make_account(balance):
    def withdraw(amount):
        nonlocal balance
        if amount <= balance:
            balance -= amount
            return balance
        else:
            return "Insufficient funds"
    return withdraw

account = make_account(1000)
print(account(200))  # Output: 800
print(account(900))  # Output: Insufficient funds`}
          />

          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mt-6 mb-2">
            3️⃣ Function Decorators
          </h3>
          <CodeBlock
            code={`def outer_decorator(func):
    def inner():
        print("Before function")
        func()
        print("After function")
    return inner

@outer_decorator
def greet():
    print("Hello!")

greet()`}
          />
        </div>
      </section>

      {/* ✅ Section 6 - Using nonlocal Keyword */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using the <code>nonlocal</code> Keyword
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            When we need to modify a variable from the outer function inside the inner one,
            we use the <code>nonlocal</code> keyword.
          </p>
        </div>

        <CodeBlock
          code={`def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

c = counter()
print(c())  # 1
print(c())  # 2
print(c())  # 3`}
        />
      </section>

      {/* ✅ Section 7 - Advantages of Closures */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advantages of Closures
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>They help avoid global variables.</li>
            <li>Make code more modular and organized.</li>
            <li>Used to create decorators and callbacks.</li>
            <li>Useful for data hiding and encapsulation.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-blue-700 dark:text-blue-300 space-y-2">
            <li>Create a closure that multiplies any number by a fixed constant.</li>
            <li>Build a counter function using <code>nonlocal</code>.</li>
            <li>Write a closure that logs every function call.</li>
            <li>Make a closure that stores a secret password and checks access.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>A Closure is a nested function that remembers variables from its outer scope.</li>
            <li>It helps maintain state without using global variables.</li>
            <li>Closures use <code>nonlocal</code> when modifying outer variables.</li>
            <li>They are widely used in decorators, logging, and callbacks.</li>
            <li>They make code reusable and maintainable.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
