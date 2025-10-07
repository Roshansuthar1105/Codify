/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ExceptionHandlingDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-red-600 dark:text-red-400">Exception Handling</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Exception Handling</strong> in Python allows your program to deal with unexpected errors
        gracefully without crashing. By using <code>try</code>, <code>except</code>, <code>else</code>, and <code>finally</code> blocks,
        you can catch errors, handle them properly, and ensure resources are released correctly.
      </p>

      {/* ✅ Section 1 - What are Exceptions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What are Exceptions?
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            An <strong>exception</strong> is an error that occurs during program execution and disrupts
            the normal flow of the program. Examples include dividing by zero, accessing invalid indexes, or opening a missing file.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Example:</strong> Dividing by zero causes <code>ZeroDivisionError</code>.</li>
          <li><strong>Goal:</strong> Prevent program crashes by handling such cases.</li>
          <li><strong>Solution:</strong> Use try-except blocks to "catch" errors and handle them.</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Basic Try-Except Block */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Basic Try-Except Block
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The simplest form of error handling uses <code>try</code> and <code>except</code>.
          Code inside <code>try</code> is executed, and if an error occurs, control passes to <code>except</code>.
        </p>
        <CodeBlock
          code={`try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

print("Program continues...")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Instead of crashing, the program prints the error message and continues executing further code.
        </p>
      </section>

      {/* ✅ Section 3 - Handling Multiple Exceptions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Handling Multiple Exceptions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can handle multiple types of errors by writing different <code>except</code> clauses for each specific exception.
        </p>
        <CodeBlock
          code={`try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print("Result:", result)
except ValueError:
    print("Invalid input! Please enter a valid number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print("Unexpected error:", e)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          This helps you control specific errors separately and catch any unknown issues with the generic <code>Exception</code> block.
        </p>
      </section>

      {/* ✅ Section 4 - Try, Except, Else, and Finally */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Try, Except, Else, and Finally
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python provides two additional blocks: <code>else</code> and <code>finally</code>.
          The <code>else</code> block runs only if no exception occurs, and <code>finally</code> always executes,
          making it ideal for cleanup operations like closing files or connections.
        </p>
        <CodeBlock
          code={`try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
else:
    print("File read successfully!")
    print("Content length:", len(content))
finally:
    print("Cleaning up resources...")
    try:
        file.close()
    except:
        pass`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: The <code>finally</code> block ensures that resources like open files are properly closed,
          whether or not an error occurs.
        </p>
      </section>

      {/* ✅ Section 5 - Raising Custom Exceptions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Raising Custom Exceptions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can raise your own exceptions using the <code>raise</code> keyword.
          This is useful for enforcing specific conditions or validation checks.
        </p>
        <CodeBlock
          code={`def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    age = int(input("Enter your age: "))
    validate_age(age)
    print("Your age is valid.")
except ValueError as e:
    print("Error:", e)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: The function raises an error if the input doesn’t meet the given conditions.
          This ensures data integrity and better validation logic.
        </p>
      </section>

      {/* ✅ Section 6 - Common Exception Types */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Exception Types
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>ValueError:</strong> Invalid value provided to a function.</li>
            <li><strong>TypeError:</strong> Operation applied to incompatible data types.</li>
            <li><strong>IndexError:</strong> Accessing an index out of range in a list.</li>
            <li><strong>KeyError:</strong> Accessing a non-existent key in a dictionary.</li>
            <li><strong>FileNotFoundError:</strong> Trying to open a missing file.</li>
            <li><strong>ZeroDivisionError:</strong> Dividing a number by zero.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Always catch specific exceptions instead of using a general <code>except:</code> clause.</li>
            <li>Use <code>finally</code> for cleanup operations like closing files or connections.</li>
            <li>Raise meaningful errors with clear messages for debugging.</li>
            <li>Avoid silently ignoring errors; always log or display them meaningfully.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Write a program that handles division by zero.</li>
            <li>Handle both <code>ValueError</code> and <code>TypeError</code> in a single program.</li>
            <li>Use <code>try-except-else-finally</code> for file operations.</li>
            <li>Create and raise a custom exception for invalid passwords.</li>
            <li>Practice handling unknown errors using <code>Exception</code>.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
          <ul className="text-red-800 dark:text-red-300 space-y-2">
            <li>Exceptions help prevent program crashes.</li>
            <li>Use try-except to handle predictable errors.</li>
            <li>Use else for successful execution blocks.</li>
            <li>Use finally for cleanup tasks.</li>
            <li>Raising custom exceptions improves validation and debugging.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
