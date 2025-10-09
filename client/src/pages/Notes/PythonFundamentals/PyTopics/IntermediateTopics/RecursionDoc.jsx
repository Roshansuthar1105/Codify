/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function RecursionDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Recursion</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>Recursion</strong> is a technique where a function calls itself to solve a
        smaller part of the same problem. It's useful for problems that can be divided
        into similar sub-problems (like factorials, tree traversals, and backtracking).
        Recursion needs a <em>base case</em> to stop, otherwise it will run forever.
      </p>

      {/* ✅ Section 1 - What is Recursion */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is Recursion?
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Recursion is when a function calls itself. Each recursive call should make progress
            towards the base case. Recursion is often clearer and shorter than iterative code
            for problems like tree traversal, combinatorics, and divide-and-conquer algorithms.
          </p>
        </div>

        <CodeBlock
          code={`# Simple recursive function - countdown
def countdown(n):
    if n <= 0:           # base case
        print("Blast off!")
    else:
        print(n)
        countdown(n - 1)  # recursive call

countdown(3)
# Output:
# 3
# 2
# 1
# Blast off!`}
        />
      </section>

      {/* ✅ Section 2 - Base Case & Recursive Case */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Base Case & Recursive Case
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Two parts of recursion:
          </p>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 dark:text-yellow-300 space-y-1">
            <li><strong>Base case</strong> — stops recursion (simple case).</li>
            <li><strong>Recursive case</strong> — the function calls itself with modified input.</li>
          </ul>
        </div>

        <CodeBlock
          code={`# Factorial example
def factorial(n):
    if n == 0:            # base case
        return 1
    return n * factorial(n - 1)  # recursive case

print(factorial(5))  # Output: 120`}
        />
      </section>

      {/* ✅ Section 3 - Recursion vs Iteration */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Recursion vs Iteration
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Both can solve repeated tasks. Recursion expresses the idea more directly for
            divide-and-conquer or tree-like problems. Iteration uses loops and is often more
            memory-efficient in Python because Python does not optimize tail recursion.
          </p>
        </div>

        <CodeBlock
          code={`# Fibonacci - iterative
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# Fibonacci - recursive
def fib_rec(n):
    if n <= 1:
        return n
    return fib_rec(n - 1) + fib_rec(n - 2)

print(fib_iter(10))  # 55
print(fib_rec(10))   # 55 (but slower without memoization)`}
        />
      </section>

      {/* ✅ Section 4 - Recursion Tree & Complexity */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Recursion Tree & Complexity
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Visualize calls as a tree. Complexity depends on the number of calls and work per call.
            For example, naive Fibonacci recursion has exponential time because it repeats work.
          </p>
        </div>

        <CodeBlock
          code={`# Naive fibonacci call count grows exponentially:
# fib_rec(5) calls fib_rec many times for same inputs.
# Use memoization to avoid repeated work.`}
        />
      </section>

      {/* ✅ Section 5 - Memoization (Top-down DP) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Memoization (Caching Recursive Results)
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Memoization stores results of expensive function calls and returns the cached result
            when the same inputs occur again. This converts exponential recursion into linear.
          </p>
        </div>

        <CodeBlock
          code={`# Fibonacci with memoization
def fib_memo(n, cache=None):
    if cache is None:
        cache = {}
    if n in cache:
        return cache[n]
    if n <= 1:
        cache[n] = n
    else:
        cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    return cache[n]

print(fib_memo(40))  # Fast compared to naive recursion`}
        />
      </section>

      {/* ✅ Section 6 - Tail Recursion (Python note) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tail Recursion (and Python's Limitation)
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            Tail recursion is when the recursive call is the last operation in the function.
            Some languages optimize tail recursion to avoid growing the call stack.
            Python does NOT perform tail-call optimization — avoid deep recursion or increase
            recursion limit carefully.
          </p>
        </div>

        <CodeBlock
          code={`# Tail-recursive style factorial (not optimized in Python)
def fact_tail(n, acc=1):
    if n == 0:
        return acc
    return fact_tail(n - 1, acc * n)

print(fact_tail(5))  # 120

# Note: Python will still create a new call frame each time.`}
        />
      </section>

      {/* ✅ Section 7 - Recursion with Memoization using lru_cache */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using functools.lru_cache
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Python's <code>functools.lru_cache</code> decorator provides an easy memoization tool.
          </p>
        </div>

        <CodeBlock
          code={`from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n < 2:
        return n
    return fib_cached(n-1) + fib_cached(n-2)

print(fib_cached(50))  # Fast and simple with caching`}
        />
      </section>

      {/* ✅ Section 8 - Backtracking (Recursion Pattern) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Backtracking with Recursion
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Backtracking is recursion that builds candidates piece-by-piece and abandons
            candidates that fail constraints. Useful for permutations, combinations, and
            puzzles (like N-Queens).
          </p>
        </div>

        <CodeBlock
          code={`# Generate permutations (simple backtracking)
def permutations(arr):
    result = []
    def backtrack(start):
        if start == len(arr):
            result.append(arr.copy())
            return
        for i in range(start, len(arr)):
            arr[start], arr[i] = arr[i], arr[start]
            backtrack(start + 1)
            arr[start], arr[i] = arr[i], arr[start]  # backtrack

    backtrack(0)
    return result

print(permutations([1,2,3]))`}
        />
      </section>

      {/* ✅ Section 9 - Tree Traversal Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Recursion for Tree Traversal
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            Trees are naturally recursive structures — process node, then recursively process children.
          </p>
        </div>

        <CodeBlock
          code={`# Simple binary tree node
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Pre-order traversal
def preorder(node):
    if not node:
        return []
    return [node.val] + preorder(node.left) + preorder(node.right)

root = Node(1, Node(2), Node(3, Node(4), None))
print(preorder(root))  # [1,2,3,4]`}
        />
      </section>

      {/* ✅ Section 10 - Handling Recursion Depth */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Handling Recursion Depth
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Python limits recursion depth (default ~1000) to prevent infinite recursion from crashing.
            You can check or set the limit using <code>sys.getrecursionlimit()</code> and
            <code>sys.setrecursionlimit()</code>, but increasing it should be done with care.
          </p>
        </div>

        <CodeBlock
          code={`import sys
print(sys.getrecursionlimit())  # default, often 1000

# Increase limit (use with caution)
# sys.setrecursionlimit(2000)`}
/>
      </section>

      {/* ✅ Section 11 - Common Pitfalls & Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Pitfalls & Tips
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-red-700 dark:text-red-300 space-y-2">
            <li>Always define a clear base case to stop recursion.</li>
            <li>Avoid deep recursion in Python when possible — use iterative or stack-based solutions.</li>
            <li>Use memoization to avoid repeated work (especially for overlapping subproblems).</li>
            <li>Be careful when modifying mutable objects across recursive calls.</li>
          </ul>
        </div>

        <CodeBlock
          code={`# Danger: missing base case => infinite recursion
def bad(n):
    return bad(n-1)  # no stopping condition -> RecursionError`}
        />
      </section>

      {/* ✅ Section 12 - Practical Examples (Multiple) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Practical Examples
        </h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">1️⃣ Sum of list</h3>
          <CodeBlock
            code={`def sum_list(arr):
    if not arr:          # base case: empty list
        return 0
    return arr[0] + sum_list(arr[1:])

print(sum_list([1,2,3,4]))  # 10`}
          />

          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mt-6 mb-2">2️⃣ Binary search (recursive)</h3>
          <CodeBlock
            code={`def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)

print(binary_search([1,3,5,7,9], 7))  # 3`}
          />
        </div>
      </section>

      {/* ✅ Section 13 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-blue-700 dark:text-blue-300 space-y-2">
            <li>Write a recursive function to compute GCD of two numbers.</li>
            <li>Implement recursive merge sort and explain time complexity.</li>
            <li>Use recursion to flatten a nested list of lists.</li>
            <li>Write a recursive solver for the N-Queens problem (small n).</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 14 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Recursion is solving a problem by calling the same function with smaller inputs.</li>
            <li>Always include a base case and ensure progress towards it.</li>
            <li>Use memoization or <code>functools.lru_cache</code> for overlapping subproblems.</li>
            <li>Python doesn't optimize tail recursion; watch recursion depth.</li>
            <li>Recursion is elegant for trees, backtracking, and divide-and-conquer algorithms.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
