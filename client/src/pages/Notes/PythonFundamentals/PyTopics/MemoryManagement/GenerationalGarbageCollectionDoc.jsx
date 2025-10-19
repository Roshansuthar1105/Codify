/* eslint-disable react/no-unescaped-entities */  
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function GenerationalGarbageCollectionDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Generational Garbage Collection</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python's memory management uses <strong>garbage collection (GC)</strong> to free up memory used by objects 
        that are no longer referenced. The <strong>generational garbage collection</strong> approach improves efficiency 
        by grouping objects based on their lifespan.
      </p>

      {/* ✅ Section 1 - What is Generational GC */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Generational Garbage Collection
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Generational GC divides objects into <strong>generations</strong> based on their age:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Young Generation (Gen 0):</strong> Newly created objects. Collected frequently.</li>
          <li><strong>Middle Generation (Gen 1):</strong> Objects surviving one or more young collections.</li>
          <li><strong>Old Generation (Gen 2):</strong> Long-lived objects. Collected less frequently.</li>
        </ul>
        <CodeBlock
          code={`import gc

print(gc.get_threshold())  # Shows collection thresholds for Gen0, Gen1, Gen2`}
        />
      </section>

      {/* ✅ Section 2 - How It Works */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The idea behind generational GC is that most objects die young. By segregating objects:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>GC can run more often on young objects</li>
          <li>Old objects are checked less frequently</li>
          <li>Reduces overhead of scanning long-lived objects repeatedly</li>
        </ul>
        <CodeBlock
          code={`import gc

# Force garbage collection
gc.collect()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Calling <code>gc.collect()</code> manually triggers garbage collection across generations.
        </p>
      </section>

      {/* ✅ Section 3 - Generations & Thresholds */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Generations & Thresholds
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python maintains three generations. Each generation has a collection threshold:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Gen 0:</strong> Collected most frequently (default threshold usually 700)</li>
          <li><strong>Gen 1:</strong> Collected after surviving Gen 0 collections</li>
          <li><strong>Gen 2:</strong> Collected after surviving multiple Gen 1 collections (long-lived)</li>
        </ul>
        <CodeBlock
          code={`import gc

gc.set_threshold(700, 10, 10)  # Set thresholds for Gen0, Gen1, Gen2`}
        />
      </section>

      {/* ✅ Section 4 - Reference Counting & Cycles */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Reference Counting & Cycles
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python primarily uses <strong>reference counting</strong> to manage memory. 
          Objects with no references are immediately deallocated. However, reference cycles 
          require GC to clean up.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Simple objects without cycles are freed automatically</li>
          <li>Objects in cycles are collected during generational GC</li>
        </ul>
        <CodeBlock
          code={`import gc

a = []
b = [a]
a.append(b)

del a
del b

gc.collect()  # Cleans up reference cycle`}
        />
      </section>

      {/* ✅ Section 5 - Practical Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Practical Example
        </h2>
        <CodeBlock
          code={`import gc

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create cyclic linked list
node1 = Node(1)
node2 = Node(2)
node1.next = node2
node2.next = node1  # creates a cycle

del node1
del node2

# Manually trigger garbage collection
collected = gc.collect()
print(f"Garbage collector collected {collected} objects.")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Without generational GC, cyclic references like <code>node1 ↔ node2</code> would not be freed.
        </p>
      </section>

      {/* ✅ Section 6 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Minimize creation of unnecessary objects to reduce GC overhead</li>
            <li>Avoid long-lived objects with many references to reduce memory pressure</li>
            <li>Use <code>gc.collect()</code> only when necessary (profiling/debugging)</li>
            <li>Be mindful of reference cycles that GC must clean up</li>
            <li>Monitor object allocations using <code>gc.get_objects()</code></li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create objects and observe which generation they belong to using <code>gc.get_objects()</code></li>
            <li>Form a reference cycle and trigger GC manually</li>
            <li>Experiment with <code>gc.set_threshold()</code> to change collection frequency</li>
            <li>Profile memory usage before and after collection</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Python uses generational GC to manage memory efficiently</li>
            <li>Objects are grouped into Gen0, Gen1, and Gen2 based on age</li>
            <li>Young objects are collected more frequently than old ones</li>
            <li>Reference cycles are handled by GC to avoid memory leaks</li>
            <li>Understanding generational GC helps optimize Python programs and memory usage</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
