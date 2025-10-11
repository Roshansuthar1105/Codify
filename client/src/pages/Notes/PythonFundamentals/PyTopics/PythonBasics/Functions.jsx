import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Functions = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Functions</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Functions group reusable blocks of code. They help organize your program and avoid code repetition. 
                    Master functions to write cleaner, more maintainable Python code.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Defining Functions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Functions are defined using the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">def</code> keyword followed by function name and parentheses.
                    </p>
                    <CodeBlock code={`# Basic function
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")  # Output: Hello, Alice!

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8

# Function with docstring (documentation)
def multiply(x, y):
    """
    Multiplies two numbers and returns the result.
    
    Args:
        x (int/float): First number
        y (int/float): Second number
    
    Returns:
        int/float: Product of x and y
    """
    return x * y

print(multiply(4, 7))  # Output: 28`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Function Parameters</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Python supports various types of parameters: positional, keyword, default, and variable-length arguments.
                    </p>
                    <CodeBlock code={`# Default parameters
def greet(name="World"):
    return f"Hello, {name}!"

print(greet())        # Hello, World!
print(greet("Bob"))   # Hello, Bob!

# Multiple parameters
def calculate_area(length, width):
    return length * width

area = calculate_area(10, 5)
print(f"Area: {area}")  # Area: 50

# Keyword arguments
def introduce(name, age, city="Unknown"):
    return f"My name is {name}, I'm {age} years old, from {city}"

print(introduce(name="Alice", age=25, city="New York"))

# Positional vs Keyword arguments
def person_info(name, age, city, country="USA"):
    return f"{name}, {age} years old, lives in {city}, {country}"

# Positional arguments
print(person_info("John", 30, "Chicago"))

# Mixed positional and keyword
print(person_info("Mary", 28, city="Boston", country="USA"))`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Variable Arguments (*args and **kwargs)</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Handle functions with unknown number of arguments using *args and **kwargs.
                    </p>
                    <CodeBlock code={`# *args - Variable positional arguments
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3))         # Output: 6
print(sum_all(10, 20, 30, 40))  # Output: 100

# **kwargs - Variable keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="New York")
# Output:
# name: Alice
# age: 25
# city: New York

# Combining all parameter types
def flexible_function(required, *args, default="default", **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Default: {default}")
    print(f"Kwargs: {kwargs}")

flexible_function("must_have", 1, 2, 3, default="changed", extra="info")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Return Statements</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Functions can return single values, multiple values, or nothing at all (None).
                    </p>
                    <CodeBlock code={`# Single return value
def square(x):
    return x * x

result = square(5)
print(result)  # Output: 25

# Multiple return values (tuple)
def get_name_age():
    return "Alice", 25

name, age = get_name_age()
print(f"Name: {name}, Age: {age}")

# Conditional returns
def absolute_value(x):
    if x >= 0:
        return x
    else:
        return -x

print(absolute_value(-10))  # Output: 10
print(absolute_value(7))    # Output: 7

# Early return
def check_positive(number):
    if number <= 0:
        return "Number must be positive"
    
    # Process positive number
    return f"Processing positive number: {number}"

print(check_positive(-5))   # Number must be positive
print(check_positive(10))   # Processing positive number: 10

# Function with no explicit return (returns None)
def print_message(msg):
    print(f"Message: {msg}")

result = print_message("Hello")
print(result)  # Output: None`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Local vs Global Scope</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Understanding variable scope is crucial for writing predictable functions.
                    </p>
                    <CodeBlock code={`# Global variable
counter = 0

def increment_global():
    global counter  # Access global variable
    counter += 1
    return counter

print(increment_global())  # Output: 1
print(increment_global())  # Output: 2

# Local variable
def local_example():
    local_var = "I'm local"
    return local_var

print(local_example())     # Output: I'm local
# print(local_var)         # Error: local_var not defined

# Variable shadowing
x = "global"

def shadow_example():
    x = "local"  # This shadows the global x
    return x

print(shadow_example())    # Output: local
print(x)                   # Output: global

# Nonlocal keyword (nested functions)
def outer_function():
    x = "outer"
    
    def inner_function():
        nonlocal x
        x = "inner"
        return x
    
    inner_function()
    return x

print(outer_function())    # Output: inner`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Lambda Functions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Lambda functions are small, anonymous functions perfect for simple operations.
                    </p>
                    <CodeBlock code={`# Basic lambda function
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Lambda with multiple arguments
add = lambda a, b: a + b
print(add(10, 15))  # Output: 25

# Lambda in higher-order functions
numbers = [1, 2, 3, 4, 5]

# Using lambda with map()
squared = list(map(lambda x: x**2, numbers))
print(squared)  # Output: [1, 4, 9, 16, 25]

# Using lambda with filter()
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # Output: [2, 4]

# Using lambda with sort()
students = [("Alice", 85), ("Bob", 90), ("Charlie", 78)]
students.sort(key=lambda student: student[1])  # Sort by grade
print(students)  # [('Charlie', 78), ('Alice', 85), ('Bob', 90)]

# Lambda with conditional expressions
absolute = lambda x: x if x >= 0 else -x
print(absolute(-10))  # Output: 10
print(absolute(7))    # Output: 7`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Function Examples</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Real-world examples showing how functions solve common programming problems.
                    </p>
                    <CodeBlock code={`# Calculator functions
def calculator(operation, a, b):
    """Simple calculator function"""
    operations = {
        'add': lambda x, y: x + y,
        'subtract': lambda x, y: x - y,
        'multiply': lambda x, y: x * y,
        'divide': lambda x, y: x / y if y != 0 else "Cannot divide by zero"
    }
    
    return operations.get(operation, "Invalid operation")(a, b)

print(calculator('add', 10, 5))      # Output: 15
print(calculator('divide', 10, 0))   # Output: Cannot divide by zero

# Temperature converter
def convert_temperature(temp, from_unit, to_unit):
    """Convert between Celsius, Fahrenheit, and Kelvin"""
    # Convert to Celsius first
    if from_unit == 'F':
        celsius = (temp - 32) * 5/9
    elif from_unit == 'K':
        celsius = temp - 273.15
    else:  # Already Celsius
        celsius = temp
    
    # Convert from Celsius to target unit
    if to_unit == 'F':
        return celsius * 9/5 + 32
    elif to_unit == 'K':
        return celsius + 273.15
    else:  # Return Celsius
        return celsius

print(f"100°C = {convert_temperature(100, 'C', 'F')}°F")  # 212.0°F
print(f"32°F = {convert_temperature(32, 'F', 'C')}°C")    # 0.0°C

# Input validation function
def get_valid_number(prompt, min_val=None, max_val=None):
    """Get a valid number from user with optional range validation"""
    while True:
        try:
            value = float(input(prompt))
            
            if min_val is not None and value < min_val:
                print(f"Value must be at least {min_val}")
                continue
            
            if max_val is not None and value > max_val:
                print(f"Value must be at most {max_val}")
                continue
                
            return value
        except ValueError:
            print("Please enter a valid number")

# Example usage (commented out for demonstration)
# age = get_valid_number("Enter your age (0-120): ", 0, 120)

# List processing function
def process_grades(grades):
    """Calculate statistics for a list of grades"""
    if not grades:
        return "No grades provided"
    
    average = sum(grades) / len(grades)
    highest = max(grades)
    lowest = min(grades)
    passing = [grade for grade in grades if grade >= 60]
    pass_rate = len(passing) / len(grades) * 100
    
    return {
        'average': round(average, 2),
        'highest': highest,
        'lowest': lowest,
        'pass_rate': round(pass_rate, 2)
    }

student_grades = [85, 92, 78, 96, 67, 89, 94]
stats = process_grades(student_grades)
print(f"Grade Statistics: {stats}")
# Output: {'average': 85.86, 'highest': 96, 'lowest': 67, 'pass_rate': 100.0}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices & Tips</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Function Best Practices</h3>
                        <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                            <li>• Use descriptive function names that explain what the function does</li>
                            <li>• Keep functions small and focused on a single task</li>
                            <li>• Use docstrings to document your functions</li>
                            <li>• Avoid using global variables inside functions</li>
                            <li>• Return meaningful values rather than printing inside functions</li>
                            <li>• Use type hints for better code documentation</li>
                        </ul>
                    </div>
                    
                    <CodeBlock code={`# Good function example with type hints and docstring
def calculate_bmi(weight: float, height: float) -> dict:
    """
    Calculate Body Mass Index (BMI) and return category.
    
    Args:
        weight (float): Weight in kilograms
        height (float): Height in meters
    
    Returns:
        dict: BMI value and category
    
    Raises:
        ValueError: If weight or height is negative or zero
    """
    if weight <= 0 or height <= 0:
        raise ValueError("Weight and height must be positive numbers")
    
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25:
        category = "Normal weight"
    elif bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"
    
    return {
        'bmi': round(bmi, 2),
        'category': category
    }

# Example usage
try:
    result = calculate_bmi(70, 1.75)
    print(f"BMI: {result['bmi']}, Category: {result['category']}")
except ValueError as e:
    print(f"Error: {e}")

# Function with error handling
def safe_divide(a: float, b: float) -> float:
    """Safely divide two numbers with error handling."""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Both arguments must be numbers")
        return None

print(safe_divide(10, 2))   # Output: 5.0
print(safe_divide(10, 0))   # Error message + None`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Function Patterns</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Learn common patterns used in professional Python development.
                    </p>
                    <CodeBlock code={`# Factory function pattern
def create_person(name, age):
    """Factory function to create person dictionaries"""
    return {
        'name': name,
        'age': age,
        'greet': lambda: f"Hi, I'm {name}",
        'is_adult': lambda: age >= 18
    }

person = create_person("Alice", 25)
print(person['greet']())      # Hi, I'm Alice
print(person['is_adult']())   # True

# Decorator-like function pattern
def validate_input(func):
    """Wrapper function to validate inputs"""
    def wrapper(*args, **kwargs):
        # Validate all arguments are positive numbers
        for arg in args:
            if not isinstance(arg, (int, float)) or arg <= 0:
                return "Error: All arguments must be positive numbers"
        return func(*args, **kwargs)
    return wrapper

# Apply validation
@validate_input
def calculate_area(length, width):
    return length * width

print(calculate_area(5, 10))   # Output: 50
print(calculate_area(-5, 10))  # Error: All arguments must be positive numbers

# Closure pattern
def make_multiplier(n):
    """Create a function that multiplies by n"""
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # Output: 10
print(triple(5))  # Output: 15

# Generator function pattern
def fibonacci_generator(n):
    """Generate first n Fibonacci numbers"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Use the generator
fib_nums = list(fibonacci_generator(10))
print(fib_nums)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`} />
                </section>
            </div>
        </div>
    );
};

export default Functions;