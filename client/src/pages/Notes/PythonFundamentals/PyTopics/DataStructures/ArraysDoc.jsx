/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ArraysDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Arrays</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Arrays are similar to lists but can only store items of the same type. Python provides the <code>array</code> module to work with arrays efficiently.
      </p>

      {/* ✅ Section 1 - Importing & Creating Arrays */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Importing & Creating Arrays
        </h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Arrays must be imported from the <code>array</code> module. Specify the typecode for the type of elements you want to store.
          </p>
        </div>

        <CodeBlock
          code={`import array

# Create an integer array
numbers = array.array('i', [1, 2, 3, 4, 5])

# Create a float array
floats = array.array('f', [1.0, 2.5, 3.2])

print(numbers)  # array('i', [1, 2, 3, 4, 5])
print(floats)   # array('f', [1.0, 2.5, 3.2])`}
        />
      </section>

      {/* ✅ Section 2 - Accessing & Modifying Arrays */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Accessing & Modifying Arrays
        </h2>

        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>Access items using indices: <code>numbers[0]</code></li>
          <li>Modify items: <code>numbers[2] = 10</code></li>
          <li>Slice arrays: <code>numbers[1:4]</code></li>
        </ul>

        <CodeBlock
          code={`import array

numbers = array.array('i', [1, 2, 3, 4, 5])
numbers[2] = 10
print(numbers)       # array('i', [1, 2, 10, 4, 5])
print(numbers[1:4])  # array('i', [2, 10, 4])`}
        />
      </section>

      {/* ✅ Section 3 - Array Methods */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Array Methods
        </h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Arrays have built-in methods to add, remove, and search for items efficiently.
          </p>
        </div>

        <CodeBlock
          code={`import array

numbers = array.array('i', [1, 2, 3])

# Add elements
numbers.append(4)
numbers.insert(1, 10)

# Remove elements
numbers.remove(2)
last_item = numbers.pop()

# Search & info
index_of_3 = numbers.index(3)
count_of_1 = numbers.count(1)

print(numbers)       # array('i', [1, 10, 3])
print(last_item)     # 4
print(index_of_3)    # 2
print(count_of_1)    # 1`}
        />
      </section>

      {/* ✅ Section 4 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-green-700 dark:text-green-300">
            <li>Import the array module: <code>import array</code></li>
            <li>Create an array: <code>nums = array.array('i', [1,2,3])</code></li>
            <li>Add an item: <code>nums.append(4)</code></li>
            <li>Insert an item at position 1: <code>nums.insert(1,10)</code></li>
            <li>Remove an item: <code>nums.remove(2)</code></li>
            <li>Check the length: <code>len(nums)</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 5 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use arrays when you need type-specific storage for efficiency</li>
            <li>Use lists for general-purpose, mixed-type collections</li>
            <li>Prefer built-in array methods for insertion, deletion, and searching</li>
            <li>Remember arrays from <code>array</code> module are less flexible than lists</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 6 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create an array of integers from 1 to 5</li>
            <li>Insert a number at the start of the array</li>
            <li>Remove the last number and print it</li>
            <li>Find the index of a specific number</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 7 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Arrays store items of the same type and are memory-efficient</li>
            <li>Use array methods to add, remove, or search for items</li>
            <li>For mixed data types, prefer Python lists</li>
            <li>Arrays are ideal for performance-critical tasks where type consistency is important</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
