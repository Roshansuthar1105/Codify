/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ListComprehensionDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">List Comprehension</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        List comprehensions provide a clean, powerful, and compact way to create new lists by transforming or filtering existing ones — all in a single line of Python code.
      </p>

      {/* ✅ Section 1 - What & Why */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is List Comprehension?
        </h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            A <strong>list comprehension</strong> lets you build a list from any iterable in one line — it replaces basic loops and makes code more readable.
          </p>
        </div>

        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Compact syntax for building lists</li>
          <li>Great for filtering or transforming data</li>
          <li>Easier to read for simple logic</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Syntax */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Syntax</h2>
        <CodeBlock code={`[expression for item in iterable if condition]`} />
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>expression</strong> → defines what each element becomes</li>
            <li><strong>for item in iterable</strong> → source data loop</li>
            <li><strong>if condition</strong> → optional filter condition</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 3 - Step by Step */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Build Step-by-Step</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-green-700 dark:text-green-300">
            <li>Pick an iterable — <code>range(5)</code> or <code>[1, 2, 3]</code></li>
            <li>Choose the transformation — <code>x ** 2</code></li>
            <li>Add a filter — <code>if x % 2 == 0</code></li>
            <li>Combine them: <code>[x ** 2 for x in range(5) if x % 2 == 0]</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 4 - Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Examples</h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Basic Example</h4>
            <CodeBlock code={`squares = [x**2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]`} />
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">With Condition</h4>
            <CodeBlock code={`evens = [x for x in range(10) if x % 2 == 0]\nprint(evens)  # [0, 2, 4, 6, 8]`} />
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Transform Strings</h4>
            <CodeBlock code={`names = ["alice", "bob", "charlie"]\nupper = [n.upper() for n in names]\nprint(upper)  # ['ALICE', 'BOB', 'CHARLIE']`} />
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Flatten Nested Lists</h4>
            <CodeBlock code={`nested = [[1, 2], [3, 4]]\nflat = [n for sub in nested for n in sub]\nprint(flat)  # [1, 2, 3, 4]`} />
          </div>
        </div>
      </section>

      {/* ✅ Section 5 - Dict & Set Comprehension */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Dictionary & Set Comprehension
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Python also supports comprehensions for dictionaries and sets — same concept, different brackets.
          </p>
        </div>
        <CodeBlock
          code={`# Dictionary comprehension
scores = {name: s for name, s in [('a', 10), ('b', 12)]}
print(scores)  # {'a': 10, 'b': 12}

# Set comprehension
unique = {x**2 for x in [1, 1, 2, 2]}
print(unique)  # {1, 4}`}
        />
      </section>

      {/* ✅ Section 6 - When to Avoid */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">When to Avoid</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-red-700 dark:text-red-300">
            <li>When logic is too complex or multi-line</li>
            <li>When it becomes hard to read</li>
            <li>When using side effects like print() or file I/O</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tips & Best Practices</h2>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Keep comprehensions short and focused</li>
            <li>Use generator expressions for large datasets: <code>(x**2 for x in range(10**6))</code></li>
            <li>Use meaningful variable names</li>
            <li>Move complex logic into helper functions</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Exercises</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a list of cubes from 0–5</li>
            <li>From ["apple", "kiwi", "pear"], make a list of word lengths</li>
            <li>Flatten [[1], [2, 3], [4]] into one list</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>List comprehensions make list creation concise and clean</li>
            <li>Best for simple transformations and filters</li>
            <li>Use normal loops for complex multi-step logic</li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-700 pt-4 text-sm text-gray-600 dark:text-gray-400">
        Want this explained in Hindi or as Markdown? Just ask — I’ll extend it for you!
      </footer>
    </div>
  );
}
