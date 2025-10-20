/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function CopyDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Shallow Copy vs Deep Copy</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python, copying objects can be tricky. There are two types of copies: 
        <strong> shallow copy</strong> and <strong>deep copy</strong>. 
        Understanding the difference is crucial when working with mutable objects 
        like lists, dictionaries, and nested structures.
      </p>

      {/* ✅ Section 1 - What is Shallow Copy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Shallow Copy
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            A shallow copy creates a new object, but the elements inside the object 
            are references to the same objects in memory as the original. 
            Changes to mutable elements inside affect both copies.
          </p>
        </div>

        <CodeBlock
          code={`import copy

original = [1, 2, [3, 4]]
shallow = copy.copy(original)

shallow[0] = 100        # changes only shallow copy
shallow[2][0] = 300     # changes inner list affect both

print(original)  # [1, 2, [300, 4]]
print(shallow)   # [100, 2, [300, 4]]`}
        />
      </section>

      {/* ✅ Section 2 - What is Deep Copy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Deep Copy
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A deep copy creates a new object and recursively copies all nested objects.
            Modifications to nested elements in the copy do not affect the original.
          </p>
        </div>

        <CodeBlock
          code={`import copy

original = [1, 2, [3, 4]]
deep = copy.deepcopy(original)

deep[0] = 100
deep[2][0] = 300

print(original)  # [1, 2, [3, 4]]
print(deep)      # [100, 2, [300, 4]]`}
        />
      </section>

      {/* ✅ Section 3 - List Copy Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          List Copy Examples
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <CodeBlock
            code={`# Shallow copy using slicing
original = [1, 2, [3, 4]]
shallow = original[:]
shallow[2][0] = 999
print(original)  # [1, 2, [999, 4]]

# Deep copy using deepcopy
import copy
deep = copy.deepcopy(original)
deep[2][0] = 111
print(original)  # [1, 2, [999, 4]]
print(deep)      # [1, 2, [111, 4]]`}
          />
        </div>
      </section>

      {/* ✅ Section 4 - Dictionary Copy Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Dictionary Copy Examples
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <CodeBlock
            code={`import copy

original = {'a': 1, 'b': [2, 3]}

shallow = copy.copy(original)
deep = copy.deepcopy(original)

shallow['b'][0] = 99
deep['b'][1] = 100

print(original)  # {'a': 1, 'b': [99, 3]}
print(shallow)   # {'a': 1, 'b': [99, 3]}
print(deep)      # {'a': 1, 'b': [99, 100]}`}
          />
        </div>
      </section>

      {/* ✅ Section 5 - Objects & Custom Classes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Objects & Custom Classes
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Shallow vs deep copy applies to objects too. Mutable attributes may still share
            references in shallow copy.
          </p>
        </div>

        <CodeBlock
          code={`import copy

class Person:
    def __init__(self, name, skills):
        self.name = name
        self.skills = skills

p1 = Person("Alice", ["Python", "ML"])

shallow = copy.copy(p1)
deep = copy.deepcopy(p1)

shallow.skills.append("DL")
deep.skills.append("AI")

print(p1.skills)       # ['Python', 'ML', 'DL']
print(shallow.skills)  # ['Python', 'ML', 'DL']
print(deep.skills)     # ['Python', 'ML', 'DL', 'AI']`}
        />
      </section>

      {/* ✅ Section 6 - Shallow Copy Techniques */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Shallow Copy Techniques
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-red-700 dark:text-red-300 space-y-2">
            <li>Using <code>copy.copy(obj)</code></li>
            <li>Slicing (for lists): <code>arr[:]</code></li>
            <li>List comprehension: <code>[x for x in arr]</code></li>
            <li>Dict constructor: <code>dict(orig_dict)</code></li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Deep Copy Techniques */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Deep Copy Techniques
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>Using <code>copy.deepcopy(obj)</code> for nested/mutable objects</li>
            <li>Manual recursion to copy nested structures</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - When to Use Shallow vs Deep */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          When to Use Shallow vs Deep Copy
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-blue-700 dark:text-blue-300 space-y-2">
            <li>Use <strong>shallow copy</strong> for flat or immutable objects for efficiency.</li>
            <li>Use <strong>deep copy</strong> for nested mutable objects when you need independent copies.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 9 - Common Pitfalls */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Pitfalls
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-red-700 dark:text-red-300 space-y-2">
            <li>Shallow copy may lead to unexpected changes in nested objects.</li>
            <li>Deep copy is slower for large objects and complex graphs.</li>
            <li>Some objects (like open file handles, sockets) cannot be deep-copied.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 10 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-blue-700 dark:text-blue-300 space-y-2">
            <li>Create a shallow copy of a nested list and modify inner elements. Observe changes.</li>
            <li>Create a deep copy of a dictionary with nested lists. Modify original and see effect on copy.</li>
            <li>Write a custom class and experiment with shallow vs deep copying its attributes.</li>
            <li>Try copying a list of dictionaries with shallow and deep copy. Compare results.</li>
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
            <li>Shallow copy copies only the outer object; inner elements remain references.</li>
            <li>Deep copy recursively copies all nested elements, making independent objects.</li>
            <li>Use <code>copy.copy()</code> for shallow copy and <code>copy.deepcopy()</code> for deep copy.</li>
            <li>Shallow copy is faster; deep copy is safer for nested mutable structures.</li>
            <li>Always consider object mutability and nested structures before copying.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
