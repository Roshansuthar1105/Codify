import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const NestedLoops = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Nested Loops</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Nested loops are loops inside other loops. Think of it like boxes inside boxes - 
                    for each outer box, you go through all the inner boxes. Perfect for working with grids, tables, and patterns.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Nested Loop?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A nested loop is simply one loop inside another. The inner loop runs completely for each step of the outer loop.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Basic nested loop structure
for outer in range(2):      # Outer loop runs 2 times
    for inner in range(3):  # Inner loop runs 3 times for each outer
        print(f"Outer: {outer}, Inner: {inner}")

# Output:
# Outer: 0, Inner: 0
# Outer: 0, Inner: 1
# Outer: 0, Inner: 2
# Outer: 1, Inner: 0
# Outer: 1, Inner: 1
# Outer: 1, Inner: 2`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 1: Simple Patterns</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Let&apos;s start with creating simple patterns using nested loops.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Rectangle Pattern</h4>
                            <CodeBlock code={`# Print a 3x4 rectangle of stars
for row in range(3):        # 3 rows
    for col in range(4):    # 4 columns
        print("*", end=" ")
    print()  # New line after each row

# Output:
# * * * *
# * * * *
# * * * *`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Triangle Pattern</h4>
                            <CodeBlock code={`# Print a triangle
for row in range(1, 5):     # Rows 1 to 4
    for col in range(row):  # Print 'row' number of stars
        print("*", end=" ")
    print()

# Output:
# *
# * *
# * * *
# * * * *`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 2: Working with Lists</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Nested loops are perfect for working with 2D data like tables or grids.
                    </p>
                    
                    <CodeBlock code={`# Simple 2D list (like a table)
table = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Print each element
for row in table:           # Go through each row
    for number in row:      # Go through each number in the row
        print(number, end=" ")
    print()  # New line after each row

# Output:
# 1 2 3
# 4 5 6
# 7 8 9`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 3: Practical Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 1: Multiplication Table</h4>
                            <CodeBlock code={`# Simple multiplication table
for i in range(1, 4):       # Numbers 1 to 3
    for j in range(1, 4):   # Numbers 1 to 3
        result = i * j
        print(f"{i} x {j} = {result}")
    print("-" * 10)  # Separator

# Output:
# 1 x 1 = 1
# 1 x 2 = 2
# 1 x 3 = 3
# ----------
# 2 x 1 = 2
# 2 x 2 = 4
# 2 x 3 = 6
# ----------`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 2: Finding Items</h4>
                            <CodeBlock code={`# List of students and their grades
students = [
    ["Alice", 85],
    ["Bob", 92],
    ["Charlie", 78]
]

# Find a specific student
target = "Bob"
for student in students:
    name = student[0]
    grade = student[1]
    if name == target:
        print(f"Found {name} with grade {grade}")
        break  # Stop searching once found`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 4: Using Index Numbers</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Sometimes you need to know the position (index) of items in your loops.
                    </p>
                    
                    <CodeBlock code={`# Working with indices
grid = [
    ["A", "B", "C"],
    ["D", "E", "F"]
]

for row_index in range(len(grid)):
    for col_index in range(len(grid[row_index])):
        value = grid[row_index][col_index]
        print(f"Position ({row_index},{col_index}): {value}")

# Output:
# Position (0,0): A
# Position (0,1): B
# Position (0,2): C
# Position (1,0): D
# Position (1,1): E
# Position (1,2): F`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Step 5: Breaking Out of Loops</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Sometimes you need to stop the loops early when you find what you&apos;re looking for.
                    </p>
                    
                    <CodeBlock code={`# Finding the first even number in a 2D list
numbers = [
    [1, 3, 5],
    [7, 8, 9],  # 8 is the first even number
    [11, 13, 15]
]

found = False
for row in numbers:
    for num in row:
        if num % 2 == 0:  # If number is even
            print(f"First even number found: {num}")
            found = True
            break  # Break inner loop
    if found:
        break  # Break outer loop too

# Output: First even number found: 8`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Common Use Cases</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibond text-green-800 dark:text-green-300 mb-3">Perfect For:</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Creating patterns and shapes
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Working with tables/grids
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Comparing all combinations
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Processing 2D data
                                </li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibond text-yellow-800 dark:text-yellow-300 mb-3">Be Careful With:</h3>
                            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    Very large data sets (slow performance)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    Too many nested levels (confusing)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    Breaking out of multiple loops
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    Going outside list boundaries
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibond text-gray-800 dark:text-white mb-4">Quick Reference</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Basic structure:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">for outer in range(): for inner in range():</code>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Break inner loop:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">break</code> (only stops inner loop)
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Break both loops:</strong> Use a flag variable or function
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <strong>Access by index:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">list[row][col]</code>
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibond text-blue-800 dark:text-blue-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Inner loop completes all iterations for each outer loop step</li>
                        <li>• Great for working with 2D data like tables and grids</li>
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">range(len(list))</code> when you need index positions</li>
                        <li>• Be careful with performance - nested loops can be slow with large data</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Try creating a simple tic-tac-toe grid using nested loops!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NestedLoops;