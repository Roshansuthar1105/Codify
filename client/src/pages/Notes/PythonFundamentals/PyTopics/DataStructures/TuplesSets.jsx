import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TuplesSets = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Tuples & Sets</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Tuples and Sets are two important data types in Python. Tuples store ordered data that cannot be changed, 
                    while Sets store unique items with no duplicates.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What are Tuples?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Tuples are like lists, but they cannot be changed after creation. 
                            They are perfect for storing data that should stay the same.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Creating tuples
point = (10, 20)        # Coordinates
colors = ("red", "green", "blue")
single = (42,)          # Single item (note the comma)
empty = ()              # Empty tuple

print(point)            # (10, 20)
print(colors[0])        # red (access by index)
print(len(colors))      # 3`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 1: Working with Tuples</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Accessing Tuple Items</h4>
                            <CodeBlock code={`student = ("Alice", 20, "Computer Science")

# Access by index
name = student[0]       # Alice
age = student[1]        # 20
major = student[2]      # Computer Science

# Unpacking (assign all at once)
name, age, major = student
print(f"{name} is {age} years old")`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Tuple Methods</h4>
                            <CodeBlock code={`numbers = (1, 2, 3, 2, 4, 2)

# Count how many times an item appears
count_2 = numbers.count(2)  # 3

# Find the position of an item
position = numbers.index(3)  # 2

# Check if item exists
print(2 in numbers)         # True
print(5 in numbers)         # False`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 2: When to Use Tuples</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Perfect For:</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Coordinates (x, y, z)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    RGB color values
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Database records
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    Function return values
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3">Not Good For:</h3>
                            <ul className="space-y-2 text-red-700 dark:text-red-300">
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    Data that needs to change
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    Adding/removing items
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    Sorting data
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <CodeBlock code={`# Real examples of tuple usage
# 1. Coordinates
position = (100, 200)
x, y = position

# 2. RGB colors
red = (255, 0, 0)
green = (0, 255, 0)

# 3. Person data
person = ("John", 25, "Engineer")
name, age, job = person

# 4. Function returning multiple values
def get_name_age():
    return "Alice", 20

name, age = get_name_age()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What are Sets?</h2>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
                        <p className="text-purple-700 dark:text-purple-300">
                            Sets are collections that automatically remove duplicate items. 
                            They are perfect when you only want unique values.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Creating sets
unique_numbers = {1, 2, 3, 2, 4, 3}  # Duplicates removed automatically
print(unique_numbers)  # {1, 2, 3, 4}

# From a list (removes duplicates)
numbers_list = [1, 2, 2, 3, 3, 4]
unique_set = set(numbers_list)
print(unique_set)  # {1, 2, 3, 4}

# Empty set
empty_set = set()  # Note: {} creates a dictionary, not a set`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 3: Working with Sets</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Adding and Removing Items</h4>
                            <CodeBlock code={`fruits = {"apple", "banana"}

# Add single item
fruits.add("orange")
print(fruits)  # {'apple', 'banana', 'orange'}

# Add multiple items
fruits.update(["grape", "kiwi"])
print(fruits)  # {'apple', 'banana', 'orange', 'grape', 'kiwi'}

# Remove items
fruits.remove("banana")     # Error if item not found
fruits.discard("mango")     # No error if item not found`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Set Operations</h4>
                            <CodeBlock code={`set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Union (all items from both sets)
combined = set1.union(set2)  # {1, 2, 3, 4, 5}

# Intersection (common items)
common = set1.intersection(set2)  # {3}

# Difference (items in set1 but not set2)
different = set1.difference(set2)  # {1, 2}

print(combined)   # {1, 2, 3, 4, 5}
print(common)     # {3}
print(different)  # {1, 2}`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 4: Real-World Set Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 1: Remove Duplicates</h4>
                            <CodeBlock code={`# Remove duplicates from a list
numbers = [1, 2, 2, 3, 3, 4, 5, 5]
unique_numbers = list(set(numbers))
print(unique_numbers)  # [1, 2, 3, 4, 5]

# Check if all items are unique
def all_unique(items):
    return len(items) == len(set(items))

print(all_unique([1, 2, 3]))     # True
print(all_unique([1, 2, 2, 3]))  # False`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 2: Find Common Interests</h4>
                            <CodeBlock code={`# Find what two people have in common
alice_hobbies = {"reading", "swimming", "coding"}
bob_hobbies = {"gaming", "reading", "cooking"}

# Common hobbies
common = alice_hobbies & bob_hobbies  # Shortcut for intersection
print(f"Common hobbies: {common}")    # {'reading'}

# All hobbies
all_hobbies = alice_hobbies | bob_hobbies  # Shortcut for union
print(f"All hobbies: {all_hobbies}")`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tuples vs Sets Comparison</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">🔒 Tuples</h3>
                            <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                                <li><strong>Ordered:</strong> Items have a fixed position</li>
                                <li><strong>Immutable:</strong> Cannot be changed</li>
                                <li><strong>Duplicates:</strong> Allowed</li>
                                <li><strong>Indexing:</strong> Can access by position</li>
                                <li><strong>Use for:</strong> Fixed data like coordinates</li>
                            </ul>
                        </div>
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🔄 Sets</h3>
                            <ul className="space-y-2 text-purple-700 dark:text-purple-300 text-sm">
                                <li><strong>Unordered:</strong> No fixed position</li>
                                <li><strong>Mutable:</strong> Can add/remove items</li>
                                <li><strong>Duplicates:</strong> Not allowed</li>
                                <li><strong>Indexing:</strong> Cannot access by position</li>
                                <li><strong>Use for:</strong> Unique items, removing duplicates</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Reference</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Tuple Operations</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">tuple[index]</code> - Access item</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">tuple.count(item)</code> - Count items</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">tuple.index(item)</code> - Find position</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">len(tuple)</code> - Get length</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Set Operations</h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">set.add(item)</code> - Add item</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">set.remove(item)</code> - Remove item</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">set1 & set2</code> - Intersection</li>
                                    <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">set1 | set2</code> - Union</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Tuples are immutable and ordered - perfect for fixed data</li>
                        <li>• Sets automatically remove duplicates and are great for unique items</li>
                        <li>• Use tuples for coordinates, colors, and database records</li>
                        <li>• Use sets to remove duplicates and find common elements</li>
                        <li>• Tuples can be indexed, sets cannot</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Try creating a tuple of your favorite colors and a set of unique numbers from a list with duplicates!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuplesSets;