/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ScopeNamespacesDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Scope & Namespaces</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Understanding <strong>scope</strong> and <strong>namespaces</strong> is crucial in Python. 
        Scope determines where a variable can be accessed, while namespaces are the mapping of names 
        to objects. Python uses these concepts to manage variable visibility and lifetime.
      </p>

      {/* ✅ Section 1 - What is Scope */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Scope?
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Scope defines the region of a program where a variable is accessible.
            Python has four types of scopes known as the <strong>LEGB rule</strong>:
          </p>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 dark:text-yellow-300 space-y-1">
            <li><strong>L</strong>ocal — Names assigned inside a function.</li>
            <li><strong>E</strong>nclosing — Names in enclosing functions (nested functions).</li>
            <li><strong>G</strong>lobal — Names at the top-level of a module.</li>
            <li><strong>B</strong>uilt-in — Names preassigned in Python.</li>
          </ul>
        </div>

        <CodeBlock
          code={`def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print("Inner:", x)
    inner()
    print("Outer:", x)

x = "global"
outer()
print("Global:", x)`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">Output:</p>
        <CodeBlock
          code={`Inner: local
Outer: enclosing
Global: global`}
        />
      </section>

      {/* ✅ Section 2 - Local Scope */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Local Scope
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Variables defined inside a function are only accessible within that function.
          </p>
        </div>

        <CodeBlock
          code={`def greet():
    message = "Hello, Local Scope!"
    print(message)

greet()
# print(message)  # Error: message is not defined`}
        />
      </section>

      {/* ✅ Section 3 - Global Scope */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Global Scope
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Variables defined at the top-level of a module or with <code>global</code> keyword are accessible anywhere in the module.
          </p>
        </div>

        <CodeBlock
          code={`x = 10  # Global variable

def add(a):
    return a + x

print(add(5))  # Output: 15`}
        />

        <CodeBlock
          code={`def update_global():
    global x
    x = 50

update_global()
print(x)  # Output: 50`}
        />
      </section>

      {/* ✅ Section 4 - Enclosing Scope */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Enclosing Scope
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Variables in outer functions are accessible in nested inner functions (nonlocal variables).
          </p>
        </div>

        <CodeBlock
          code={`def outer():
    x = "Enclosing"
    def inner():
        print("Inner:", x)
    inner()
    print("Outer:", x)

outer()`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">Output:</p>
        <CodeBlock
          code={`Inner: Enclosing
Outer: Enclosing`}
        />
      </section>

      {/* ✅ Section 5 - Built-in Scope */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Built-in Scope
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            Python provides many built-in functions and keywords that are always available.
          </p>
        </div>

        <CodeBlock
          code={`print(len("Hello"))  # Built-in function len
print(abs(-10))          # Built-in function abs`}
        />
      </section>

      {/* ✅ Section 6 - Namespaces */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Python Namespaces
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            A <strong>namespace</strong> is a mapping of names to objects. Python has multiple types of namespaces:
          </p>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 dark:text-yellow-300 space-y-1">
            <li><strong>Local Namespace:</strong> Inside a function.</li>
            <li><strong>Global Namespace:</strong> At the module level.</li>
            <li><strong>Built-in Namespace:</strong> Names preassigned in Python.</li>
          </ul>
        </div>

        <CodeBlock
          code={`def func():
    local_var = "I am local"
    print("Local Namespace:", locals())

func()
print("Global Namespace:", globals())`}
        />
      </section>

      {/* ✅ Section 7 - Nonlocal Keyword */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>nonlocal</code> Keyword
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Modify variables in enclosing (non-global) scopes using <code>nonlocal</code>.
          </p>
        </div>

        <CodeBlock
          code={`def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
        print("Inner:", x)
    inner()
    print("Outer:", x)

outer()`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-2">Output:</p>
        <CodeBlock
          code={`Inner: 15
Outer: 15`}
        />
      </section>

      {/* ✅ Section 8 - Scope in Loops */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Scope in Loops
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Loop variables are local to the containing scope.
          </p>
        </div>

        <CodeBlock
          code={`for i in range(3):
    loop_var = i
    print(loop_var)
    
print("Outside loop:", loop_var)  # Accessible outside loop in Python`}
        />
      </section>

      {/* ✅ Section 9 - Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-purple-700 dark:text-purple-300 space-y-2">
            <li>Write a function with a local variable and try to access it globally.</li>
            <li>Create a nested function and modify enclosing scope using <code>nonlocal</code>.</li>
            <li>Print <code>globals()</code> and <code>locals()</code> in a function.</li>
            <li>Use <code>global</code> to modify a global variable inside a function.</li>
            <li>Experiment with the LEGB rule by creating variables with same name in different scopes.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Scope determines the accessibility of variables.</li>
            <li>Python uses the <strong>LEGB</strong> rule to resolve names.</li>
            <li>Namespaces map names to objects and exist at local, global, and built-in levels.</li>
            <li><code>global</code> modifies global variables, <code>nonlocal</code> modifies enclosing scope variables.</li>
            <li>Understanding scope and namespaces helps avoid variable conflicts and bugs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
