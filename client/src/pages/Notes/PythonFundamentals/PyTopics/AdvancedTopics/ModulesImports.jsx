/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ModulesImports() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Modules & Imports</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python, <strong>modules</strong> are files containing reusable code — functions, classes, or variables.
        You can import both <strong>built-in</strong> and <strong>custom</strong> modules to organize your projects and avoid repetition.
      </p>

      {/* ✅ Section 1 - What Are Modules? */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What Are Modules?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            A <strong>module</strong> is just a Python file (.py) that contains code.  
            For example, <code>math</code>, <code>datetime</code>, and <code>random</code> are built-in modules.
          </p>
        </div>
        <CodeBlock
          code={`# Example: using a built-in module
import math
print(math.sqrt(25))  # 5.0`}
        />
      </section>

      {/* ✅ Section 2 - Different Ways to Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Different Ways to Import
        </h2>
        <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>import module_name</strong> → imports the whole module</li>
          <li><strong>from module import item</strong> → imports specific functions or variables</li>
          <li><strong>import module as alias</strong> → gives a short name to a module</li>
        </ul>

        <CodeBlock
          code={`import math
print(math.pi)  # Full import

from math import sqrt, pow
print(sqrt(16))  # Import specific items

import datetime as dt
print(dt.date.today())  # Import with alias`}
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            💡 <strong>Tip:</strong> Use aliases like <code>pd</code> for pandas or <code>np</code> for numpy to make your code shorter and cleaner.
          </p>
        </div>
      </section>

      {/* ✅ Section 3 - Creating and Importing Custom Modules */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Creating and Importing Custom Modules
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can create your own module by saving code in a separate Python file and importing it.
        </p>
        <CodeBlock
          code={`# file: mymodule.py
def greet(name):
    return f"Hello, {name}!"

# file: main.py
import mymodule
print(mymodule.greet("Swayam"))`}
        />
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
          <p className="text-green-700 dark:text-green-300">
            ✅ <strong>Custom modules</strong> make your project modular, reusable, and easy to manage.
          </p>
        </div>
      </section>

      {/* ✅ Section 4 - The from ... import * Syntax */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>from ... import *</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This imports everything from a module — but it’s generally discouraged because it may cause name conflicts.
        </p>
        <CodeBlock
          code={`from math import *
print(sin(0))
print(floor(3.9))`}
        />
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
          <p className="text-red-700 dark:text-red-300">
            ⚠️ <strong>Warning:</strong> Avoid using <code>import *</code> in large projects as it makes code less readable and harder to debug.
          </p>
        </div>
      </section>

      {/* ✅ Section 5 - Exploring Built-in Modules */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Exploring Built-in Modules
        </h2>
        <CodeBlock
          code={`import random
print(random.randint(1, 10))  # Random number between 1 and 10

import os
print(os.getcwd())  # Current working directory

import sys
print(sys.version)  # Python version`}
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
          <p className="text-blue-700 dark:text-blue-300">
            💡 <strong>Tip:</strong> Use <code>help('modules')</code> in Python shell to see all available built-in modules.
          </p>
        </div>
      </section>

      {/* ✅ Section 6 - dir() and help() Functions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>dir()</code> and <code>help()</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          These built-in functions help you explore what’s inside a module.
        </p>
        <CodeBlock
          code={`import math
print(dir(math))  # Lists all attributes and functions in math
help(math.sqrt)   # Shows documentation for sqrt function`}
        />
      </section>

      {/* ✅ Section 7 - Practice Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a custom module named <code>mathutils</code> with functions for addition and multiplication.</li>
            <li>Use <code>os</code> module to print your current directory.</li>
            <li>Import <code>datetime</code> as <code>dt</code> and print the current year.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Modules keep your code organized and reusable.</li>
            <li>Use <code>import</code>, <code>from ... import</code>, and <code>as</code> for different needs.</li>
            <li>Avoid <code>import *</code> — it may cause confusion.</li>
            <li>Use <code>dir()</code> and <code>help()</code> to explore modules easily.</li>
          </ul>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Pro Tip:</strong> Break large projects into multiple modules — it’s the first step towards building Python packages!
        </p>
      </div>
    </div>
  );
}
