/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ZipEnumerateRangeDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Zip, Enumerate & Range</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python provides powerful built-in functions like <strong>zip()</strong>, 
        <strong>enumerate()</strong>, and <strong>range()</strong> that help in 
        iterating over sequences efficiently. These are essential tools for loops, 
        data processing, and indexing.
      </p>

      {/* ✅ Section 1 - Python zip() */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Python <code>zip()</code> Function
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            <code>zip()</code> combines two or more iterables (lists, tuples, etc.) 
            element-wise into tuples.
          </p>
        </div>

        <CodeBlock
          code={`list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']

zipped = zip(list1, list2)
print(list(zipped))  # Output: [(1, 'a'), (2, 'b'), (3, 'c')]`}
        />

        <CodeBlock
          code={`# Zip with unequal length
list1 = [1, 2, 3, 4]
list2 = ['x', 'y']

print(list(zip(list1, list2)))  # Output: [(1, 'x'), (2, 'y')]`}
        />
      </section>

      {/* ✅ Section 2 - Iterating with zip() */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Iterating Using <code>zip()</code>
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            You can iterate over multiple lists simultaneously.
          </p>
        </div>

        <CodeBlock
          code={`names = ["Alice", "Bob", "Charlie"]
scores = [85, 90, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Output:
        </p>
        <CodeBlock
          code={`Alice: 85
Bob: 90
Charlie: 78`}
        />
      </section>

      {/* ✅ Section 3 - Python enumerate() */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Python <code>enumerate()</code> Function
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            <code>enumerate()</code> adds a counter to an iterable, which is useful for getting both index and value in a loop.
          </p>
        </div>

        <CodeBlock
          code={`fruits = ['apple', 'banana', 'cherry']

for index, fruit in enumerate(fruits):
    print(index, fruit)

# Output:
# 0 apple
# 1 banana
# 2 cherry`}
        />

        <CodeBlock
          code={`# Start counting from 1
for index, fruit in enumerate(fruits, start=1):
    print(index, fruit)

# Output:
# 1 apple
# 2 banana
# 3 cherry`}
        />
      </section>

      {/* ✅ Section 4 - Combining zip() and enumerate() */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Combining <code>zip()</code> and <code>enumerate()</code>
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            You can enumerate zipped iterables to get the index along with multiple values.
          </p>
        </div>

        <CodeBlock
          code={`students = ["Alice", "Bob", "Charlie"]
subjects = ["Math", "Science", "History"]

for idx, (student, subject) in enumerate(zip(students, subjects), start=1):
    print(f"{idx}. {student} - {subject}")`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">Output:</p>
        <CodeBlock
          code={`1. Alice - Math
2. Bob - Science
3. Charlie - History`}
        />
      </section>

      {/* ✅ Section 5 - Python range() */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Python <code>range()</code> Function
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            <code>range()</code> generates a sequence of numbers, commonly used in loops.
          </p>
        </div>

        <CodeBlock
          code={`# Basic usage
for i in range(5):
    print(i)
# Output: 0 1 2 3 4`}
        />

        <CodeBlock
          code={`# Specifying start and end
for i in range(2, 7):
    print(i)
# Output: 2 3 4 5 6`}
        />

        <CodeBlock
          code={`# Specifying step
for i in range(1, 10, 2):
    print(i)
# Output: 1 3 5 7 9`}
        />
      </section>

      {/* ✅ Section 6 - Using range with lists */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>range()</code> with Lists
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            <code>range()</code> is often combined with <code>len()</code> to iterate over indices.
          </p>
        </div>

        <CodeBlock
          code={`colors = ["red", "green", "blue"]

for i in range(len(colors)):
    print(f"Color {i}: {colors[i]}")`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">Output:</p>
        <CodeBlock
          code={`Color 0: red
Color 1: green
Color 2: blue`}
        />
      </section>

      {/* ✅ Section 7 - Advanced Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advanced Examples
        </h2>

        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-2">
            1️⃣ Parallel Iteration with zip
          </h3>
          <CodeBlock
            code={`list1 = [10, 20, 30]
list2 = [1, 2, 3]
result = [x + y for x, y in zip(list1, list2)]
print(result)  # Output: [11, 22, 33]`}
          />

          <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mt-6 mb-2">
            2️⃣ Nested Loops with range
          </h3>
          <CodeBlock
            code={`for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}")`}
          />

          <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mt-6 mb-2">
            3️⃣ Creating Indexed Dictionary using enumerate
          </h3>
          <CodeBlock
            code={`fruits = ['apple', 'banana', 'cherry']
indexed_dict = {idx: fruit for idx, fruit in enumerate(fruits, start=1)}
print(indexed_dict)
# Output: {1: 'apple', 2: 'banana', 3: 'cherry'}`}
          />

          <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mt-6 mb-2">
            4️⃣ Zipping Multiple Lists
          </h3>
          <CodeBlock
            code={`a = [1,2,3]
b = [4,5,6]
c = [7,8,9]

for x, y, z in zip(a, b, c):
    print(x, y, z)`}
          />
        </div>
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Combine two lists of your choice using <code>zip()</code>.</li>
            <li>Enumerate a list of your favorite movies starting index 1.</li>
            <li>Use <code>range()</code> to print all even numbers between 10 and 30.</li>
            <li>Use <code>zip()</code> with three lists and print element-wise sum.</li>
            <li>Create a dictionary using <code>enumerate()</code> and a list of fruits.</li>
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
            <li><code>zip()</code> combines multiple iterables element-wise.</li>
            <li><code>enumerate()</code> adds an index to iterable elements.</li>
            <li><code>range()</code> generates numeric sequences efficiently.</li>
            <li>These functions simplify loops, indexing, and parallel iteration.</li>
            <li>They are foundational for data processing and Pythonic loops.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
