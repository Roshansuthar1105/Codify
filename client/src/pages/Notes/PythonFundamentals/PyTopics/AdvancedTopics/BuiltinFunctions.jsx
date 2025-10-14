/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function BuiltinFunctionsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-purple-600 dark:text-purple-400">Built-in Functions</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python provides a rich collection of <strong>built-in functions</strong> that help perform common operations
        such as mathematical calculations, data manipulation, type conversions, and sequence handling without the need
        for external libraries. These functions make Python powerful and expressive.
      </p>

      {/* ✅ Section 1 - Introduction to Built-in Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What Are Built-in Functions?
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Built-in functions are predefined functions in Python that are always available for use.
            They are part of the Python standard library and help reduce code complexity and improve performance.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>No need to import — they are automatically available.</li>
          <li>Cover mathematical, logical, and utility-based operations.</li>
          <li>Examples include <code>len()</code>, <code>type()</code>, <code>sum()</code>, <code>sorted()</code>, and more.</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Commonly Used Built-in Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Commonly Used Built-in Functions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Below are some of the most commonly used built-in functions that simplify day-to-day Python programming.
        </p>
        <CodeBlock
          code={`numbers = [3, 7, 1, 9, 5]

print("Length:", len(numbers))      # Count of elements
print("Maximum:", max(numbers))     # Largest value
print("Minimum:", min(numbers))     # Smallest value
print("Sum:", sum(numbers))         # Total sum
print("Sorted:", sorted(numbers))   # Returns a sorted list
print("Type:", type(numbers))       # <class 'list'>
print("Is list?", isinstance(numbers, list))  # True`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          These functions help perform frequent operations like checking types, sorting, and analyzing data efficiently.
        </p>
      </section>

      {/* ✅ Section 3 - Type Conversion Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Type Conversion Functions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python provides several built-in functions for converting one data type into another.
        </p>
        <CodeBlock
          code={`x = "123"
print(int(x))        # Convert string to integer -> 123
print(float(x))      # Convert string to float -> 123.0
print(str(456))      # Convert integer to string -> '456'
print(list("hello")) # Convert string to list -> ['h', 'e', 'l', 'l', 'o']
print(tuple([1, 2])) # Convert list to tuple -> (1, 2)`}
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mt-4">
          <p className="text-blue-700 dark:text-blue-300">
            💡 <strong>Tip:</strong> Always ensure conversions are valid; converting incompatible types (like <code>int("abc")</code>)
            will raise an error.
          </p>
        </div>
      </section>

      {/* ✅ Section 4 - Mathematical Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mathematical Functions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          These functions perform basic math operations without needing any imports.
        </p>
        <CodeBlock
          code={`print(abs(-10))     # Absolute value -> 10
print(pow(2, 3))     # Exponentiation -> 8
print(round(5.678, 2)) # Round to 2 decimal places -> 5.68`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          For advanced mathematical operations (like square roots, logarithms, or trigonometry), 
          you can use the <code>math</code> module.
        </p>
      </section>

      {/* ✅ Section 5 - Input & Utility Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Input and Utility Functions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Some built-in functions are used for user input, object inspection, and memory management.
        </p>
        <CodeBlock
          code={`# Get input from user
name = input("Enter your name: ")
print("Hello,", name)

# Get unique identifier for an object
x = 10
print(id(x))   # Unique memory address of variable x`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          <code>input()</code> takes user input as a string, while <code>id()</code> gives the object’s unique identifier in memory.
        </p>
      </section>

      {/* ✅ Section 6 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Use <code>help()</code> to explore any built-in function’s documentation.</li>
            <li>Be careful with type conversions; always validate your data before converting.</li>
            <li>Avoid shadowing built-in names (e.g., don’t name a variable <code>sum</code>).</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Find the largest and smallest number in a list using <code>max()</code> and <code>min()</code>.</li>
            <li>Convert a tuple into a list using <code>list()</code>.</li>
            <li>Get user input and display its type using <code>type()</code>.</li>
            <li>Sort a list of numbers in reverse order using <code>sorted()</code>.</li>
            <li>Calculate the total of a list using <code>sum()</code>.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <ul className="text-purple-800 dark:text-purple-300 space-y-2">
            <li>Python’s built-in functions simplify coding by providing ready-to-use operations.</li>
            <li>Common examples include <code>len()</code>, <code>sum()</code>, <code>sorted()</code>, and <code>type()</code>.</li>
            <li>Type conversion functions make it easy to switch between data types.</li>
            <li>Use <code>help()</code> to explore built-ins and learn their usage.</li>
            <li>Avoid overwriting function names to prevent confusion.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
