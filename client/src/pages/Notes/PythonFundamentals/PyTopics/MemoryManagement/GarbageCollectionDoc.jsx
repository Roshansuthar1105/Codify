/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function GarbageCollectionDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Memory Management & Garbage Collection</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Memory Management</strong> in Python is handled automatically by the interpreter. Python uses a private heap 
        for storing objects and employs <strong>reference counting</strong> and a <strong>Garbage Collector (GC)</strong> to 
        reclaim memory occupied by objects that are no longer in use. This helps prevent memory leaks and optimize memory usage.
      </p>

      {/* ✅ Section 1 - What is Memory Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Memory Management?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Python automatically manages memory allocation and deallocation for objects. It tracks references to objects 
            and frees memory when objects are no longer reachable.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Automatic memory allocation and deallocation</li>
          <li>Reference counting ensures objects are freed when no longer used</li>
          <li>Garbage Collector handles cyclic references</li>
          <li>Prevents memory leaks and inefficient memory usage</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Why Memory Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Why Memory Management?
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Ensures efficient use of memory</li>
          <li>Automatically reclaims memory of unused objects</li>
          <li>Reduces programmer’s burden to manually manage memory</li>
          <li>Prevents memory leaks and resource exhaustion</li>
        </ul>
      </section>

      {/* ✅ Section 3 - How Python Memory Management Works */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How Python Memory Management Works
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python maintains memory using a combination of <strong>reference counting</strong> and a <strong>generational garbage collector</strong>.
          The basic steps are:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Assign memory to new objects on the heap</li>
          <li>Keep track of references to each object</li>
          <li>Automatically delete objects when reference count drops to zero</li>
          <li>Garbage Collector handles cycles of unreachable objects</li>
        </ul>
      </section>

      {/* ✅ Section 4 - id() Function */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          id() Function
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>id()</code> function returns the unique identity (memory address) of an object. It helps to check whether two variables point to the same object.
        </p>
        <CodeBlock
          code={`x = 10
y = x
print(id(x))  # Unique memory address of x
print(id(y))  # Same as x because y references the same object`}
        />
      </section>

      {/* ✅ Section 5 - Reference Counting */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Reference Counting
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python keeps a count of references to each object. When this count drops to zero, the object’s memory is reclaimed.
        </p>
        <CodeBlock
          code={`import sys

a = [1, 2, 3]
b = a
print(sys.getrefcount(a))  # 3 (a, b, getrefcount reference)
b = None
print(sys.getrefcount(a))  # 2`}
        />
      </section>

      {/* ✅ Section 6 - Garbage Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Garbage Collection in Python
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python’s <code>gc</code> module manages cyclic references that reference counting alone cannot handle. 
          It divides objects into generations and periodically collects unreachable objects.
        </p>
        <CodeBlock
          code={`import gc

gc.enable()          # Enable automatic garbage collection
print(gc.isenabled()) # True
gc.collect()         # Manually trigger garbage collection`}
        />
      </section>

      {/* ✅ Section 7 - Mutable vs Immutable */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mutable vs Immutable & Memory
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Mutable objects can change their value in-place, while immutable objects create new objects in memory when changed.
        </p>
        <CodeBlock
          code={`lst = [1, 2, 3]
print(id(lst))
lst.append(4)
print(id(lst))  # Same id, memory unchanged

num = 100
print(id(num))
num += 1
print(id(num))  # New id, immutable object`}
        />
      </section>

      {/* ✅ Section 8 - Memory Leaks */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Memory Leaks in Python
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Memory leaks can occur when objects are no longer needed but references remain (e.g., circular references, globals, caches). The GC helps prevent this.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Remove unnecessary references to allow GC to reclaim memory</li>
          <li>Use <code>gc.collect()</code> to clean cycles</li>
          <li>Profiling tools like <code>tracemalloc</code> or <code>objgraph</code> help detect leaks</li>
        </ul>
      </section>

      {/* ✅ Section 9 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a list, remove all references, and observe GC behavior</li>
            <li>Use <code>id()</code> to check if variables reference the same object</li>
            <li>Create a cyclic reference and use <code>gc.collect()</code></li>
            <li>Check reference count using <code>sys.getrefcount()</code></li>
            <li>Use <code>tracemalloc</code> to monitor memory usage</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Python automatically manages memory using reference counting and garbage collection</li>
            <li><code>id()</code> returns unique object identity (memory address)</li>
            <li>Mutable objects can change in-place; immutable objects create new memory addresses on change</li>
            <li>Garbage Collector handles cyclic references and unreachable objects</li>
            <li>Proper memory management prevents memory leaks and improves performance</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
