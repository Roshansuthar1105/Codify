/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function DocstringsTypeHintsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Docstrings & Type Hints</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Docstrings</strong> and <strong>Type Hints</strong> are essential features in Python for writing readable, maintainable, and self-documenting code. 
        Docstrings explain what a function, class, or module does, while type hints specify the expected types of variables and function parameters.
      </p>

      {/* ✅ Section 1 - What Are Docstrings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What Are Docstrings
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            A <strong>docstring</strong> is a string literal that occurs as the first statement in a module, function, class, or method.
            They are used to document what the block of code does.
          </p>
        </div>

        <CodeBlock
          code={`def add(a, b):
    """
    Add two numbers and return the result.
    
    Parameters:
    a (int): First number
    b (int): Second number
    
    Returns:
    int: Sum of a and b
    """
    return a + b

print(add.__doc__)`}
        />
      </section>

      {/* ✅ Section 2 - Multi-line Docstrings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Multi-line Docstrings
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Multi-line docstrings provide detailed documentation including description, parameters, return type, and examples.
          </p>
        </div>

        <CodeBlock
          code={`def factorial(n):
    """
    Calculate the factorial of a number using recursion.
    
    Parameters:
    n (int): Non-negative integer
    
    Returns:
    int: Factorial of n
    
    Example:
    >>> factorial(5)
    120
    """
    if n == 0:
        return 1
    return n * factorial(n - 1)`}
        />
      </section>

      {/* ✅ Section 3 - Accessing Docstrings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Accessing Docstrings
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            You can access docstrings using the <code>.__doc__</code> attribute or the <code>help()</code> function.
          </p>
        </div>

        <CodeBlock
          code={`print(factorial.__doc__)

help(factorial)`}
        />
      </section>

      {/* ✅ Section 4 - Why Docstrings Are Important */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Why Docstrings Are Important
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-purple-700 dark:text-purple-300 space-y-2">
            <li>Provides built-in documentation for your code.</li>
            <li>Makes your code readable by other developers.</li>
            <li>Used by IDEs and documentation tools to generate help files.</li>
            <li>Encourages writing self-explanatory functions and modules.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 5 - Type Hints Basics */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Type Hints Basics
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Type hints allow you to specify the expected data types of function parameters and return values. 
            They help with code readability, IDE suggestions, and static type checking.
          </p>
        </div>

        <CodeBlock
          code={`def greet(name: str, age: int) -> str:
    return f"Hello {name}, you are {age} years old."

print(greet("Swayam", 20))`}
        />
      </section>

      {/* ✅ Section 6 - Advanced Type Hints */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advanced Type Hints
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Python's <code>typing</code> module allows more complex hints like Union, List, Dict, Optional, and Tuple.
          </p>
        </div>

        <CodeBlock
          code={`from typing import List, Dict, Union, Optional

def process_data(data: List[int], config: Optional[Dict[str, str]] = None) -> Union[int, None]:
    if not data:
        return None
    return sum(data)`}
        />
      </section>

      {/* ✅ Section 7 - Docstrings with Type Hints */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Combining Docstrings & Type Hints
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Use docstrings to explain the purpose of the function, while type hints provide the expected data types.
          </p>
        </div>

        <CodeBlock
          code={`def calculate_average(scores: List[float]) -> float:
    """
    Calculate the average of a list of scores.
    
    Parameters:
    scores (List[float]): List of numeric scores
    
    Returns:
    float: Average score
    """
    return sum(scores) / len(scores) if scores else 0.0`}
        />
      </section>

      {/* ✅ Section 8 - Benefits */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Benefits of Docstrings & Type Hints
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-purple-700 dark:text-purple-300 space-y-2">
            <li>Improves code readability and maintainability</li>
            <li>Helps catch type errors early with static analysis tools like mypy</li>
            <li>Provides built-in documentation for IDEs and tools</li>
            <li>Encourages writing clean, well-structured, and self-explanatory code</li>
            <li>Supports team collaboration with consistent function signatures</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 9 - Real-World Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Real-World Examples
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
            1️⃣ API Function
          </h3>
          <CodeBlock
            code={`def fetch_user_data(user_id: int) -> Dict[str, str]:
    """
    Fetch user data from the API.
    
    Parameters:
    user_id (int): User identifier
    
    Returns:
    Dict[str, str]: User information
    """
    return {"name": "Swayam", "role": "Developer"}`}
          />

          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mt-6 mb-2">
            2️⃣ Data Processing
          </h3>
          <CodeBlock
            code={`def process_scores(scores: List[float]) -> float:
    """
    Process and return average score.
    
    Parameters:
    scores (List[float]): List of numeric scores
    
    Returns:
    float: Average score
    """
    return sum(scores)/len(scores) if scores else 0.0`}
          />
        </div>
      </section>

      {/* ✅ Section 10 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Write a function with docstring explaining parameters and return value.</li>
            <li>Add type hints for all parameters and return types.</li>
            <li>Use Union, Optional, and List from the <code>typing</code> module.</li>
            <li>Access and print the docstring using <code>.__doc__</code>.</li>
            <li>Run static type checking with <code>mypy</code> or similar tools.</li>
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
            <li>Docstrings document what your functions, classes, and modules do.</li>
            <li>Type hints specify expected types for better readability and static analysis.</li>
            <li>Combining docstrings with type hints improves maintainability and collaboration.</li>
            <li>Use <code>typing</code> module for advanced type hints.</li>
            <li>Follow these practices to make Python code self-explanatory and robust.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
