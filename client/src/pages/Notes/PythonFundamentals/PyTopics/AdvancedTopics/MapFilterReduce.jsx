/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function MapFilterReduce() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Map, Filter & Reduce</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        The <strong>map()</strong>, <strong>filter()</strong>, and <strong>reduce()</strong> functions in Python are 
        built-in tools for functional programming. They help process sequences like lists in a clean and powerful way.
      </p>

      {/* ✅ Section 1 - Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What Are Map, Filter, and Reduce?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Think of them like data transformers:
            <br />
            <strong>map()</strong> → Transform items,
            <strong> filter()</strong> → Select items,
            <strong> reduce()</strong> → Combine items.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>map():</strong> Applies a function to each item in an iterable.</li>
          <li><strong>filter():</strong> Keeps items that satisfy a condition.</li>
          <li><strong>reduce():</strong> Combines all items into a single result (from functools module).</li>
        </ul>
      </section>

      {/* ✅ Section 2 - map() Function */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Using map()</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>map()</code> function takes two parameters — a function and an iterable. It returns a new iterator with the transformed elements.
        </p>
        <CodeBlock
          code={`nums = [1, 2, 3, 4]
# Square each number
squared = list(map(lambda x: x**2, nums))
print(squared)  # [1, 4, 9, 16]`}
        />
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
          <p className="text-gray-700 dark:text-gray-300">
            💡 <strong>Tip:</strong> <code>map()</code> is great for applying simple transformations like converting, squaring, or formatting items.
          </p>
        </div>
      </section>

      {/* ✅ Section 3 - filter() Function */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Using filter()</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>filter()</code> function filters elements from an iterable based on a condition that returns <code>True</code> or <code>False</code>.
        </p>
        <CodeBlock
          code={`nums = [1, 2, 3, 4, 5, 6]
# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6]`}
        />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            ⚡ <strong>Note:</strong> If no items satisfy the condition, <code>filter()</code> returns an empty list.
          </p>
        </div>
      </section>

      {/* ✅ Section 4 - reduce() Function */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Using reduce()</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>reduce()</code> function, from the <code>functools</code> module, applies a function cumulatively to items in an iterable.
        </p>
        <CodeBlock
          code={`from functools import reduce
nums = [1, 2, 3, 4]
# Sum all numbers
total = reduce(lambda a, b: a + b, nums)
print(total)  # 10`}
        />
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
          <p className="text-green-700 dark:text-green-300">
            ✅ <strong>Use reduce()</strong> when you need a single cumulative result — like sum, product, or max.
          </p>
        </div>
      </section>

      {/* ✅ Section 5 - Combined Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Combined Example</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can combine <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> to perform complex data operations efficiently.
        </p>
        <CodeBlock
          code={`from functools import reduce

nums = [1, 2, 3, 4, 5, 6]

# Double the numbers
mapped = list(map(lambda x: x * 2, nums))

# Keep numbers greater than 5
filtered = list(filter(lambda x: x > 5, mapped))

# Find the sum
reduced = reduce(lambda a, b: a + b, filtered)

print("Mapped:", mapped)     # [2, 4, 6, 8, 10, 12]
print("Filtered:", filtered) # [6, 8, 10, 12]
print("Reduced:", reduced)   # 36`}
        />
      </section>

      {/* ✅ Section 6 - Real-Life Use Cases */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-Life Use Cases</h2>
        <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>map()</strong> → Converting temperatures from °C to °F</li>
          <li><strong>filter()</strong> → Selecting products above a certain rating</li>
          <li><strong>reduce()</strong> → Calculating total cart price</li>
        </ul>
      </section>

      {/* ✅ Section 7 - Practice Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Use <code>map()</code> to convert a list of strings to uppercase.</li>
            <li>Use <code>filter()</code> to get numbers divisible by 3 from a list.</li>
            <li>Use <code>reduce()</code> to find the product of all elements.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li><code>map()</code> → Transform each element</li>
            <li><code>filter()</code> → Keep items meeting a condition</li>
            <li><code>reduce()</code> → Combine all items into one value</li>
            <li>They make code cleaner and more readable</li>
          </ul>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Pro Tip:</strong> Combine <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> for efficient data transformation pipelines!
        </p>
      </div>
    </div>
  );
}
