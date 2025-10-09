/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function FunctionAnnotationsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Function Annotations & Type Hinting</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python allows you to add <strong>function annotations</strong> to provide hints about the types 
        of arguments and return values. These hints are called <strong>type hints</strong> and are used 
        for code readability, static analysis, and IDE support. Python does not enforce type hints at runtime.
      </p>

      {/* ✅ Section 1 - Basic Function Annotations */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Basic Function Annotations
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            You can annotate function parameters and return values using the <code>:</code> and <code>-&gt;</code> syntax.
          </p>
        </div>

        <CodeBlock
          code={`def greet(name: str) -> str:
    return "Hello, " + name

print(greet("Python"))  # Output: Hello, Python`}
        />
      </section>

      {/* ✅ Section 2 - Multiple Parameters */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Function Annotations with Multiple Parameters
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            You can annotate multiple parameters with their expected types.
          </p>
        </div>

        <CodeBlock
          code={`def add(a: int, b: int) -> int:
    return a + b

print(add(5, 10))  # Output: 15`}
        />
      </section>

      {/* ✅ Section 3 - Default Values */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Annotations with Default Values
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Default parameter values can also be annotated.
          </p>
        </div>

        <CodeBlock
          code={`def greet(name: str = "Guest") -> str:
    return "Hello, " + name

print(greet())        # Output: Hello, Guest
print(greet("Alice")) # Output: Hello, Alice`}
        />
      </section>

      {/* ✅ Section 4 - Using Any, List, Dict */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Type Hints with Collections
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Use the <code>typing</code> module to annotate complex types like lists, dictionaries, or Any type.
          </p>
        </div>

        <CodeBlock
          code={`from typing import List, Dict, Any

def process_numbers(nums: List[int]) -> List[int]:
    return [n * 2 for n in nums]

def user_info(info: Dict[str, Any]) -> None:
    for k, v in info.items():
        print(f"{k}: {v}")

print(process_numbers([1,2,3]))  
user_info({"name":"Alice","age":25})`}
        />
      </section>

      {/* ✅ Section 5 - Optional and Union */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Optional & Union Types
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            Sometimes parameters can accept multiple types or None. Use <code>Union</code> and <code>Optional</code>.
          </p>
        </div>

        <CodeBlock
          code={`from typing import Union, Optional

def square(value: Union[int, float]) -> float:
    return value * value

def greet(name: Optional[str] = None) -> str:
    if name:
        return "Hello, " + name
    return "Hello, Guest"

print(square(5))       # 25
print(square(3.5))     # 12.25
print(greet())          # Hello, Guest
print(greet("Alice"))   # Hello, Alice`}
        />
      </section>

      {/* ✅ Section 6 - Callable */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Annotating Callable Functions
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            You can annotate functions that accept other functions using <code>Callable</code>.
          </p>
        </div>

        <CodeBlock
          code={`from typing import Callable

def perform_operation(x: int, y: int, operation: Callable[[int,int], int]) -> int:
    return operation(x, y)

print(perform_operation(5,3, lambda a,b: a*b))  # Output: 15`}
        />
      </section>

      {/* ✅ Section 7 - Annotating Return None */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Functions Returning None
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Functions that return nothing can be annotated with <code>-&gt; None</code>.
          </p>
        </div>

        <CodeBlock
          code={`def logger(msg: str) -> None:
    print(f"LOG: {msg}")

logger("This is a log message.")`}
        />
      </section>

      {/* ✅ Section 8 - Accessing Annotations */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Accessing Annotations
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Annotations are stored in the <code>__annotations__</code> attribute of functions.
          </p>
        </div>

        <CodeBlock
          code={`def add(a: int, b: int) -> int:
    return a + b

print(add.__annotations__)
# Output: {'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}`}
        />
      </section>

      {/* ✅ Section 9 - Advanced Example */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advanced Example with Multiple Annotations
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Combining multiple type hints for a function with lists, optional parameters, and callable.
          </p>
        </div>

        <CodeBlock
          code={`from typing import List, Optional, Callable

def process_items(items: List[int], callback: Optional[Callable[[int], int]] = None) -> List[int]:
    result = []
    for item in items:
        if callback:
            result.append(callback(item))
        else:
            result.append(item)
    return result

print(process_items([1,2,3]))                   # [1,2,3]
print(process_items([1,2,3], lambda x: x*2))    # [2,4,6]`}
        />
      </section>

      {/* ✅ Section 10 - Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-red-700 dark:text-red-300 space-y-2">
            <li>Create a function that annotates a list of strings and returns their lengths.</li>
            <li>Annotate a function that accepts a dictionary and prints its key-value pairs.</li>
            <li>Create a function that accepts another function as a parameter and annotate it properly.</li>
            <li>Annotate a function with optional arguments and default values.</li>
            <li>Access and print the annotations of one of your functions.</li>
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
            <li>Function annotations provide hints about parameter and return types.</li>
            <li>Python does not enforce type hints but helps in readability and static analysis.</li>
            <li>Use the <code>typing</code> module for complex types like List, Dict, Optional, Union, and Callable.</li>
            <li>Annotations are stored in the <code>__annotations__</code> attribute.</li>
            <li>Type hints improve collaboration, reduce bugs, and enhance IDE support.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
