import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Operators = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Operators</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Operators perform operations on variables and values. Python supports various types of operators for different purposes.
                    Understanding operators is crucial for performing calculations, making comparisons, and implementing logic in your programs.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Arithmetic Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Arithmetic operators perform mathematical calculations on numeric values.
                    </p>
                    <CodeBlock code={`a, b = 15, 4
print(a + b)      # Addition: 19
print(a - b)      # Subtraction: 11
print(a * b)      # Multiplication: 60
print(a / b)      # Division: 3.75 (returns float)
print(a // b)     # Floor division: 3 (integer result)
print(a % b)      # Modulo (remainder): 3
print(a ** b)     # Exponentiation: 50625 (15^4)

# Practical examples
price = 29.99
quantity = 3
total = price * quantity
tax_rate = 0.08
tax = total * tax_rate
final_price = total + tax
print(f"Total with tax: \${final_price:.2f}")  # Total with tax: $97.17

# Using modulo for even/odd check
number = 17
if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")  # 17 is odd`} />
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4">
                        <h4 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">💡 Pro Tip:</h4>
                        <p className="text-blue-700 dark:text-blue-400 text-sm">
                            The difference between <code>/</code> and <code>{'//'}</code>: Division (<code>/</code>) always returns a float, while floor division (<code>{'//'}</code>) returns an integer by rounding down.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Assignment Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Assignment operators assign values to variables and can combine assignment with arithmetic operations.
                    </p>
                    <CodeBlock code={`# Basic assignment
x = 10

# Compound assignment operators
x += 5    # Same as x = x + 5, now x = 15
x -= 3    # Same as x = x - 3, now x = 12
x *= 2    # Same as x = x * 2, now x = 24
x /= 4    # Same as x = x / 4, now x = 6.0
x //= 2   # Same as x = x // 2, now x = 3.0
x %= 2    # Same as x = x % 2, now x = 1.0
x **= 3   # Same as x = x ** 3, now x = 1.0

# Practical example: Bank account
balance = 1000
deposit = 250
balance += deposit  # Add deposit
print(f"After deposit: \${balance}")

withdrawal = 75
balance -= withdrawal  # Subtract withdrawal
print(f"After withdrawal: \${balance}")

# Interest calculation
interest_rate = 0.02
balance *= (1 + interest_rate)  # Apply 2% interest
print(f"After interest: \${balance:.2f}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Comparison Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Comparison operators compare values and return Boolean results (True or False).
                    </p>
                    <CodeBlock code={`a, b = 10, 5
print(a == b)     # Equal to: False
print(a != b)     # Not equal to: True
print(a > b)      # Greater than: True
print(a < b)      # Less than: False
print(a >= b)     # Greater than or equal to: True
print(a <= b)     # Less than or equal to: False

# String comparison (lexicographic order)
name1, name2 = "Alice", "Bob"
print(name1 < name2)   # True (A comes before B)
print("apple" > "Apple")  # True (lowercase > uppercase)

# Practical example: Grade evaluation
score = 87
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")  # Score: 87, Grade: B

# Chaining comparisons
age = 25
if 18 <= age <= 65:
    print("Working age")  # Working age
    
# Comparing different data types
print(5 == "5")    # False (int != string)
print(5 == 5.0)    # True (int equals float with same value)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Logical Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Logical operators combine conditional statements and work with Boolean values.
                    </p>
                    <CodeBlock code={`a, b = True, False
print(a and b)    # Logical AND: False
print(a or b)     # Logical OR: True
print(not a)      # Logical NOT: False

# Practical examples
age = 25
has_license = True
has_insurance = True

# Multiple conditions with AND
can_drive = age >= 18 and has_license and has_insurance
print(f"Can drive: {can_drive}")  # Can drive: True

# Multiple conditions with OR
weekend = True
holiday = False
can_sleep_in = weekend or holiday
print(f"Can sleep in: {can_sleep_in}")  # Can sleep in: True

# Complex logical expressions
temperature = 75
is_sunny = True
has_umbrella = False

good_day_out = (temperature > 70 and is_sunny) or (temperature > 60 and has_umbrella)
print(f"Good day to go out: {good_day_out}")  # Good day to go out: True

# Short-circuit evaluation
def expensive_check():
    print("Running expensive check...")
    return True

# The expensive_check() won't run because False and anything is False
result = False and expensive_check()
print(f"Result: {result}")  # Result: False (no print from expensive_check)

# Using logical operators with non-boolean values
# Empty collections, 0, None are "falsy"
name = ""
numbers = [1, 2, 3]
if not name:
    print("Name is empty")
if numbers:
    print("Numbers list has items")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Identity and Membership Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Identity operators check if objects are the same, while membership operators check if values exist in sequences.
                    </p>
                    <CodeBlock code={`# Identity operators (is, is not)
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(x == y)      # True (same content)
print(x is y)      # False (different objects in memory)
print(x is z)      # True (same object)
print(x is not y)  # True (different objects)

# Membership operators (in, not in)
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)        # True
print("orange" in fruits)       # False
print("grape" not in fruits)    # True

# String membership
text = "Hello, World!"
print("Hello" in text)          # True
print("hello" in text)          # False (case-sensitive)
print("xyz" not in text)        # True

# Dictionary membership (checks keys by default)
student = {"name": "Alice", "age": 20, "grade": "A"}
print("name" in student)        # True
print("Alice" in student)       # False (checks keys, not values)
print("major" not in student)   # True

# Practical example: User permissions
user_permissions = ["read", "write", "delete"]
action = "write"

if action in user_permissions:
    print(f"User can {action}")
else:
    print(f"Access denied for {action}")

# Email validation example
email = "user@example.com"
if "@" in email and "." in email:
    print("Valid email format")
else:
    print("Invalid email format")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Bitwise Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Bitwise operators work on bits and perform bit-by-bit operations. Useful for low-level programming and optimization.
                    </p>
                    <CodeBlock code={`# Bitwise operators work on binary representations
a, b = 5, 3  # 5 = 101, 3 = 011 in binary

print(a & b)   # Bitwise AND: 1 (001 in binary)
print(a | b)   # Bitwise OR: 7 (111 in binary)
print(a ^ b)   # Bitwise XOR: 6 (110 in binary)
print(~a)      # Bitwise NOT: -6 (inverts all bits)
print(a << 1)  # Left shift: 10 (1010 in binary)
print(a >> 1)  # Right shift: 2 (10 in binary)

# Practical example: Permissions using bitwise operations
# Each permission is a power of 2
READ = 1      # 001
WRITE = 2     # 010
EXECUTE = 4   # 100

# Combine permissions using OR
permissions = READ | WRITE  # 011 (read and write)
print(f"Permissions value: {permissions}")

# Check if user has specific permission using AND
has_read = bool(permissions & READ)
has_write = bool(permissions & WRITE)
has_execute = bool(permissions & EXECUTE)

print(f"Can read: {has_read}")      # True
print(f"Can write: {has_write}")    # True
print(f"Can execute: {has_execute}") # False

# Add execute permission
permissions |= EXECUTE  # Same as permissions = permissions | EXECUTE
print(f"New permissions: {permissions}")  # 111 (read, write, execute)

# Remove write permission using XOR
permissions ^= WRITE
print(f"After removing write: {permissions}")  # 101 (read, execute)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Operator Precedence</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Understanding operator precedence helps you write expressions that evaluate in the correct order.
                    </p>
                    <CodeBlock code={`# Operator precedence (highest to lowest)
# 1. Parentheses ()
# 2. Exponentiation **
# 3. Unary +, -, not
# 4. Multiplication *, Division /, Floor division //, Modulo %
# 5. Addition +, Subtraction -
# 6. Comparison operators
# 7. Identity operators is, is not
# 8. Membership operators in, not in
# 9. Logical operators: not, and, or

# Examples showing precedence
result1 = 2 + 3 * 4        # 14, not 20 (multiplication first)
result2 = (2 + 3) * 4      # 20 (parentheses first)
result3 = 2 ** 3 * 4       # 32 (exponentiation first: 8 * 4)
result4 = 2 * 3 ** 2       # 18 (exponentiation first: 2 * 9)

print(f"2 + 3 * 4 = {result1}")
print(f"(2 + 3) * 4 = {result2}")
print(f"2 ** 3 * 4 = {result3}")
print(f"2 * 3 ** 2 = {result4}")

# Complex expression
x = 10
y = 5
z = 2
result = x + y * z ** 2 - 1    # 10 + 5 * 4 - 1 = 10 + 20 - 1 = 29
print(f"Complex result: {result}")

# Logical operator precedence
a, b, c = True, False, True
result = not a or b and c      # (not True) or (False and True) = False or False = False
print(f"not a or b and c = {result}")

# Best practice: use parentheses for clarity
result_clear = (not a) or (b and c)
print(f"With parentheses: {result_clear}")

# Real-world example: Temperature conversion with precedence
celsius = 25
fahrenheit = celsius * 9 / 5 + 32  # Multiplication and division before addition
print(f"{celsius}°C = {fahrenheit}°F")  # 25°C = 77.0°F`} />
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
                        <h4 className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">⚠️ Common Pitfall:</h4>
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                            When in doubt about operator precedence, always use parentheses! It makes your code more readable and prevents unexpected results.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Operators;