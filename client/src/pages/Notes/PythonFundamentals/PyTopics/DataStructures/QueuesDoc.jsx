/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function QueuesDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-green-600 dark:text-green-400">Queues</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        A <strong>queue</strong> is a linear data structure that follows the <strong>FIFO (First In First Out)</strong> principle.
        Think of a queue like a line of people at a bank: the person who comes first is served first. 
        Queues are widely used in task scheduling, print jobs, and request handling in web servers.
      </p>

      {/* ✅ Section 1 - What is a Queue */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Queue?
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A queue is a collection of elements where addition happens at the rear and removal happens at the front.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>FIFO Principle:</strong> First element added is the first removed.</li>
          <li><strong>Main Operations:</strong> <code>enqueue</code> (add) and <code>dequeue</code> (remove).</li>
          <li><strong>Applications:</strong> Task scheduling, CPU job management, print queue, BFS traversal in graphs.</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Implementing Queue with List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Implementing Queue with Python List
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Python lists can act as queues using <code>append()</code> to add at the end and <code>pop(0)</code> to remove from the front. 
          This is simple but inefficient for large queues because <code>pop(0)</code> takes O(n) time.
        </p>
        <CodeBlock
          code={`# Create an empty queue
queue = []

# Enqueue elements
queue.append(10)
queue.append(20)
queue.append(30)
print("Queue after enqueue:", queue)  # [10, 20, 30]

# Dequeue elements
front = queue.pop(0)
print("Dequeued element:", front)     # 10
print("Queue after dequeue:", queue)  # [20, 30]`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: We add 10, 20, 30 to the end of the list. When dequeuing, 10 comes out first because it was added first (FIFO).
        </p>
      </section>

      {/* ✅ Section 3 - Using collections.deque for Efficient Queue */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using <code>collections.deque</code>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For large queues, use <code>collections.deque</code>. 
          Deque provides O(1) time complexity for adding and removing elements from both ends, making it highly efficient.
        </p>
        <CodeBlock
          code={`from collections import deque

queue = deque()

# Enqueue elements
queue.append(10)
queue.append(20)
queue.append(30)

# Dequeue elements
front = queue.popleft()
print("Dequeued element:", front)       # 10
print("Queue now:", list(queue))        # [20, 30]`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>deque</code> efficiently handles additions at the rear and removals from the front without shifting elements like a list.
        </p>
      </section>

      {/* ✅ Section 4 - Peek and Check Empty */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Peek and Check if Empty
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Sometimes, you want to see the front element without removing it or check whether the queue is empty before dequeuing.
        </p>
        <CodeBlock
          code={`queue = deque([20, 30])

# Peek at the front element
front = queue[0]
print("Front element:", front)  # 20

# Check if queue is empty
is_empty = len(queue) == 0
print("Is queue empty?", is_empty)  # False`}
        />
      </section>

      {/* ✅ Section 5 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-green-700 dark:text-green-300">
            <li>Create an empty queue using <code>deque()</code></li>
            <li>Enqueue elements: 5, 10, 15</li>
            <li>Dequeue the front element and print it</li>
            <li>Peek at the front element without removing it</li>
            <li>Check if the queue is empty</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 6 - Applications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Applications of Queue
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Task Scheduling:</strong> CPU scheduling for processes</li>
          <li><strong>Print Jobs:</strong> Printing documents in order</li>
          <li><strong>BFS in Graphs:</strong> Explore nodes level by level</li>
          <li><strong>Request Handling:</strong> Handling incoming requests in servers</li>
        </ul>
      </section>

      {/* ✅ Section 7 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use <code>deque</code> for large queues to improve performance</li>
            <li>Always check if the queue is empty before dequeuing to avoid errors</li>
            <li>Use descriptive variable names for better readability</li>
            <li>Keep queue operations simple: enqueue at rear, dequeue at front</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a queue using <code>deque</code> and enqueue 5 numbers</li>
            <li>Dequeue the front element and print the queue</li>
            <li>Peek at the front element without removing it</li>
            <li>Check if the queue is empty</li>
            <li>Implement the same using a Python list and compare performance</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <ul className="text-green-800 dark:text-green-300 space-y-2">
            <li>Queue is a FIFO (First In First Out) data structure</li>
            <li>Use <code>enqueue</code> to add elements and <code>dequeue</code> to remove elements</li>
            <li><code>collections.deque</code> is efficient for queue operations</li>
            <li>Always check for an empty queue before dequeuing</li>
            <li>Useful for scheduling, BFS, print jobs, and request handling</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
