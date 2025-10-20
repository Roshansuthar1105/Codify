/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function PEP8Doc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">PEP 8</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>PEP 8</strong> is Python's official style guide, providing coding conventions for writing readable, consistent, and maintainable Python code. Following PEP 8 ensures uniform code style across projects and teams.
      </p>

      {/* ✅ Section 1 - Naming Conventions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Naming Conventions
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            PEP 8 defines rules for naming variables, functions, classes, and constants to improve readability.
          </p>
        </div>

        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Variables & Functions:</strong> lowercase_with_underscores</li>
          <li><strong>Classes:</strong> CapitalizedWords (CamelCase)</li>
          <li><strong>Constants:</strong> ALL_CAPS_WITH_UNDERSCORES</li>
          <li><strong>Modules & Packages:</strong> short_lowercase_names</li>
        </ul>

        <CodeBlock
          code={`# Variable and function
user_name = "Swayam"
def calculate_age(birth_year):
    return 2025 - birth_year

# Class
class UserProfile:
    pass

# Constant
MAX_USERS = 100`}
        />
      </section>

      {/* ✅ Section 2 - Indentation */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Indentation
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            PEP 8 recommends using <strong>4 spaces per indentation level</strong>. Avoid mixing tabs and spaces.
          </p>
        </div>

        <CodeBlock
          code={`def greet(name):
    if name:
        print(f"Hello, {name}!")
    else:
        print("Hello, Guest!")`}
        />
      </section>

      {/* ✅ Section 3 - Line Length & Wrapping */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Line Length & Wrapping
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Limit all lines to <strong>79 characters</strong> for code, and 72 for docstrings. Use parentheses or backslashes to wrap long lines.
          </p>
        </div>

        <CodeBlock
          code={`# Recommended wrapping
def send_email(to, subject, body):
    return smtp.send_message(
        to=to,
        subject=subject,
        body=body
    )`}
        />
      </section>

      {/* ✅ Section 4 - Blank Lines */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Blank Lines
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Use blank lines to separate top-level functions, class definitions, and method definitions inside classes.
          </p>
        </div>

        <CodeBlock
          code={`class MyClass:
    def method_one(self):
        pass

    def method_two(self):
        pass`}
        />
      </section>

      {/* ✅ Section 5 - Imports */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Imports
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            Imports should be on separate lines. Order: standard library → third-party → local modules.
          </p>
        </div>

        <CodeBlock
          code={`# Correct
import os
import sys

import requests

from mymodule import helper_function

# Incorrect
import sys, os`}
        />
      </section>

      {/* ✅ Section 6 - Whitespace */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Whitespace
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Avoid extra spaces in expressions and statements.
          </p>
        </div>

        <CodeBlock
          code={`# Correct
x = 5
y = x + 3

# Incorrect
x    = 5
y = x+3`}
        />
      </section>

      {/* ✅ Section 7 - Comments & Docstrings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Comments & Docstrings
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Write meaningful comments and docstrings. Use triple quotes for multi-line docstrings.
          </p>
        </div>

        <CodeBlock
          code={`def add(a, b):
    """
    Add two numbers and return the result.
    """
    return a + b

# Inline comment
x = add(2, 3)  # result stored in x`}
        />
      </section>

      {/* ✅ Section 8 - String Quotes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          String Quotes
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Consistently use single or double quotes. Choose one style and stick to it.
          </p>
        </div>

        <CodeBlock
          code={`# Single quotes
name = 'Swayam'

# Double quotes
greeting = "Hello"`}
        />
      </section>

      {/* ✅ Section 9 - Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Practices
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-purple-700 dark:text-purple-300 space-y-2">
            <li>Follow consistent naming conventions</li>
            <li>Keep lines under 79 characters</li>
            <li>Use 4 spaces for indentation</li>
            <li>Write clear comments and docstrings</li>
            <li>Organize imports properly</li>
            <li>Use whitespace thoughtfully for readability</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 10 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Refactor a script to follow PEP 8 indentation and line length rules.</li>
            <li>Rename variables and functions to match PEP 8 naming conventions.</li>
            <li>Reorganize imports according to standard, third-party, and local order.</li>
            <li>Add meaningful docstrings to all functions and classes.</li>
            <li>Check code consistency with a linter like <code>flake8</code>.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 11 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>PEP 8 is Python's official style guide for clean, readable code.</li>
            <li>Follow naming conventions for variables, functions, classes, and constants.</li>
            <li>Use 4-space indentation, limit line length, and manage whitespace properly.</li>
            <li>Write meaningful comments and docstrings for clarity.</li>
            <li>Organize imports and maintain consistent code style across projects.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
