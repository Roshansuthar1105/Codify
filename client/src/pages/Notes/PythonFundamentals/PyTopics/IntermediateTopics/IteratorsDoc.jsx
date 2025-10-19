/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function IteratorsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Iterators & Iterables</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python, <strong>Iterables</strong> are objects that can be looped over (like lists or strings), 
        while <strong>Iterators</strong> are objects that return data one element at a time. 
        Understanding these helps you work with loops, generators, and memory-efficient code.
      </p>

      {/* ✅ Section 1 - What is an Iterable */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is an Iterable?
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            An <strong>Iterable</strong> is any Python object that can be looped over using a <code>for</code> loop.
            Examples: <code>list</code>, <code>tuple</code>, <code>set</code>, <code>dict</code>, <code>string</code>.
          </p>
        </div>

        <CodeBlock
          code={`# Iterable examples
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

for letter in "HELLO":
    print(letter)`}
        />
      </section>

      {/* ✅ Section 2 - What is an Iterator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is an Iterator?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            An <strong>Iterator</strong> is an object that helps you access elements from an iterable 
            one at a time using <code>next()</code>. 
            You can create an iterator from any iterable using the <code>iter()</code> function.
          </p>
        </div>

        <CodeBlock
          code={`numbers = [10, 20, 30]
it = iter(numbers)  # Convert list into iterator

print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# print(next(it))  # Raises StopIteration (no more items)`}
        />
      </section>

      {/* ✅ Section 3 - Checking if an Object is Iterable */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Checking if an Object is Iterable
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            You can check if an object is iterable by importing <code>Iterable</code> 
            from <code>collections.abc</code>.
          </p>
        </div>

        <CodeBlock
          code={`from collections.abc import Iterable

print(isinstance([1, 2, 3], Iterable))  # True
print(isinstance(100, Iterable))         # False`}
        />
      </section>

      {/* ✅ Section 4 - Iterators are also Iterables */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Iterators are also Iterables
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            All iterators are iterables because they implement both 
            <code>__iter__()</code> and <code>__next__()</code> methods.
          </p>
        </div>

        <CodeBlock
          code={`numbers = [1, 2, 3]
it = iter(numbers)

print("__iter__" in dir(it))  # True
print("__next__" in dir(it))  # True`}
        />
      </section>

      {/* ✅ Section 5 - Creating a Custom Iterator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Creating a Custom Iterator
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            You can create your own iterator by defining a class that has 
            <code>__iter__()</code> and <code>__next__()</code> methods.
          </p>
        </div>

        <CodeBlock
          code={`class CountUpto:
    def __init__(self, limit):
        self.limit = limit
        self.count = 1

    def __iter__(self):
        return self

    def __next__(self):
        if self.count <= self.limit:
            value = self.count
            self.count += 1
            return value
        else:
            raise StopIteration

numbers = CountUpto(5)
for num in numbers:
    print(num)`}
        />
      </section>

      {/* ✅ Section 6 - Difference Between Iterable & Iterator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Difference Between Iterable & Iterator
        </h2>

        <table className="w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg mb-4">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">Feature</th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">Iterable</th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">Iterator</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b border-gray-300 dark:border-gray-700">Definition</td>
              <td className="p-3">Object that can be looped over</td>
              <td className="p-3">Object that gives one item at a time</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-gray-300 dark:border-gray-700">Examples</td>
              <td className="p-3">list, tuple, string</td>
              <td className="p-3">Created using iter()</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-gray-300 dark:border-gray-700">Methods</td>
              <td className="p-3">__iter__()</td>
              <td className="p-3">__iter__(), __next__()</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-gray-300 dark:border-gray-700">Usage</td>
              <td className="p-3">Used with loops</td>
              <td className="p-3">Used for next() calls</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ✅ Section 7 - Built-in Iterator Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Built-in Iterator Functions
        </h2>

        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><code>iter(obj)</code> - Converts iterable into iterator</li>
          <li><code>next(it)</code> - Returns next element from iterator</li>
          <li><code>enumerate()</code> - Returns index and value</li>
          <li><code>zip()</code> - Iterates over multiple iterables together</li>
        </ul>

        <CodeBlock
          code={`fruits = ["apple", "banana", "cherry"]
colors = ["red", "yellow", "pink"]

for fruit, color in zip(fruits, colors):
    print(f"{fruit} -> {color}")`}
        />
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Create an iterator from a list and print all its elements using <code>next()</code>.</li>
            <li>Write a class-based iterator that prints even numbers up to 20.</li>
            <li>Use <code>zip()</code> to combine two lists and print key-value pairs.</li>
            <li>Check if a tuple is iterable using <code>collections.abc</code>.</li>
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
            <li>Iterables can be looped over using <code>for</code> loops.</li>
            <li>Iterators return one element at a time using <code>next()</code>.</li>
            <li>All iterators are iterables, but not all iterables are iterators.</li>
            <li>Use <code>iter()</code> to create an iterator and <code>next()</code> to get elements.</li>
            <li>Custom iterators are created with <code>__iter__()</code> and <code>__next__()</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
