/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ListsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Lists</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Lists are ordered collections of items in Python. They are mutable, allow duplicates, and can contain items of different types. They are one of the most commonly used data structures in Python.
      </p>

      {/* ✅ Section 1 - Creating Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Creating Lists</h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            You can create lists using square brackets <code>[]</code> or the <code>list()</code> function.
          </p>
        </div>

        <CodeBlock
          code={`fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["Alice", 25, True, 3.14]

empty1 = []
empty2 = list()

print(fruits)
print(numbers)
print(mixed)`}
        />
      </section>

      {/* ✅ Section 2 - Accessing & Indexing */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Accessing & Indexing</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            You can access elements using indices. Python supports negative indexing to access elements from the end.
          </p>
        </div>

        <CodeBlock
          code={`fruits = ["apple", "banana", "cherry"]

print(fruits[0])   # 'apple' - first element
print(fruits[-1])  # 'cherry' - last element

numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])  # [2, 3, 4] - slicing
print(numbers[:3])   # [1, 2, 3] - start to index 2
print(numbers[2:])   # [3, 4, 5] - index 2 to end`}
        />
      </section>

      {/* ✅ Section 3 - Modifying Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Modifying Lists</h2>
        <CodeBlock
          code={`fruits = ["apple", "banana", "cherry"]

# Change item
fruits[1] = "orange"
print(fruits)  # ['apple', 'orange', 'cherry']

# Adding items
fruits.append("mango")
fruits.insert(1, "kiwi")
print(fruits)  # ['apple', 'kiwi', 'orange', 'cherry', 'mango']

# Removing items
fruits.remove("orange")
last = fruits.pop()
print(fruits)  # ['apple', 'kiwi', 'cherry']
print(last)    # 'mango'`}
        />
      </section>

      {/* ✅ Section 4 - List Methods */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">List Methods</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><code>append(x)</code> - Add item at end</li>
          <li><code>extend(iterable)</code> - Add all items from iterable</li>
          <li><code>insert(i, x)</code> - Insert item at index i</li>
          <li><code>remove(x)</code> - Remove first occurrence of x</li>
          <li><code>pop([i])</code> - Remove and return item at index i (default last)</li>
          <li><code>sort()</code> - Sort list in ascending order</li>
          <li><code>reverse()</code> - Reverse the list</li>
          <li><code>count(x)</code> - Return count of x</li>
          <li><code>index(x)</code> - Return first index of x</li>
        </ul>

        <CodeBlock
          code={`numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)       # [1, 1, 2, 3, 4, 5, 9]
numbers.reverse()
print(numbers)       # [9, 5, 4, 3, 2, 1, 1]
print(numbers.count(1))  # 2
print(numbers.index(5))  # 1`}
        />
      </section>

      {/* ✅ Section 5 - Nested Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Nested Lists</h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Lists can contain other lists as elements. Access nested items using multiple indices.
          </p>
        </div>

        <CodeBlock
          code={`matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

print(matrix[0][1])  # 2
print(matrix[2][0])  # 7`}
        />
      </section>

      {/* ✅ Section 6 - Iterating Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Iterating Lists</h2>
        <CodeBlock
          code={`fruits = ["apple", "banana", "cherry"]

# Using for loop
for fruit in fruits:
    print(fruit)

# Using enumerate for index
for i, fruit in enumerate(fruits):
    print(i, fruit)`}
        />
      </section>

      {/* ✅ Section 7 - Copying Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Copying Lists</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Use <code>copy()</code> to create a shallow copy. Assignment <code>=</code> just creates a reference.
          </p>
        </div>

        <CodeBlock
          code={`original = [1, 2, 3]
shallow_copy = original.copy()
reference = original

original.append(4)
print(original)       # [1, 2, 3, 4]
print(shallow_copy)   # [1, 2, 3]
print(reference)      # [1, 2, 3, 4]`}
        />
      </section>

      {/* ✅ Section 8 - Common Pitfalls */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Pitfalls</h2>
        <ul className="list-disc ml-5 text-red-700 dark:text-red-300 space-y-2">
          <li>Using <code>=</code> instead of <code>copy()</code> can lead to unexpected changes.</li>
          <li>Remember <code>pop()</code> returns the item removed.</li>
          <li>Slicing creates a new list, modifying it does not affect the original.</li>
        </ul>
      </section>

      {/* ✅ Section 9 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Exercises</h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Create a list of your favorite 5 fruits and print the first and last</li>
            <li>Create a 3x3 matrix and print the diagonal elements</li>
            <li>Copy a list and append new items to original, verify the copy remains unchanged</li>
            <li>Use a loop to print each fruit with its index</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Lists are ordered, mutable, and can hold mixed data types</li>
            <li>Support indexing, slicing, nested lists, and iteration</li>
            <li>Use built-in methods for common operations like add, remove, sort</li>
            <li>Copying should be done with <code>copy()</code> to avoid reference issues</li>
            <li>List comprehensions can simplify list creation</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
