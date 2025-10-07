/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function MultithreadingAndMultiprocessing() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-green-600 dark:text-green-400">Multithreading & Multiprocessing</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Python supports <strong>concurrent execution</strong> through multithreading and multiprocessing.
        Threads share memory and are best for <strong>I/O-bound tasks</strong>, while processes run independently and are ideal for <strong>CPU-bound tasks</strong>.
      </p>

      {/* ✅ Section 1 - What is Multithreading */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Multithreading?
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A thread is a lightweight unit of execution within a process. Multiple threads run concurrently and share the same memory.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Useful for tasks like file I/O, network requests, or waiting operations</li>
          <li>Threads share data in memory, so changes are visible across threads</li>
          <li>Less memory overhead than processes</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Multithreading Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Multithreading Example
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Here, two threads print numbers concurrently.
        </p>
        <CodeBlock
          code={`import threading

def print_numbers():
    for i in range(5):
        print(i)

t1 = threading.Thread(target=print_numbers)
t2 = threading.Thread(target=print_numbers)

t1.start()
t2.start()

t1.join()
t2.join()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>t1</code> and <code>t2</code> run the same function concurrently. <code>join()</code> waits for threads to finish before continuing.
        </p>
      </section>

      {/* ✅ Section 3 - What is Multiprocessing */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Multiprocessing?
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A process is an independent program running in its own memory space. Multiprocessing is ideal for CPU-intensive tasks.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Processes do not share memory by default</li>
          <li>Good for CPU-bound tasks like calculations, image processing, or simulations</li>
          <li>Higher memory usage compared to threads</li>
        </ul>
      </section>

      {/* ✅ Section 4 - Multiprocessing Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Multiprocessing Example
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Two processes calculate squares concurrently.
        </p>
        <CodeBlock
          code={`from multiprocessing import Process

def square_numbers():
    for i in range(5):
        print(i*i)

p1 = Process(target=square_numbers)
p2 = Process(target=square_numbers)

p1.start()
p2.start()

p1.join()
p2.join()`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>p1</code> and <code>p2</code> run independently in separate memory spaces. Ideal for CPU-heavy tasks.
        </p>
      </section>

      {/* ✅ Section 5 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Create threads for I/O tasks (e.g., printing numbers)</li>
            <li>Create processes for CPU tasks (e.g., squaring numbers)</li>
            <li>Start threads/processes</li>
            <li>Use <code>join()</code> to wait for completion</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 6 - Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use threads for I/O-bound tasks, processes for CPU-bound tasks</li>
            <li>Always use <code>join()</code> to ensure completion</li>
            <li>Avoid shared mutable data in threads or use synchronization (e.g., Lock)</li>
            <li>Be cautious with memory usage in multiprocessing</li>
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
            <li>Create 3 threads printing numbers 1–5 concurrently</li>
            <li>Create 2 processes calculating squares 1–5 concurrently</li>
            <li>Compare execution speed between threads and processes for CPU-bound tasks</li>
            <li>Implement a thread-safe counter using <code>threading.Lock()</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <ul className="text-green-800 dark:text-green-300 space-y-2">
            <li>Threads share memory and are best for I/O-bound tasks</li>
            <li>Processes have separate memory and are best for CPU-intensive tasks</li>
            <li>Use <code>join()</code> to wait for threads/processes to finish</li>
            <li>Use synchronization tools (Lock, Queue) to avoid race conditions</li>
          </ul>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Pro Tip:</strong> Practice by creating small concurrent programs like a number printer or a CPU-intensive calculator to understand performance differences.
        </p>
      </div>
    </div>
  );
}
