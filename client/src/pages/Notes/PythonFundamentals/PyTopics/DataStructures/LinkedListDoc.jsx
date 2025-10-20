/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function LinkedListDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">Linked Lists</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        A <strong>linked list</strong> is a linear data structure where elements, called <strong>nodes</strong>, are connected using pointers. 
        Unlike arrays, linked lists do not store elements in contiguous memory locations. They are dynamic and can grow or shrink at runtime.
      </p>

      {/* ✅ Section 1 - What is a Linked List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Linked List?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            A linked list is made of nodes where each node contains data and a reference (pointer) to the next node. 
            The first node is called the <strong>head</strong>, and the last node points to <code>None</code>.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Dynamic data structure – size can change during runtime</li>
          <li>Efficient insertion and deletion at any position</li>
          <li>No direct access by index – must traverse from head</li>
          <li>Used in stacks, queues, and graph adjacency lists</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Types of Linked Lists */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Types of Linked Lists
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Singly Linked List:</strong> Each node points to the next node. Traversal is forward only.</li>
          <li><strong>Doubly Linked List:</strong> Each node has pointers to both previous and next nodes. Traversal is forward and backward.</li>
          <li><strong>Circular Linked List:</strong> Last node points back to the head node, forming a circle.</li>
        </ul>
      </section>

      {/* ✅ Section 3 - Node Structure */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Node Structure
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Each node has two main components:
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><strong>data:</strong> Stores the value of the node</li>
          <li><strong>next:</strong> Pointer/reference to the next node</li>
        </ul>
        <CodeBlock
          code={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`}
        />
      </section>

      {/* ✅ Section 4 - Linked List Class */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Linked List Class
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The linked list class manages the <code>head</code> node and provides methods to perform operations like insertion, deletion, and traversal.
        </p>
        <CodeBlock
          code={`class LinkedList:
    def __init__(self):
        self.head = None

    # Append node at the end
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    # Display the linked list
    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")`}
        />
      </section>

      {/* ✅ Section 5 - Insertion */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Insertion
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><strong>At beginning:</strong> New node becomes head</li>
          <li><strong>At end:</strong> New node added after the last node</li>
          <li><strong>At position:</strong> Insert at specific index by traversing</li>
        </ul>
        <CodeBlock
          code={`# Insert at beginning
def push(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node`}
        />
      </section>

      {/* ✅ Section 6 - Deletion */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Deletion
        </h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>Delete node by <strong>value</strong></li>
          <li>Delete node by <strong>position</strong></li>
          <li>Always check if the node exists before deletion</li>
        </ul>
        <CodeBlock
          code={`# Delete node by value
def delete_node(self, key):
    temp = self.head
    if temp and temp.data == key:
        self.head = temp.next
        return
    prev = None
    while temp and temp.data != key:
        prev = temp
        temp = temp.next
    if temp is None:
        return
    prev.next = temp.next`}
        />
      </section>

      {/* ✅ Section 7 - Searching and Counting */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Searching & Counting Nodes
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can traverse the linked list to search for a value or count the number of nodes.
        </p>
        <CodeBlock
          code={`# Count nodes
def count_nodes(self):
    count = 0
    current = self.head
    while current:
        count += 1
        current = current.next
    return count

# Search for a value
def search(self, key):
    current = self.head
    while current:
        if current.data == key:
            return True
        current = current.next
    return False`}
        />
      </section>

      {/* ✅ Section 8 - Using the Linked List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Example: Using Linked List
        </h2>
        <CodeBlock
          code={`ll = LinkedList()
ll.append(10)
ll.append(20)
ll.push(5)        # Insert at beginning
ll.display()      # Output: 5 -> 10 -> 20 -> None
ll.delete_node(10)
ll.display()      # Output: 5 -> 20 -> None
print(ll.count_nodes())  # Output: 2
print(ll.search(20))     # Output: True`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Shows adding nodes at beginning/end, deleting, counting, and searching.
        </p>
      </section>

      {/* ✅ Section 9 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 space-y-2 text-indigo-700 dark:text-indigo-300">
            <li>Create a linked list: <code>ll = LinkedList()</code></li>
            <li>Append nodes: <code>ll.append(10)</code>, <code>ll.append(20)</code></li>
            <li>Insert at beginning: <code>ll.push(5)</code></li>
            <li>Delete a node by value: <code>ll.delete_node(10)</code></li>
            <li>Count nodes: <code>ll.count_nodes()</code></li>
            <li>Search for a node: <code>ll.search(20)</code></li>
            <li>Display final linked list: <code>ll.display()</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Tips & Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tips & Best Practices
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use linked lists when frequent insertion/deletion is needed</li>
            <li>Prefer arrays if you need fast random access</li>
            <li>Always handle empty list edge cases</li>
            <li>Use helper methods to avoid code repetition</li>
            <li>For doubly linked lists, maintain both <code>prev</code> and <code>next</code> pointers carefully</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 11 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a linked list and append 5 nodes</li>
            <li>Insert a node at the beginning</li>
            <li>Delete a node by value</li>
            <li>Count the number of nodes</li>
            <li>Search for a specific node</li>
            <li>Display the linked list at each step</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 12 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Linked list consists of nodes connected via pointers</li>
            <li>Dynamic size and efficient insertion/deletion at any position</li>
            <li>No direct random access – traverse from head to reach a node</li>
            <li>Useful for stacks, queues, adjacency lists, and dynamic data handling</li>
            <li>Always check for empty list before performing operations</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
