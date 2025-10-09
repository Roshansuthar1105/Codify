/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function HeapStackMemoryDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Heap & Stack Memory</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python, memory is managed automatically. Objects are stored in the <strong>heap memory</strong>, while 
        function calls and local variables are handled using the <strong>stack memory</strong>. Understanding the difference 
        between heap and stack helps in writing memory-efficient Python programs.
      </p>

      {/* ✅ Section 1 - Stack Memory */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Stack Memory
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The stack memory is used for <strong>function calls, local variables, and execution context</strong>. 
          Each function call creates a stack frame that stores its local variables and parameters.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Stores function call frames (execution context)</li>
          <li>Automatic memory allocation and deallocation</li>
          <li>Follows Last In First Out (LIFO) order</li>
          <li>Fast access, limited size</li>
        </ul>
        <CodeBlock
          code={`def func1():
    a = 10
    b = 20
    func2()

def func2():
    x = 5
    y = 15

func1()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Each function call creates a new frame in the stack. Once the function returns, its frame is removed.
        </p>
      </section>

      {/* ✅ Section 2 - Heap Memory */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Heap Memory
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The heap memory is used to store <strong>objects and data that have dynamic lifetimes</strong>. 
          All Python objects and data structures are stored in the heap.
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Stores dynamically created objects (lists, dicts, custom objects)</li>
          <li>Memory is managed by Python's garbage collector</li>
          <li>Slower access compared to stack, but larger size</li>
          <li>Objects in heap are accessible globally via references</li>
        </ul>
        <CodeBlock
          code={`class MyClass:
    def __init__(self, value):
        self.value = value

obj1 = MyClass(10)
obj2 = obj1  # Both obj1 and obj2 point to the same object in heap`}
        />
      </section>

      {/* ✅ Section 3 - Stack vs Heap Comparison */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Stack vs Heap
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-5 text-indigo-700 dark:text-indigo-300 space-y-2">
            <li><strong>Stack:</strong> Stores function calls, local variables. Fast, small size, LIFO.</li>
            <li><strong>Heap:</strong> Stores objects and dynamic data. Slower, larger, managed by GC.</li>
            <li><strong>Lifespan:</strong> Stack memory is temporary; heap memory lasts until no references remain.</li>
            <li><strong>Access:</strong> Stack is limited to function scope; heap objects can be accessed globally via references.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 4 - Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Examples
        </h2>
        <CodeBlock
          code={`# Stack example
def add(x, y):
    result = x + y  # result stored in stack
    return result

sum = add(10, 20)

# Heap example
my_list = [1, 2, 3, 4]  # List object stored in heap
another_list = my_list   # Another reference to the same heap object`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Local variables like <code>result</code> are stored in stack, whereas objects like lists are stored in heap.
        </p>
      </section>

      {/* ✅ Section 5 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Keep functions small to avoid excessive stack usage</li>
            <li>Re-use objects when possible to reduce heap allocations</li>
            <li>Use Python's GC and profiling tools to monitor memory</li>
            <li>Be aware of circular references that prevent heap objects from being collected</li>
            <li>Prefer local variables for temporary data to reduce heap pressure</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 6 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a function and trace its stack frames using local variables</li>
            <li>Create multiple objects and check their memory addresses with <code>id()</code></li>
            <li>Observe what happens when a list object is referenced by multiple variables</li>
            <li>Enable garbage collection using <code>gc</code> and force collection</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 7 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Python uses stack memory for function calls and local variables</li>
            <li>Heap memory stores objects, lists, dicts, and dynamically created data</li>
            <li>Stack memory is temporary, heap memory is managed by GC</li>
            <li>Objects in heap can have multiple references</li>
            <li>Understanding stack vs heap helps in writing memory-efficient Python programs</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
