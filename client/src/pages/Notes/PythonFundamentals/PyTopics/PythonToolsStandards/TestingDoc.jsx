/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function TestingDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Testing</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Testing helps you verify that your code works correctly. It catches bugs early, improves reliability, 
        and Python provides built-in tools to make testing simple and effective.
      </p>

      {/* ✅ Section 1 - Why Test Your Code */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Why Test Your Code?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <ul className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>• Find bugs before users encounter them</li>
            <li>• Ensure changes don't break existing functionality</li>
            <li>• Document how your code should behave</li>
            <li>• Build confidence in your software</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 2 - Basic Testing with unittest */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Basic Testing with unittest
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Sample Functions to Test</h4>
          <CodeBlock
            code={`# math_functions.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b`}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Writing Tests</h4>
          <CodeBlock
            code={`# test_math_functions.py
import unittest
from math_functions import add, multiply, divide

class TestMathFunctions(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

    def test_multiply(self):
        self.assertEqual(multiply(3, 4), 12)
        self.assertEqual(multiply(-2, 3), -6)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == '__main__':
    unittest.main()`}
          />
        </div>
      </section>

      {/* ✅ Section 3 - Running Tests */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Running Tests
        </h2>

        <CodeBlock
          code={`# Run a single test file
python test_math_functions.py

# Run all tests in directory
python -m unittest discover

# Run with verbose output
python -m unittest -v

# Run specific test
python -m unittest test_math_functions.TestMathFunctions.test_add`}
        />
      </section>

      {/* ✅ Section 4 - Common Test Methods */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Test Methods
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Equality Tests</h3>
            <CodeBlock
              code={`self.assertEqual(a, b)
self.assertNotEqual(a, b)
self.assertTrue(condition)
self.assertFalse(condition)`}
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">Other Checks</h3>
            <CodeBlock
              code={`self.assertIsNone(value)
self.assertRaises(ValueError, func, args)
self.assertIn(item, list)`}
            />
          </div>
        </div>
      </section>

      {/* ✅ Section 5 - Testing Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Testing Best Practices
        </h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Good Test Names</h4>
            <CodeBlock
              code={`def test_add_positive_numbers(self):
    pass

def test_divide_by_zero_raises_error(self):
    pass

# Bad example
def test_function1(self):
    pass`}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Test Organization</h4>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
              <li>• Keep tests in separate files (test_*.py)</li>
              <li>• One test class per module</li>
              <li>• Test one thing at a time</li>
              <li>• Use descriptive names</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ✅ Section 6 - Real Example: Testing a Class */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Real Example: Testing a Class
        </h2>

        <CodeBlock
          code={`# calculator.py
class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, value):
        self.result += value
        return self.result
    
    def reset(self):
        self.result = 0

# test_calculator.py
import unittest
from calculator import Calculator

class TestCalculator(unittest.TestCase):

    def setUp(self):
        self.calc = Calculator()

    def test_initial_result_is_zero(self):
        self.assertEqual(self.calc.result, 0)

    def test_add_single_number(self):
        result = self.calc.add(5)
        self.assertEqual(result, 5)
        self.assertEqual(self.calc.result, 5)

    def test_add_multiple_numbers(self):
        self.calc.add(3)
        self.calc.add(7)
        self.assertEqual(self.calc.result, 10)

    def test_reset(self):
        self.calc.add(10)
        self.calc.reset()
        self.assertEqual(self.calc.result, 0)`}
        />
      </section>

      {/* ✅ Section 7 - Testing Checklist */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Testing Checklist</h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>• Test normal cases (typical usage)</li>
            <li>• Test edge cases (empty inputs, large numbers)</li>
            <li>• Test error cases (invalid inputs)</li>
            <li>• Keep tests simple and focused</li>
            <li>• Run tests regularly during development</li>
          </ul>

          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
            <strong>Practice:</strong> Write tests for a simple Bank Account class with deposit and withdraw methods!
          </div>
        </div>
      </section>
    </div>
  );
}
