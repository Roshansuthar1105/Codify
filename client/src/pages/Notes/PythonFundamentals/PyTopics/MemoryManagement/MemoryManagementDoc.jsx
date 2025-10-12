/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function MemoryManagementDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Memory Management & id()</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Memory Management</strong> in Python refers to the allocation, tracking, and deallocation of memory for objects.
        Python automatically manages memory using a private heap and garbage collection. The <code>id()</code> function returns 
        the unique identity (memory address) of an object, which helps in understanding memory allocation.
      </p>

      {/* ✅ Section 1 - What is Memory Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Memory Management?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Memory management ensures that Python programs use memory efficiently by automatically allocating memory for objects 
            when they are created and reclaiming memory when objects are no longer in use.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Automatic allocation and deallocation of memory</li>
          <li>Prevents memory leaks and dangling references</li>
          <li>Python uses a private heap for all object storage</li>
          <li>Garbage Collector reclaims memory of unreachable objects</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Python Memory Structure */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Python Memory Structure
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Stack Memory:</strong> Stores references to objects and function calls</li>
          <li><strong>Heap Memory:</strong> Stores actual objects in Python's private heap</li>
          <li><strong>Code/Object Memory:</strong> Stores bytecode and immutable objects</li>
          <li><strong>Garbage Collector:</strong> Manages reclaiming memory of unreachable objects</li>
        </ul>
      </section>

      {/* ✅ Section 3 - id() Function */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          id() Function
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>id()</code> function returns the unique identity of an object, which is typically the memory address.
          This helps to understand whether two variables reference the same object in memory.
        </p>
        <CodeBlock
          code={`x = 10
y = x
print(id(x))  # Unique id of x
print(id(y))  # Same as x because y references the same object`}
        />
      </section>

      {/* ✅ Section 4 - Mutability and Memory */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mutability and Memory
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The memory address of an object can change depending on whether the object is mutable or immutable:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Immutable objects</strong> (int, str, tuple) create a new object when value changes</li>
          <li><strong>Mutable objects</strong> (list, dict, set) can change their value in the same memory location</li>
        </ul>
        <CodeBlock
          code={`a = [1, 2, 3]
print(id(a))
a.append(4)
print(id(a))  # Same id, memory not changed

b = 100
print(id(b))
b += 1
print(id(b))  # New id, immutable object`} 
        />
      </section>

      {/* ✅ Section 5 - Reference Counting */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Reference Counting
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python keeps track of the number of references pointing to an object. When the reference count drops to zero, 
          the object is eligible for garbage collection.
        </p>
        <CodeBlock
          code={`import sys

x = [1,2,3]
y = x
print(sys.getrefcount(x))  # 3 (x, y, and getrefcount reference)
y = None
print(sys.getrefcount(x))  # 2`} 
        />
      </section>

      {/* ✅ Section 6 - Garbage Collection in Python */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Garbage Collection in Python
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python automatically manages memory using a built-in Garbage Collector that identifies and removes unreachable objects. 
          It uses reference counting and generational collection to optimize performance.
        </p>
        <CodeBlock
          code={`import gc

gc.enable()  # Enable automatic garbage collection
print(gc.isenabled())  # True
gc.collect()  # Manually trigger garbage collection`} 
        />
      </section>

      {/* ✅ Section 7 - Memory Leaks in Python */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Memory Leaks in Python
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Memory leaks occur when objects are no longer needed but are still referenced, preventing garbage collection.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Common causes: circular references, global variables, or caching</li>
          <li>Use <code>gc.collect()</code> to manually clean up cycles</li>
          <li>Profiling tools like <code>objgraph</code> help detect leaks</li>
        </ul>
      </section>

      {/* ✅ Section 8 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Understand mutability and how it affects memory</li>
            <li>Remove unnecessary references to make objects collectible</li>
            <li>Avoid circular references unless necessary</li>
            <li>Use <code>id()</code> to debug memory-related issues</li>
            <li>Enable garbage collection to maintain memory efficiency</li>
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
            <li>Create a mutable list and modify it, check <code>id()</code> before and after</li>
            <li>Create an immutable object, change its value, and observe the new <code>id()</code></li>
            <li>Use <code>gc.collect()</code> after deleting references and check memory usage</li>
            <li>Experiment with reference counting using <code>sys.getrefcount()</code></li>
            <li>Observe memory addresses for multiple references pointing to the same object</li>
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
            <li>Python manages memory automatically using reference counting and garbage collection</li>
            <li><code>id()</code> returns the unique identity (memory address) of an object</li>
            <li>Mutable objects can change in place, immutable objects create new memory addresses on change</li>
            <li>Removing unnecessary references allows garbage collection to reclaim memory</li>
            <li>Understanding memory management helps avoid leaks and optimize performance</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
