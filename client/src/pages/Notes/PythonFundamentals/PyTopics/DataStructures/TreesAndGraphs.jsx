/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function TreesAndGraphs() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-orange-600 dark:text-orange-400">Trees & Graphs</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Trees and graphs are fundamental <strong>data structures</strong> used to represent hierarchical and networked data. 
        Trees represent parent-child relationships, while graphs represent connections between entities.
      </p>

      {/* ✅ Section 1 - What is a Tree */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Tree?
        </h2>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
          <p className="text-orange-700 dark:text-orange-300">
            A tree is a hierarchical data structure with a <strong>root node</strong> and child nodes. 
            Each node may have zero or more children. The tree with at most two children per node is called a <strong>binary tree</strong>.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Root node – the topmost node</li>
          <li>Child nodes – nodes connected below a parent</li>
          <li>Leaf nodes – nodes with no children</li>
          <li>Height – the longest path from root to a leaf</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Binary Tree Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Binary Tree Example
        </h2>
        <CodeBlock code={`class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = Node(10)
root.left = Node(5)
root.right = Node(20)

print(root.data, root.left.data, root.right.data)`} />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: A simple binary tree with root 10 and two children (5 and 20).
        </p>
      </section>

      {/* ✅ Section 3 - Binary Search Tree */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Binary Search Tree (BST)
        </h2>
        <CodeBlock code={`class BSTNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return BSTNode(key)
    if key < root.data:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root

root = BSTNode(15)
insert(root, 10)
insert(root, 20)
insert(root, 8)
insert(root, 12)`} />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: BST maintains order – left child &lt; parent &lt; right child.
        </p>
      </section>

      {/* ✅ Section 4 - Graph Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Graph Example
        </h2>
        <CodeBlock code={`graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"]
}

print(graph["A"])  # ['B', 'C']`} />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Graph represented as an adjacency list using a Python dictionary.
        </p>
      </section>

      {/* ✅ Section 5 - Graph Traversals */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Graph Traversals
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Two common ways to traverse a graph: <strong>BFS (Breadth First Search)</strong> and <strong>DFS (Depth First Search)</strong>.
        </p>
        <CodeBlock code={`# BFS example
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            print(node, end=" ")
            visited.add(node)
            queue.extend([n for n in graph[node] if n not in visited])

bfs(graph, "A")  # Output: A B C D`} />
      </section>

      {/* ✅ Section 6 - Step-by-Step Tree Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Binary Tree Example
        </h2>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-orange-700 dark:text-orange-300">
            <li>Create node class</li>
            <li>Initialize root node</li>
            <li>Add left and right children</li>
            <li>Print node values</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a binary tree with 3 levels and print all nodes.</li>
            <li>Create a BST and insert 5 nodes.</li>
            <li>Create a graph with 5 nodes and adjacency lists.</li>
            <li>Traverse the graph using BFS and DFS.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
          <ul className="text-orange-800 dark:text-orange-300 space-y-2">
            <li>Trees represent hierarchical data structures with a root and children.</li>
            <li>Binary Search Tree (BST) keeps nodes in a sorted order.</li>
            <li>Graphs represent connections between nodes; adjacency lists are common.</li>
            <li>BFS explores neighbors level by level, DFS explores deeper before siblings.</li>
            <li>Useful in modeling real-world data: family trees, social networks, web links, etc.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
