/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function FileHandling() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-indigo-600 dark:text-indigo-400">File Handling</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        <strong>File handling</strong> in Python allows you to read, write, and manage files easily.
        You can open a file, perform operations, and close it properly using the <code>with</code> statement.
      </p>

      {/* ✅ Section 1 - What is File Handling */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is File Handling?
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p className="text-indigo-700 dark:text-indigo-300">
            File handling is like reading or writing a notebook — open it, make changes, and close it properly to save everything.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Open:</strong> Access the file</li>
          <li><strong>Read/Write:</strong> Perform operations</li>
          <li><strong>Close:</strong> Free up resources</li>
          <li><strong>Modes:</strong> Decide operation type (read, write, append)</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Basic File Operations */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Basic File Operations
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>with</code> statement ensures your file closes automatically after operations.
        </p>
        <CodeBlock
          code={`# Writing to a file
with open("sample.txt", "w") as file:
    file.write("Hello, File!")
    file.write("\\nThis is a new line.")

# Reading from a file
with open("sample.txt", "r") as file:
    content = file.read()
    print(content)`}
        />
      </section>

      {/* ✅ Section 3 - File Modes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">File Modes</h2>
        <CodeBlock
          code={`with open("file.txt", "r") as f:   # Read only
    content = f.read()

with open("file.txt", "w") as f:   # Write (overwrite)
    f.write("New content")

with open("file.txt", "a") as f:   # Append
    f.write("\\nAdded text")

with open("file.txt", "r+") as f:  # Read + Write
    content = f.read()
    f.write("\\nExtra line")`}
        />
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li><code>"r"</code> — Read (file must exist)</li>
            <li><code>"w"</code> — Write (overwrites or creates)</li>
            <li><code>"a"</code> — Append (adds to end)</li>
            <li><code>"r+"</code> — Read and write</li>
            <li><code>"b"</code> — Binary mode (e.g. "rb", "wb")</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 4 - Reading Methods */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Different Ways to Read Files
        </h2>
        <CodeBlock
          code={`with open("sample.txt", "r") as file:
    print(file.read())          # Entire file
    file.seek(0)
    print(file.readline())      # First line
    file.seek(0)
    print(file.readlines())     # List of lines`}
        />
      </section>

      {/* ✅ Section 5 - Writing Methods */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Writing Files
        </h2>
        <CodeBlock
          code={`# Single string
with open("output.txt", "w") as f:
    f.write("Hello World\\n")

# Multiple lines
with open("output.txt", "a") as f:
    f.writelines(["Line 1\\n", "Line 2\\n"])`}
        />
      </section>

      {/* ✅ Section 6 - File Position Control */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          File Position and Seeking
        </h2>
        <CodeBlock
          code={`with open("example.txt", "r+") as f:
    print("Start:", f.tell())
    data = f.read(10)
    print("After reading:", f.tell())
    f.seek(5)
    f.write("INSERT")`}
        />
      </section>

      {/* ✅ Section 7 - Error Handling */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Error Handling
        </h2>
        <CodeBlock
          code={`try:
    with open("unknown.txt", "r") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found!")
except Exception as e:
    print("Error:", e)`}
        />
      </section>

      {/* ✅ Section 8 - Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step-by-Step Example
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <ol className="list-decimal ml-5 text-indigo-700 dark:text-indigo-300 space-y-2">
            <li>Create and write to a file</li>
            <li>Read and display content</li>
            <li>Append extra text</li>
            <li>Re-read to verify</li>
          </ol>
        </div>
        <CodeBlock
          code={`try:
    with open("diary.txt", "w") as f:
        f.write("My Diary\\n---\\n")
        f.write("Learned Python file handling.\\n")

    with open("diary.txt", "r") as f:
        print(f.read())

    with open("diary.txt", "a") as f:
        f.write("It was fun!\\n")

    with open("diary.txt", "r") as f:
        print(f.read())
except Exception as e:
    print("Error:", e)`}
        />
      </section>

      {/* ✅ Section 9 - Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Always use <code>with</code> for auto file closing</li>
            <li>Handle exceptions using try-except</li>
            <li>Use binary mode for non-text files</li>
            <li>Check existence before reading</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 10 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a file and write your name</li>
            <li>Read and print content</li>
            <li>Append your favorite color</li>
            <li>Print each line with line numbers</li>
            <li>Copy content from one file to another</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 11 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <ul className="text-indigo-800 dark:text-indigo-300 space-y-2">
            <li>Use <code>open()</code> with <code>with</code> statement</li>
            <li>Modes: <code>"r"</code>, <code>"w"</code>, <code>"a"</code>, <code>"r+"</code></li>
            <li>Methods: <code>read()</code>, <code>write()</code>, <code>writelines()</code></li>
            <li>Use <code>seek()</code> and <code>tell()</code> for position control</li>
            <li>Always handle exceptions</li>
          </ul>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Pro Tip:</strong> Practice by creating small file-based tools like a diary app or a note saver!
        </p>
      </div>
    </div>
  );
}
