/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function StacksDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-purple-600 dark:text-purple-400">Stacks</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        A <strong>stack</strong> is a linear data structure that follows the <strong>LIFO (Last In First Out)</strong> principle.
        This means the last item added is the first one to be removed. Stacks are widely used in programming for function calls, undo operations, and expression evaluation.
      </p>

      {/* ✅ Section 1 - What is a Stack */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Stack?
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            A stack is like a stack of plates: you can only add or remove plates from the top. 
            The first plate you put at the bottom will be the last one you remove.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>LIFO Principle:</strong> Last In, First Out</li>
          <li><strong>Main Operations:</strong> push (add) and pop (remove)</li>
          <li><strong>Applications:</strong> Undo feature, recursion, parsing expressions</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Implementing Stack with List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Implementing Stack with List
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In Python, a <code>list</code> can be used as a stack. Use <code>append()</code> to push and <code>pop()</code> to remove the top element.
        </p>
        <CodeBlock
          code={`# Create an empty stack
stack = []

# Add elements (push)
stack.append(10)
stack.append(20)
stack.append(30)
print("Stack after pushes:", stack)  # [10, 20, 30]

# Remove element (pop)
top = stack.pop()
print("Popped element:", top)        # 30
print("Stack after pop:", stack)     # [10, 20]`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: We pushed 10, 20, 30 to the stack. When we pop, 30 is removed first because it was added last.
        </p>
      </section>

      {/* ✅ Section 3 - Peek and Check Empty */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Peek and Check Empty
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Sometimes, you want to see the top element without removing it. You can also check if the stack is empty before popping.
        </p>
        <CodeBlock
          code={`stack = [10, 20]

# Peek at the top element
top = stack[-1]
print("Top element:", top)  # 20

# Check if stack is empty
is_empty = len(stack) == 0
print("Is stack empty?", is_empty)  # False`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Using <code>stack[-1]</code> gets the last element. Checking <code>len(stack)</code> ensures we don’t pop from an empty stack.
        </p>
      </section>

      {/* ✅ Section 4 - Using collections.deque for Efficient Stack */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using collections.deque
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For large stacks, <code>collections.deque</code> is more efficient than a list because it has faster append and pop operations.
        </p>
        <CodeBlock
          code={`from collections import deque

stack = deque()

# Push elements
stack.append(10)
stack.append(20)
stack.append(30)

# Pop element
top = stack.pop()
print("Popped element:", top)       # 30
print("Stack:", list(stack))         # [10, 20]`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: <code>deque</code> is optimized for O(1) append and pop operations.
        </p>
      </section>

      {/* ✅ Section 5 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-purple-700 dark:text-purple-300">
            <li>Create an empty stack: <code>stack = []</code></li>
            <li>Push elements 5, 10, 15: <code>stack.append(5)</code> etc.</li>
            <li>Pop the top element: <code>stack.pop()</code></li>
            <li>Peek the top element: <code>stack[-1]</code></li>
            <li>Check if stack is empty before popping</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 6 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use <code>list</code> for small stacks and <code>deque</code> for large ones.</li>
            <li>Always check for empty stack before <code>pop()</code>.</li>
            <li>Use clear variable names for readability, e.g., <code>stack</code> instead of <code>s</code>.</li>
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
            <li>Create a stack and push 5 numbers</li>
            <li>Pop the top element and print it</li>
            <li>Peek at the top element without removing it</li>
            <li>Check if the stack is empty</li>
            <li>Implement the same using <code>deque</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <ul className="text-purple-800 dark:text-purple-300 space-y-2">
            <li>Stack is a LIFO data structure</li>
            <li>Python lists can implement simple stacks</li>
            <li><code>deque</code> is better for large stacks</li>
            <li>Use push/pop to add/remove elements</li>
            <li>Check if empty before popping to avoid errors</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
