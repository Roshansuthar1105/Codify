/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function CodeFormattingLintingDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Code Formatting & Linting</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Code formatting and linting help maintain readability, consistency, and quality in Python projects. They catch errors, enforce style rules, and improve collaboration across teams.
      </p>

      {/* ✅ Section 1 - What is Code Formatting */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Code Formatting?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Code formatting ensures your Python code follows a consistent structure, including indentation, line breaks, whitespace, and naming conventions.
          </p>
        </div>

        <CodeBlock
          code={`# Unformatted code
def add(a,b):return a+b

# Formatted code
def add(a, b):
    return a + b`}
        />
      </section>

      {/* ✅ Section 2 - Popular Formatters */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Popular Formatters
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Tools like <code>black</code>, <code>autopep8</code>, and <code>yapf</code> automatically format your Python code according to PEP 8 standards.
          </p>
        </div>

        <CodeBlock
          code={`# Using black
pip install black
black script.py

# Using autopep8
pip install autopep8
autopep8 --in-place --aggressive script.py`}
        />
      </section>

      {/* ✅ Section 3 - What is Linting */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Linting?
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Linting analyzes code for potential errors, code smells, and style violations. Linters catch bugs before runtime and enforce coding standards.
          </p>
        </div>

        <CodeBlock
          code={`# Example of linting with pylint
pip install pylint
pylint script.py

# Output includes warnings, errors, and suggestions`}
        />
      </section>

      {/* ✅ Section 4 - Popular Linters */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Popular Linters
        </h2>
        <CodeBlock
          code={`# pylint: checks for errors and style
# flake8: style guide enforcement
# mypy: static type checking
# prospector: combines multiple tools for comprehensive linting`}
        />
      </section>

      {/* ✅ Section 5 - Integrating Formatting & Linting */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Integrating Formatting & Linting
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Combine formatters and linters in your development workflow to maintain high-quality code.
          </p>
        </div>

        <CodeBlock
          code={`# Format and lint
black script.py
pylint script.py

# Optionally add pre-commit hooks to automate checks before commits`}
        />
      </section>

      {/* ✅ Section 6 - Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Practices
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>Use a consistent formatter across the project</li>
            <li>Run linters before committing code</li>
            <li>Integrate formatters and linters with IDEs</li>
            <li>Set up pre-commit hooks for automated checks</li>
            <li>Regularly update formatting and linting tools</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Quick Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Workflow
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ol className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>1. Write code normally</li>
            <li>2. Run formatter: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">black script.py</code></li>
            <li>3. Run linter: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">pylint script.py</code></li>
            <li>4. Fix issues suggested by linter</li>
            <li>5. Commit code</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Code formatting ensures consistent style and readability.</li>
            <li>Linters detect errors, enforce best practices, and improve code quality.</li>
            <li>Popular tools include <code>black</code>, <code>autopep8</code>, <code>pylint</code>, and <code>flake8</code>.</li>
            <li>Combine formatting and linting in workflows or pre-commit hooks.</li>
            <li>Follow best practices to maintain clean and maintainable code.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
