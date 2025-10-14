/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function ContextManagersDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Context Managers</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        A <strong>Context Manager</strong> in Python is a structure that helps manage resources
        automatically — such as files, database connections, or network sockets. It ensures
        that setup and cleanup happen properly, even if an error occurs.
      </p>

      {/* ✅ Section 1 - Why Context Managers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Why We Need Context Managers
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            When we open files or connect to databases, forgetting to close them can cause
            resource leaks or data corruption. Context Managers handle such tasks automatically.
          </p>
        </div>

        <CodeBlock
          code={`# Without Context Manager
file = open("example.txt", "w")
file.write("Hello, Python!")
file.close()  # Must close manually`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">
          Using a context manager ensures the file closes automatically:
        </p>

        <CodeBlock
          code={`# With Context Manager
with open("example.txt", "w") as file:
    file.write("Hello, Python!")  # File closes automatically`}
        />
      </section>

      {/* ✅ Section 2 - How It Works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How Context Managers Work
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            A Context Manager internally uses two special methods:
          </p>
          <ul className="list-disc ml-6 mt-2 text-green-700 dark:text-green-300 space-y-1">
            <li><code>__enter__()</code> → Runs when the <code>with</code> block starts.</li>
            <li><code>__exit__()</code> → Runs when the block ends, even if an error occurs.</li>
          </ul>
        </div>

        <CodeBlock
          code={`class MyContext:
    def __enter__(self):
        print("Entering block")
        return "Resource Ready"

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting block")
        return False

with MyContext() as val:
    print(val)`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-4">Output:</p>
        <CodeBlock
          code={`Entering block
Resource Ready
Exiting block`}
        />
      </section>

      {/* ✅ Section 3 - Handling Exceptions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Handling Exceptions Inside Context Managers
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            The <code>__exit__()</code> method can handle exceptions. It receives:
          </p>
          <ul className="list-disc ml-6 mt-2 text-red-700 dark:text-red-300 space-y-1">
            <li><strong>exc_type</strong>: Type of exception</li>
            <li><strong>exc_val</strong>: Exception message</li>
            <li><strong>exc_tb</strong>: Traceback information</li>
          </ul>
        </div>

        <CodeBlock
          code={`class SafeContext:
    def __enter__(self):
        print("Start")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"Handled Error: {exc_val}")
        print("End of Context")
        return True  # Suppresses the error

with SafeContext():
    print("Inside block")
    raise ValueError("Something went wrong!")`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-4">Output:</p>
        <CodeBlock
          code={`Start
Inside block
Handled Error: Something went wrong!
End of Context`}
        />
      </section>

      {/* ✅ Section 4 - contextlib Module */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Using the contextlib Module
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            Python provides the <code>contextlib</code> module, allowing you to create context
            managers easily using the <code>@contextmanager</code> decorator.
          </p>
        </div>

        <CodeBlock
          code={`from contextlib import contextmanager

@contextmanager
def my_manager():
    print("Setup")
    yield "Resource Active"
    print("Cleanup")

with my_manager() as val:
    print(val)`}
        />

        <p className="text-gray-700 dark:text-gray-300 mt-4">Output:</p>
        <CodeBlock
          code={`Setup
Resource Active
Cleanup`}
        />
      </section>

      {/* ✅ Section 5 - Real-World Examples */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Real-World Examples
        </h2>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
            1️⃣ File Handling
          </h3>
          <CodeBlock
            code={`with open("data.txt", "r") as f:
    content = f.read()
    print(content)`}
          />

          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mt-6 mb-2">
            2️⃣ Database Connections
          </h3>
          <CodeBlock
            code={`import sqlite3

with sqlite3.connect("test.db") as conn:
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER, name TEXT)")
    conn.commit()`}
          />

          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mt-6 mb-2">
            3️⃣ Temporary Files
          </h3>
          <CodeBlock
            code={`import tempfile

with tempfile.TemporaryFile(mode="w+") as tmp:
    tmp.write("Temporary data")
    tmp.seek(0)
    print(tmp.read())`}
          />
        </div>
      </section>

      {/* ✅ Section 6 - Nested Context Managers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Nested Context Managers
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            You can use multiple context managers together using commas or nested blocks.
          </p>
        </div>

        <CodeBlock
          code={`with open("file1.txt") as f1, open("file2.txt") as f2:
    data1 = f1.read()
    data2 = f2.read()`}
        />
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-green-700 dark:text-green-300 space-y-2">
            <li>Create a simple context manager that prints messages on entry and exit.</li>
            <li>Modify it to handle exceptions using <code>__exit__()</code>.</li>
            <li>Use <code>@contextmanager</code> to simulate opening and closing a network connection.</li>
            <li>Write a context manager that measures the execution time of a block of code.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Context Managers automatically handle resource setup and cleanup.</li>
            <li>They use <code>__enter__()</code> and <code>__exit__()</code> methods internally.</li>
            <li>Use <code>with</code> statements to work safely with files, databases, etc.</li>
            <li><code>contextlib</code> allows easy creation using the <code>@contextmanager</code> decorator.</li>
            <li>They make code cleaner, safer, and more efficient.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
