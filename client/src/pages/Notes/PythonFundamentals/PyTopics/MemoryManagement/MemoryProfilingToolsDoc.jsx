/* eslint-disable react/no-unescaped-entities */  
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function MemoryProfilingToolsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Memory Profiling Tools</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Memory profiling is essential to understand how Python programs use memory. 
        Python provides several tools to measure memory usage, track memory leaks, and optimize performance.
      </p>

      {/* ✅ Section 1 - Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Introduction
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Profiling helps detect memory bottlenecks, understand object allocations, and optimize Python programs. 
          Common tools include <strong>sys, gc, memory_profiler, objgraph, tracemalloc</strong>.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Measure memory usage of functions and objects</li>
          <li>Detect memory leaks caused by cyclic references</li>
          <li>Analyze object allocation and lifetime</li>
        </ul>
      </section>

      {/* ✅ Section 2 - sys Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>sys</code> Module
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>sys.getsizeof()</code> function returns the memory size of an object in bytes.
        </p>
        <CodeBlock
          code={`import sys

x = [1, 2, 3, 4, 5]
print(f"Size of list x: {sys.getsizeof(x)} bytes")

y = "Hello World"
print(f"Size of string y: {sys.getsizeof(y)} bytes")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>sys.getsizeof()</code> shows memory consumed by objects themselves, but not objects they reference.
        </p>
      </section>

      {/* ✅ Section 3 - gc Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>gc</code> Module
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python's garbage collector can be used to track objects and memory usage. Useful for debugging memory leaks.
        </p>
        <CodeBlock
          code={`import gc

# Get all objects tracked by GC
objects = gc.get_objects()
print(f"Number of objects tracked by GC: {len(objects)}")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: This gives the total number of objects currently tracked in memory.
        </p>
      </section>

      {/* ✅ Section 4 - memory_profiler Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>memory_profiler</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <code>memory_profiler</code> allows line-by-line memory usage tracking of Python functions.
        </p>
        <CodeBlock
          code={`# Install: pip install memory-profiler
from memory_profiler import profile

@profile
def my_func():
    x = [i for i in range(100000)]
    y = [i**2 for i in range(100000)]
    return x, y

my_func()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Running this script will show memory usage per line, helping identify memory-heavy operations.
        </p>
      </section>

      {/* ✅ Section 5 - tracemalloc Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>tracemalloc</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <code>tracemalloc</code> tracks memory allocations over time and allows comparison snapshots.
        </p>
        <CodeBlock
          code={`import tracemalloc

tracemalloc.start()

data = [i for i in range(1000000)]
snapshot1 = tracemalloc.take_snapshot()

more_data = [i**2 for i in range(1000000)]
snapshot2 = tracemalloc.take_snapshot()

top_stats = snapshot2.compare_to(snapshot1, 'lineno')
for stat in top_stats[:5]:
    print(stat)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: This shows lines consuming the most memory between snapshots, useful for memory optimization.
        </p>
      </section>

      {/* ✅ Section 6 - objgraph Module */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>objgraph</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <code>objgraph</code> helps visualize object relationships and detect memory leaks.
        </p>
        <CodeBlock
          code={`# Install: pip install objgraph
import objgraph

a = [1, 2, 3]
b = [a]
a.append(b)

objgraph.show_refs([a], filename='refs.png')`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Generates a graph showing object references. Useful to detect cyclic references causing leaks.
        </p>
      </section>

      {/* ✅ Section 7 - Profiling Large Objects */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Profiling Large Objects
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use memory profiling to monitor memory usage of large datasets and objects.
        </p>
        <CodeBlock
          code={`from memory_profiler import memory_usage
import time

def load_data():
    data = [i for i in range(1000000)]
    time.sleep(2)
    return data

mem_usage = memory_usage(load_data)
print(f"Memory usage: {max(mem_usage)} MiB")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>memory_usage()</code> returns memory usage over time. Helps identify peak memory usage.
        </p>
      </section>

      {/* ✅ Section 8 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Profile memory for functions handling large data or long-lived objects</li>
            <li>Use <code>tracemalloc</code> to compare snapshots for memory leaks</li>
            <li>Visualize object references using <code>objgraph</code></li>
            <li>Monitor memory usage line by line with <code>memory_profiler</code></li>
            <li>Delete unnecessary references and trigger explicit GC if needed</li>
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
            <li>Use <code>sys.getsizeof()</code> on different data types and compare memory usage</li>
            <li>Create cyclic references and track them using <code>gc</code> and <code>objgraph</code></li>
            <li>Profile a function with large lists using <code>memory_profiler</code></li>
            <li>Take memory snapshots using <code>tracemalloc</code> and compare allocations</li>
            <li>Delete large objects and check memory reduction</li>
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
            <li>Memory profiling helps identify bottlenecks and memory leaks</li>
            <li>Python provides <code>sys, gc, memory_profiler, tracemalloc, objgraph</code> for profiling</li>
            <li>Track memory usage line-by-line or by snapshots</li>
            <li>Visualize object references to detect cycles</li>
            <li>Combining these tools helps optimize Python programs efficiently</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
