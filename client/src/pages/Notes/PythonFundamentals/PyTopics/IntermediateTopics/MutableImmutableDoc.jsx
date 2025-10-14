/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function MutableImmutableDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Mutable vs Immutable Data Types</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python, data types can be classified as <strong>mutable</strong> or <strong>immutable</strong>. 
        Understanding this distinction is crucial because it affects how variables behave, 
        how memory is managed, and how changes to objects are handled.
      </p>

      {/* ✅ Section 1 - What are Mutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mutable Data Types
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Mutable data types are objects that can be changed after they are created. 
            Modifying them does not create a new object; instead, it updates the existing object in memory.
          </p>
        </div>

        <CodeBlock
          code={`# List is mutable
my_list = [1, 2, 3]
my_list.append(4)   # modifies the same object
print(my_list)      # [1, 2, 3, 4]

# Dictionary is mutable
my_dict = {'a': 1, 'b': 2}
my_dict['c'] = 3
print(my_dict)      # {'a': 1, 'b': 2, 'c': 3}`}
        />
      </section>

      {/* ✅ Section 2 - What are Immutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Immutable Data Types
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Immutable data types are objects that cannot be changed after creation. 
            Any operation that seems to modify them actually creates a new object in memory.
          </p>
        </div>

        <CodeBlock
          code={`# String is immutable
my_str = "Hello"
new_str = my_str.replace("H", "J")  # creates new string
print(my_str)   # Hello
print(new_str)  # Jello

# Tuple is immutable
my_tuple = (1, 2, 3)
# my_tuple[0] = 10  # Error: 'tuple' object does not support item assignment`}
        />
      </section>

      {/* ✅ Section 3 - List of Mutable and Immutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Mutable and Immutable Types
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <div className="text-blue-700 dark:text-blue-300 space-y-2">
            <p><strong>Mutable:</strong> list, dict, set, bytearray</p>
            <p><strong>Immutable:</strong> int, float, bool, string, tuple, frozenset, bytes</p>
          </div>
        </div>

        <CodeBlock
          code={`# Demonstrating memory change
a = [1,2,3]
b = a
a.append(4)
print(b)  # [1,2,3,4] -> mutable, same reference

x = 10
y = x
x += 5
print(y)  # 10 -> immutable, new object created`}
        />
      </section>

      {/* ✅ Section 4 - Behavior with Functions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Mutable vs Immutable in Functions
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Passing mutable and immutable objects to functions shows different behaviors:
          </p>
        </div>

        <CodeBlock
          code={`def modify_list(lst):
    lst.append(100)

my_list = [1,2,3]
modify_list(my_list)
print(my_list)  # [1,2,3,100] -> mutable changed

def modify_int(x):
    x += 100
    return x

num = 50
new_num = modify_int(num)
print(num)      # 50 -> immutable unchanged
print(new_num)  # 150`}
        />
      </section>

      {/* ✅ Section 5 - Advantages of Immutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advantages of Immutable Types
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-red-700 dark:text-red-300 space-y-2">
            <li>Thread-safe: no unexpected changes in multi-threaded programs.</li>
            <li>Hashable: can be used as dictionary keys or set elements.</li>
            <li>Easier to debug and maintain.</li>
            <li>Helps prevent accidental side effects.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 6 - Advantages of Mutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Advantages of Mutable Types
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>Efficient memory usage for large, changing data.</li>
            <li>Flexibility to update, append, or remove elements.</li>
            <li>Useful for dynamic data structures like stacks, queues, and lists.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Identity vs Equality */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Identity vs Equality
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <CodeBlock
            code={`# Mutable example
a = [1,2,3]
b = a
print(a is b)  # True -> same object
print(a == b)  # True -> same content

# Immutable example
x = 100
y = 100
print(x is y)  # True -> small integers cached
y = 200
print(x is y)  # False -> different object`}
          />
        </div>
      </section>

      {/* ✅ Section 8 - Copying Mutable Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Copying Mutable Types
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <CodeBlock
            code={`# Shallow copy
original = [1,2,[3,4]]
shallow = original[:]
shallow[2][0] = 999
print(original)  # [1,2,[999,4]]

# Deep copy
import copy
deep = copy.deepcopy(original)
deep[2][1] = 888
print(original)  # [1,2,[999,4]]
print(deep)      # [1,2,[999,888]]`}
          />
        </div>
      </section>

      {/* ✅ Section 9 - Quick Exercises */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-blue-700 dark:text-blue-300 space-y-2">
            <li>Identify mutable and immutable types in a given list of objects.</li>
            <li>Pass mutable and immutable objects to a function and observe changes.</li>
            <li>Create a tuple containing mutable elements and modify them. Observe effects.</li>
            <li>Experiment with dictionary keys: try using mutable vs immutable objects.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 10 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Mutable objects can be changed after creation; immutable objects cannot.</li>
            <li>Mutable objects include list, dict, set, bytearray; immutable include int, str, tuple, frozenset.</li>
            <li>Immutable objects are hashable and safer in multi-threaded contexts.</li>
            <li>Mutable objects are flexible and efficient for dynamic data structures.</li>
            <li>Understanding mutability helps prevent bugs and unexpected side effects.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
