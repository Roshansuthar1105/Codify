import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Loops = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Loops</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Loops allow you to execute code repeatedly. Python provides two main types of loops: <code>for</code> loops for iterating over sequences, 
                    and <code>while</code> loops for running until a condition becomes false. Master loops to automate repetitive tasks efficiently.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">For Loops</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        For loops iterate over sequences like lists, strings, ranges, and other iterable objects.
                    </p>
                    <CodeBlock code={`# Basic for loop with range
for i in range(5):
    print(f"Iteration {i}")

# range() variations
for i in range(1, 6):      # Start at 1, end at 5
    print(f"Number: {i}")

for i in range(2, 11, 2):  # Start at 2, end at 10, step by 2
    print(f"Even number: {i}")

for i in range(10, 0, -1): # Countdown from 10 to 1
    print(f"Countdown: {i}")

# Loop through a list
fruits = ["apple", "banana", "cherry", "date"]
for fruit in fruits:
    print(f"I love {fruit}s!")

# Loop through a string
word = "Python"
for letter in word:
    print(f"Letter: {letter}")

# Loop with index using enumerate()
colors = ["red", "green", "blue"]
for index, color in enumerate(colors):
    print(f"Color {index + 1}: {color}")

# Loop through multiple lists with zip()
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Practical example: Calculate total and average
scores = [85, 92, 78, 96, 88]
total = 0
for score in scores:
    total += score

average = total / len(scores)
print(f"Total: {total}, Average: {average:.1f}")

# List comprehension (advanced for loop)
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")  # [1, 4, 9, 16, 25]

# Filtering with list comprehension
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(f"Even squares: {even_squares}")  # [4, 16, 36, 64, 100]`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">While Loops</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        While loops continue executing as long as their condition remains true. Perfect for situations where you don&apos;t know the exact number of iterations.
                    </p>
                    <CodeBlock code={`# Basic while loop
count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1

# User input validation
password = ""
while password != "secret123":
    password = input("Enter password: ")
    if password != "secret123":
        print("Incorrect password, try again!")

print("Access granted!")

# Game loop example
import random
number = random.randint(1, 10)
guess = 0
attempts = 0

while guess != number:
    guess = int(input("Guess a number between 1 and 10: "))
    attempts += 1
    
    if guess < number:
        print("Too low!")
    elif guess > number:
        print("Too high!")
    else:
        print(f"Correct! You got it in {attempts} attempts!")

# Processing data until condition met
balance = 1000
while balance > 0:
    withdrawal = float(input(f"Current balance: \${balance}. Enter withdrawal amount: "))
    if withdrawal > balance:
        print("Insufficient funds!")
    else:
        balance -= withdrawal
        print(f"Withdrawal successful. New balance: \${balance}")

print("Account empty!")

# Infinite loop with break condition
while True:
    command = input("Enter command (type 'quit' to exit): ").lower()
    if command == "quit":
        break
    elif command == "hello":
        print("Hello there!")
    elif command == "help":
        print("Available commands: hello, help, quit")
    else:
        print("Unknown command. Type 'help' for available commands.")

print("Goodbye!")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Loop Control Statements</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Control the flow of your loops with <code>break</code>, <code>continue</code>, and <code>else</code> clauses.
                    </p>
                    <CodeBlock code={`# break statement - exit loop completely
print("Finding first even number greater than 10:")
for num in range(11, 20):
    if num % 2 == 0:
        print(f"Found: {num}")
        break
    print(f"{num} is odd")

# continue statement - skip current iteration
print("\nPrinting only even numbers:")
for num in range(1, 11):
    if num % 2 != 0:
        continue
    print(f"Even: {num}")

# else clause with loops - executes if loop completes without break
print("\nSearching for number 15:")
for num in range(1, 11):
    if num == 15:
        print("Found 15!")
        break
    print(f"Checking {num}")
else:
    print("15 not found in range")

# Nested loops with break and continue
print("\nMultiplication table (skip multiples of 5):")
for i in range(1, 4):
    print(f"\nTable of {i}:")
    for j in range(1, 11):
        if (i * j) % 5 == 0:
            continue
        print(f"{i} x {j} = {i * j}")

# Practical example: Prime number checker
def is_prime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            print(f"{n} is not prime (divisible by {i})")
            return False
    else:
        print(f"{n} is prime!")
        return True

# Test prime numbers
test_numbers = [17, 18, 19, 20, 21]
for number in test_numbers:
    is_prime(number)

# Menu system with nested loops
while True:
    print("\n=== Main Menu ===")
    print("1. Calculator")
    print("2. Text Tools")
    print("3. Exit")
    
    choice = input("Enter your choice: ")
    
    if choice == "1":
        while True:
            print("\n--- Calculator ---")
            print("1. Add")
            print("2. Subtract")
            print("3. Back to main menu")
            
            calc_choice = input("Enter choice: ")
            
            if calc_choice == "1":
                a = float(input("First number: "))
                b = float(input("Second number: "))
                print(f"Result: {a + b}")
            elif calc_choice == "2":
                a = float(input("First number: "))
                b = float(input("Second number: "))
                print(f"Result: {a - b}")
            elif calc_choice == "3":
                break
            else:
                print("Invalid choice!")
                
    elif choice == "2":
        while True:
            print("\n--- Text Tools ---")
            print("1. Uppercase")
            print("2. Count words")
            print("3. Back to main menu")
            
            text_choice = input("Enter choice: ")
            
            if text_choice == "1":
                text = input("Enter text: ")
                print(f"Uppercase: {text.upper()}")
            elif text_choice == "2":
                text = input("Enter text: ")
                words = len(text.split())
                print(f"Word count: {words}")
            elif text_choice == "3":
                break
            else:
                print("Invalid choice!")
                
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Invalid choice!")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Nested Loops</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Loops within loops are useful for working with multi-dimensional data, creating patterns, or processing complex structures.
                    </p>
                    <CodeBlock code={`# Simple nested loop pattern
print("Creating a pattern:")
for i in range(5):
    for j in range(i + 1):
        print("*", end="")
    print()  # New line after each row

# Multiplication table
print("\nMultiplication Table:")
print("   ", end="")
for i in range(1, 6):
    print(f"{i:4}", end="")
print()

for i in range(1, 6):
    print(f"{i}: ", end="")
    for j in range(1, 6):
        print(f"{i*j:4}", end="")
    print()

# Working with 2D lists (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("\nMatrix elements:")
for row_index, row in enumerate(matrix):
    for col_index, value in enumerate(row):
        print(f"matrix[{row_index}][{col_index}] = {value}")

# Finding max element in 2D list
max_value = matrix[0][0]
max_position = (0, 0)

for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if matrix[i][j] > max_value:
            max_value = matrix[i][j]
            max_position = (i, j)

print(f"\nMax value {max_value} found at position {max_position}")

# Dictionary iteration
students = {
    "Alice": {"math": 95, "science": 87, "english": 92},
    "Bob": {"math": 78, "science": 85, "english": 88},
    "Charlie": {"math": 92, "science": 94, "english": 89}
}

print("\nStudent grades:")
for student, subjects in students.items():
    total = 0
    print(f"\n{student}:")
    for subject, grade in subjects.items():
        print(f"  {subject}: {grade}")
        total += grade
    average = total / len(subjects)
    print(f"  Average: {average:.1f}")

# Practical example: Password strength checker
def check_password_strength(password):
    criteria = {
        "length": len(password) >= 8,
        "uppercase": False,
        "lowercase": False,
        "digit": False,
        "special": False
    }
    
    special_chars = '!@#$%^&*(),.?":{}|<>'
    
    for char in password:
        if char.isupper():
            criteria["uppercase"] = True
        elif char.islower():
            criteria["lowercase"] = True
        elif char.isdigit():
            criteria["digit"] = True
        elif char in special_chars:
            criteria["special"] = True
    
    passed = 0
    print("Password criteria check:")
    for criterion, status in criteria.items():
        status_text = "✓" if status else "✗"
        print(f"  {criterion}: {status_text}")
        if status:
            passed += 1
    
    strength = ["Very Weak", "Weak", "Fair", "Good", "Strong"][passed]
    print(f"Password strength: {strength}")
    
    return passed >= 4

# Test password strength
test_passwords = ["password", "Password1", "P@ssw0rd!", "MyStr0ng!P@ss"]
for pwd in test_passwords:
    print(f"\nTesting password: '{pwd}'")
    check_password_strength(pwd)
    print("-" * 30)`} />
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4">
                        <h4 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">💡 Performance Tip:</h4>
                        <p className="text-blue-700 dark:text-blue-400 text-sm">
                            Use <code>break</code> and <code>continue</code> strategically to avoid unnecessary iterations. For large datasets, consider using built-in functions like <code>any()</code>, <code>all()</code>, or list comprehensions for better performance.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Loop Best Practices</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Follow these guidelines to write efficient and readable loop code.
                    </p>
                    <CodeBlock code={`# 1. Use enumerate() instead of range(len())
items = ["apple", "banana", "cherry"]

# Not recommended
for i in range(len(items)):
    print(f"{i}: {items[i]}")

# Better approach
for i, item in enumerate(items):
    print(f"{i}: {item}")

# 2. Use zip() for parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Not recommended
for i in range(min(len(names), len(scores))):
    print(f"{names[i]}: {scores[i]}")

# Better approach
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# 3. Avoid modifying list while iterating
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Not recommended (can cause issues)
# for num in numbers:
#     if num % 2 == 0:
#         numbers.remove(num)

# Better approaches
# Option 1: Create new list
odd_numbers = [num for num in numbers if num % 2 != 0]
print(f"Odd numbers: {odd_numbers}")

# Option 2: Iterate backwards
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        numbers.pop(i)

# Option 3: Use filter()
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odd_numbers = list(filter(lambda x: x % 2 != 0, numbers))

# 4. Use appropriate data structures
# For membership testing, use sets instead of lists
large_list = list(range(10000))
large_set = set(range(10000))

import time

# Slow - searching in list
start = time.time()
for i in range(100):
    5000 in large_list
list_time = time.time() - start

# Fast - searching in set
start = time.time()
for i in range(100):
    5000 in large_set
set_time = time.time() - start

print(f"List search time: {list_time:.6f}s")
print(f"Set search time: {set_time:.6f}s")

# 5. Use generator expressions for memory efficiency
# Memory efficient for large datasets
def process_large_data():
    # Generator expression (memory efficient)
    squares_gen = (x**2 for x in range(1000000))
    
    # Only process what you need
    first_10_squares = []
    for i, square in enumerate(squares_gen):
        if i >= 10:
            break
        first_10_squares.append(square)
    
    return first_10_squares

result = process_large_data()
print(f"First 10 squares: {result}")

# 6. Loop optimization examples
def find_item_optimized(items, target):
    """Optimized search with early termination"""
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1

def process_batch_data(data, batch_size=100):
    """Process data in batches to manage memory"""
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        # Process batch
        processed = [item.upper() for item in batch]
        yield processed

# Example usage
sample_data = [f"item_{i}" for i in range(1000)]
for batch in process_batch_data(sample_data):
    print(f"Processed batch of {len(batch)} items")
    if len([b for b in process_batch_data(sample_data)]) >= 3:  # Just show first 3 batches
        break`} />
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-4">
                        <h4 className="text-green-800 dark:text-green-300 font-semibold mb-2">✅ Best Practices Summary:</h4>
                        <ul className="text-green-700 dark:text-green-400 text-sm list-disc list-inside space-y-1">
                            <li>Use <code>enumerate()</code> when you need both index and value</li>
                            <li>Use <code>zip()</code> for parallel iteration over multiple sequences</li>
                            <li>Avoid modifying a list while iterating over it</li>
                            <li>Choose appropriate data structures (sets for membership testing)</li>
                            <li>Use generator expressions for memory efficiency with large datasets</li>
                            <li>Consider early termination with <code>break</code> when appropriate</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Loops;