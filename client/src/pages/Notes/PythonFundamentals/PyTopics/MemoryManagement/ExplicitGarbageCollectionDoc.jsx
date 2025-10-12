/* eslint-disable react/no-unescaped-entities */  
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ExplicitGarbageCollectionDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Explicit Garbage Collection</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python provides an automatic garbage collector to manage memory, but sometimes you may need to perform 
        <strong> explicit garbage collection</strong> to free memory immediately. This is useful in cases of large objects, 
        memory profiling, or cleaning up cyclic references.
      </p>

      {/* ✅ Section 1 - What is Explicit Garbage Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Explicit Garbage Collection
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Explicit garbage collection means manually invoking Python's garbage collector using the <code>gc</code> module. 
          This allows you to control when memory is freed rather than waiting for automatic collection.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Helps in debugging memory issues</li>
          <li>Can clean up cyclic references immediately</li>
          <li>Useful for long-running programs or memory-intensive operations</li>
        </ul>
        <CodeBlock
          code={`import gc

# Manually trigger garbage collection
gc.collect()`}
        />
      </section>

      {/* ✅ Section 2 - Importing the GC Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Importing the GC Module
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python's built-in <code>gc</code> module provides functions to perform explicit garbage collection, inspect objects, 
          and tune collection thresholds.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><code>gc.collect()</code>: Run garbage collection manually</li>
          <li><code>gc.get_objects()</code>: Return all objects tracked by GC</li>
          <li><code>gc.get_referrers(obj)</code>: Return objects that reference <code>obj</code></li>
          <li><code>gc.get_referents(obj)</code>: Return objects referred by <code>obj</code></li>
        </ul>
        <CodeBlock
          code={`import gc

print(gc.get_objects())  # Lists all tracked objects`}
        />
      </section>

      {/* ✅ Section 3 - Forcing Garbage Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Forcing Garbage Collection
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can force garbage collection at any point using <code>gc.collect()</code>. It returns the number of unreachable objects 
          that were collected.
        </p>
        <CodeBlock
          code={`import gc

# Force garbage collection and get number of objects collected
num_collected = gc.collect()
print(f"Collected {num_collected} unreachable objects.")`}
        />
      </section>

      {/* ✅ Section 4 - Reference Counting */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Reference Counting
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python primarily uses reference counting to manage memory. When an object's reference count drops to zero, 
          it is deallocated. Explicit GC is mainly used for objects involved in cyclic references.
        </p>
        <CodeBlock
          code={`import sys

a = [1, 2, 3]
b = a

print(sys.getrefcount(a))  # Number of references to object 'a'

del b
print(sys.getrefcount(a))  # Decreased reference count`}
        />
      </section>

      {/* ✅ Section 5 - Handling Cyclic References */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Handling Cyclic References
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Reference cycles (objects referring to each other) cannot be freed by reference counting alone. Explicit GC 
          can clean up these cycles.
        </p>
        <CodeBlock
          code={`import gc

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create cyclic reference
node1 = Node(1)
node2 = Node(2)
node1.next = node2
node2.next = node1

del node1
del node2

collected = gc.collect()
print(f"Garbage collector collected {collected} objects.")`}
        />
      </section>

      {/* ✅ Section 6 - Inspecting Garbage */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Inspecting Garbage
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can inspect objects that are unreachable but not collected using <code>gc.garbage</code>. 
          This is useful for debugging memory leaks.
        </p>
        <CodeBlock
          code={`import gc

gc.set_debug(gc.DEBUG_LEAK)

# Create a cyclic reference
a = []
b = [a]
a.append(b)

del a
del b

gc.collect()

print(gc.garbage)  # Lists objects that cannot be collected`}
        />
      </section>

      {/* ✅ Section 7 - Tuning Garbage Collector */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tuning the Garbage Collector
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can tune the GC thresholds for each generation to control collection frequency:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><code>gc.get_threshold()</code>: Get current thresholds</li>
          <li><code>gc.set_threshold()</code>: Set thresholds for Gen0, Gen1, Gen2</li>
        </ul>
        <CodeBlock
          code={`import gc

print(gc.get_threshold())  # Current thresholds
gc.set_threshold(700, 10, 10)  # Set new thresholds`}
        />
      </section>

      {/* ✅ Section 8 - Practical Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Practical Example
        </h2>
        <CodeBlock
          code={`import gc

class MyObject:
    def __init__(self, name):
        self.name = name
        self.data = [i for i in range(1000000)]  # Large object

obj = MyObject("Test")
del obj

# Explicitly free memory
collected = gc.collect()
print(f"Explicit GC collected {collected} objects.")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Large objects like <code>MyObject</code> can consume significant memory. Explicit GC ensures memory is freed immediately.
        </p>
      </section>

      {/* ✅ Section 9 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use explicit GC only when necessary; avoid excessive calls</li>
            <li>Always delete references to large objects when they are no longer needed</li>
            <li>Inspect <code>gc.garbage</code> for objects that GC cannot free</li>
            <li>Be cautious with cyclic references and clean them manually if needed</li>
            <li>Profile memory usage for long-running applications</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 10 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create objects with large data and manually free memory using <code>gc.collect()</code></li>
            <li>Form cyclic references and observe collected objects</li>
            <li>Experiment with <code>gc.get_objects()</code> and <code>gc.garbage</code></li>
            <li>Tune GC thresholds and see how collection frequency changes</li>
            <li>Use <code>gc.set_debug(gc.DEBUG_LEAK)</code> to debug memory leaks</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 11 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Explicit garbage collection allows manual memory management in Python</li>
            <li>Useful for large objects, cyclic references, and memory profiling</li>
            <li>Reference counting handles most objects; GC cleans up cycles</li>
            <li>Use <code>gc.collect()</code> to trigger collection and free memory immediately</li>
            <li>Profiling and inspecting objects can help detect memory leaks</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
