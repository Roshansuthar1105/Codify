/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function LambdaFunctions() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-purple-600 dark:text-purple-400">Lambda Functions</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Lambda functions</strong> are small, anonymous functions defined with the{" "}
        <code>lambda</code> keyword. They can take any number of arguments but only one expression.
        They're perfect for short, simple operations.
      </p>

      {/* ✅ Section 1 - What are Lambda Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What are Lambda Functions?
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Think of lambda functions as quick, disposable functions — like sticky notes for your
            code. You use them once and throw them away, without a formal function definition.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Anonymous:</strong> No name required</li>
          <li><strong>Single Expression:</strong> Only one expression allowed</li>
          <li><strong>Inline:</strong> Defined where they're used</li>
          <li><strong>Concise:</strong> Shorter than regular functions</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Basic Syntax */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Syntax</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The syntax is simple: <code>lambda arguments: expression</code>
        </p>
        <CodeBlock
          code={`# Basic examples
square = lambda x: x ** 2
print(square(5))  # 25

add = lambda a, b: a + b
print(add(10, 20))  # 30

greet = lambda name: f"Hello, {name}!"
print(greet("Alice"))  # Hello, Alice!`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Each lambda takes arguments and returns the result of the expression — no{" "}
          <code>return</code> keyword needed.
        </p>
      </section>

      {/* ✅ Section 3 - Lambda vs Regular Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Lambda vs Regular Functions
        </h2>
        <CodeBlock
          code={`# Regular function
def square_regular(x):
    return x ** 2

# Lambda function
square_lambda = lambda x: x ** 2

print(square_regular(4))  # 16
print(square_lambda(4))   # 16`}
        />
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Lambda:</strong> Shorter, anonymous, single-line</li>
            <li><strong>Regular:</strong> More readable, reusable, multi-statement</li>
            <li>Use lambda for simple one-liners or inline use</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 4 - With Built-in Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using Lambda with Built-in Functions
        </h2>
        <CodeBlock
          code={`numbers = [1, 2, 3, 4, 5]

# map()
squared = list(map(lambda x: x**2, numbers))
print("Squared:", squared)

# filter()
even = list(filter(lambda x: x % 2 == 0, numbers))
print("Even numbers:", even)

# sorted()
names = ["Alice", "Bob", "Charlie"]
sorted_names = sorted(names, key=lambda name: len(name))
print("Sorted by length:", sorted_names)`}
        />
      </section>

      {/* ✅ Section 5 - Multiple Arguments */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Multiple Arguments
        </h2>
        <CodeBlock
          code={`multiply = lambda x, y: x * y
print(multiply(5, 6))  # 30

calc = lambda a, b, c: a + b * c
print(calc(2, 3, 4))  # 14

get_pi = lambda: 3.14159
print(get_pi())  # 3.14159`}
        />
      </section>

      {/* ✅ Section 6 - Conditional Logic */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Conditional Logic
        </h2>
        <CodeBlock
          code={`check_even = lambda x: "even" if x % 2 == 0 else "odd"
print(check_even(7))  # odd

max_num = lambda a, b: a if a > b else b
print(max_num(10, 20))  # 20`}
        />
      </section>

      {/* ✅ Section 7 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-purple-700 dark:text-purple-300">
            <li>Create a list of numbers</li>
            <li>Use <code>map()</code> to square numbers</li>
            <li>Use <code>filter()</code> to get even numbers</li>
            <li>Use <code>sorted()</code> to sort by last digit</li>
          </ol>
        </div>
        <CodeBlock
          code={`numbers = [1, 2, 3, 4, 5, 6]

squared = list(map(lambda x: x**2, numbers))
print("Squared:", squared)

evens = list(filter(lambda x: x % 2 == 0, numbers))
print("Evens:", evens)

sorted_nums = sorted(numbers, key=lambda x: x % 10)
print("Sorted by last digit:", sorted_nums)`}
        />
      </section>

      {/* ✅ Section 8 - Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Use lambdas only for simple one-line functions</li>
            <li>Avoid using lambdas for complex logic</li>
            <li>Always keep readability in mind</li>
            <li>Use descriptive variable names</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 9 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a lambda that reverses a string</li>
            <li>Use filter to find numbers divisible by 3</li>
            <li>Check if a string contains vowels using lambda</li>
            <li>Sort words by their last character</li>
            <li>Create a lambda to calculate rectangle area</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <ul className="text-purple-800 dark:text-purple-300 space-y-2">
            <li>Lambda functions are anonymous and concise</li>
            <li>Use with <code>map()</code>, <code>filter()</code>, <code>sorted()</code></li>
            <li>Can handle multiple arguments and simple conditions</li>
            <li>Best for one-line expressions</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
