import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const InputOutput = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Input & Output</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Learn how to get input from users and display output in Python programs. Master both basic and advanced I/O operations to create interactive applications.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Getting User Input</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">input()</code> function allows you to get data from users. It always returns a string, so type conversion is often necessary.
                    </p>
                    <CodeBlock code={`# Basic input
name = input("Enter your name: ")
print("Hello,", name)

# Input always returns a string
age_str = input("Enter your age: ")
age = int(age_str)  # Convert to integer
print(f"You are {age} years old")

# Multiple inputs on same line
first_name, last_name = input("Enter first and last name: ").split()
print(f"Welcome, {first_name} {last_name}!")

# Getting numbers with error handling
try:
    number = float(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That's not a valid number!")

# Getting multiple numbers
numbers = input("Enter numbers separated by spaces: ").split()
numbers = [float(x) for x in numbers]
print(f"Sum: {sum(numbers)}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Input Validation & Type Conversion</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Always validate user input to prevent errors and ensure data integrity in your programs.
                    </p>
                    <CodeBlock code={`# Safe integer input
def get_integer(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a valid integer!")

age = get_integer("Enter your age: ")
print(f"You are {age} years old")

# Getting input within a range
def get_number_in_range(prompt, min_val, max_val):
    while True:
        try:
            value = float(input(prompt))
            if min_val <= value <= max_val:
                return value
            else:
                print(f"Please enter a number between {min_val} and {max_val}")
        except ValueError:
            print("Please enter a valid number!")

score = get_number_in_range("Enter test score (0-100): ", 0, 100)
print(f"Your score: {score}")

# Yes/No input validation
def get_yes_no(prompt):
    while True:
        response = input(prompt + " (y/n): ").lower().strip()
        if response in ['y', 'yes']:
            return True
        elif response in ['n', 'no']:
            return False
        else:
            print("Please enter 'y' or 'n'")

continue_program = get_yes_no("Do you want to continue?")
if continue_program:
    print("Continuing...")
else:
    print("Goodbye!")

# Email validation example
import re

def get_valid_email(prompt):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    while True:
        email = input(prompt)
        if re.match(pattern, email):
            return email
        else:
            print("Please enter a valid email address!")

# user_email = get_valid_email("Enter your email: ")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Print Function Advanced Features</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">print()</code> function has many parameters to customize output formatting.
                    </p>
                    <CodeBlock code={`# Basic print
print("Hello, World!")

# Multiple values
print("Name:", "Alice", "Age:", 25)

# Custom separator
print("A", "B", "C", sep="-")  # A-B-C
print("apple", "banana", "cherry", sep=", ")  # apple, banana, cherry

# Custom end character
print("Loading", end="...")
print("Done!")  # Loading...Done!

# Print to different outputs
import sys
print("Normal output")
print("Error message", file=sys.stderr)

# Flush output immediately
import time
for i in range(5):
    print(f"Processing {i+1}/5", end="\r", flush=True)
    time.sleep(1)
print("\\nComplete!")

# Print with no separator
print("Hello", "World", sep="")  # HelloWorld

# Print empty lines
print("First line")
print()  # Empty line
print("Third line")

# Print multiple empty lines
print("\\n" * 3 + "After 3 empty lines")

# Print variables with labels
name = "Alice"
age = 30
city = "New York"
print(f"Name: {name}")
print(f"Age: {age}")
print(f"City: {city}")

# Print formatted table
print(f"{'Name':<10} {'Age':<5} {'City':<15}")
print("-" * 30)
print(f"{'Alice':<10} {25:<5} {'New York':<15}")
print(f"{'Bob':<10} {30:<5} {'Chicago':<15}")
print(f"{'Charlie':<10} {28:<5} {'Los Angeles':<15}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">String Formatting for Output</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Python offers multiple ways to format strings for better output presentation.
                    </p>
                    <CodeBlock code={`# f-strings (Python 3.6+) - Recommended
name = "Alice"
age = 25
salary = 50000.75

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Salary: \${salary:,.2f}")  # $50,000.75

# Format method
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, Age: {1}".format(name, age))
print("Name: {name}, Age: {age}".format(name=name, age=age))

# % formatting (older method)
print("Name: %s, Age: %d" % (name, age))

# Number formatting with f-strings
pi = 3.14159265359
print(f"Pi rounded to 2 places: {pi:.2f}")     # 3.14
print(f"Pi rounded to 4 places: {pi:.4f}")     # 3.1416

# Percentage formatting
percentage = 0.85
print(f"Success rate: {percentage:.1%}")       # 85.0%

# Scientific notation
big_number = 1234567890
print(f"Big number: {big_number:.2e}")         # 1.23e+09

# Padding and alignment
print(f"{'Left':<10} {'Center':^10} {'Right':>10}")
print(f"{'---':<10} {'---':^10} {'---':>10}")
print(f"{'Item1':<10} {'Data':^10} {'100':>10}")

# Zero padding for numbers
number = 42
print(f"Zero padded: {number:05d}")            # 00042

# Binary, octal, hex formatting
num = 255
print(f"Binary: {num:b}")                      # 11111111
print(f"Octal: {num:o}")                       # 377
print(f"Hex: {num:x}")                         # ff
print(f"Hex (upper): {num:X}")                 # FF`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Interactive Programs</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Create engaging interactive programs that respond to user input dynamically.
                    </p>
                    <CodeBlock code={`# Simple calculator
def simple_calculator():
    print("=== Simple Calculator ===")
    while True:
        try:
            num1 = float(input("Enter first number: "))
            operator = input("Enter operator (+, -, *, /) or 'q' to quit: ")
            
            if operator == 'q':
                break
                
            num2 = float(input("Enter second number: "))
            
            if operator == '+':
                result = num1 + num2
            elif operator == '-':
                result = num1 - num2
            elif operator == '*':
                result = num1 * num2
            elif operator == '/':
                if num2 != 0:
                    result = num1 / num2
                else:
                    print("Error: Cannot divide by zero!")
                    continue
            else:
                print("Invalid operator!")
                continue
                
            print(f"Result: {num1} {operator} {num2} = {result}")
            print("-" * 30)
            
        except ValueError:
            print("Please enter valid numbers!")
        except KeyboardInterrupt:
            print("\\nGoodbye!")
            break

# Quiz program
def quiz_program():
    questions = [
        {"question": "What is 5 + 3?", "answer": 8},
        {"question": "What is 10 - 4?", "answer": 6},
        {"question": "What is 7 * 2?", "answer": 14},
        {"question": "What is 15 / 3?", "answer": 5}
    ]
    
    score = 0
    print("=== Math Quiz ===")
    
    for i, q in enumerate(questions, 1):
        print(f"Question {i}: {q['question']}")
        try:
            user_answer = float(input("Your answer: "))
            if user_answer == q['answer']:
                print("Correct! ✓")
                score += 1
            else:
                print(f"Wrong! The correct answer is {q['answer']} ✗")
        except ValueError:
            print("Please enter a valid number!")
        print("-" * 20)
    
    print(f"Final Score: {score}/{len(questions)}")
    percentage = (score / len(questions)) * 100
    print(f"Percentage: {percentage:.1f}%")

# Menu-driven program
def menu_program():
    while True:
        print("\\n=== Main Menu ===")
        print("1. Calculator")
        print("2. Quiz")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == '1':
            simple_calculator()
        elif choice == '2':
            quiz_program()
        elif choice == '3':
            print("Thank you for using the program!")
            break
        else:
            print("Invalid choice! Please try again.")

# Uncomment to run
# menu_program()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">File Input/Output Basics</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Learn to read from and write to files for persistent data storage.
                    </p>
                    <CodeBlock code={`# Writing to a file
def write_to_file():
    with open("output.txt", "w") as file:
        file.write("Hello, World!\\n")
        file.write("This is line 2\\n")
        
        # Writing multiple lines
        lines = ["Line 3\\n", "Line 4\\n", "Line 5\\n"]
        file.writelines(lines)
        
        # Writing formatted data
        name = "Alice"
        age = 25
        file.write(f"Name: {name}, Age: {age}\\n")

# Reading from a file
def read_from_file():
    try:
        with open("output.txt", "r") as file:
            # Read entire file
            content = file.read()
            print("File content:")
            print(content)
            
        # Read line by line
        with open("output.txt", "r") as file:
            print("\\nReading line by line:")
            for line_num, line in enumerate(file, 1):
                print(f"Line {line_num}: {line.strip()}")
                
        # Read all lines into a list
        with open("output.txt", "r") as file:
            lines = file.readlines()
            print(f"\\nTotal lines: {len(lines)}")
            
    except FileNotFoundError:
        print("File not found! Please create the file first.")

# Appending to a file
def append_to_file():
    with open("output.txt", "a") as file:
        file.write("This line is appended\\n")
        file.write(f"Current time: {time.ctime()}\\n")

# CSV-like data handling
def save_student_data():
    students = [
        ("Alice", 85, "Math"),
        ("Bob", 92, "Science"),
        ("Charlie", 78, "English")
    ]
    
    with open("students.txt", "w") as file:
        file.write("Name,Grade,Subject\\n")  # Header
        for name, grade, subject in students:
            file.write(f"{name},{grade},{subject}\\n")

def load_student_data():
    try:
        with open("students.txt", "r") as file:
            lines = file.readlines()
            print("Student Data:")
            for line in lines:
                print(line.strip())
    except FileNotFoundError:
        print("Student data file not found!")

# Example usage (commented out)
# write_to_file()
# read_from_file()
# save_student_data()
# load_student_data()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Command Line Arguments</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Learn to handle command line arguments for more flexible programs.
                    </p>
                    <CodeBlock code={`import sys
import argparse

# Basic command line arguments using sys.argv
def basic_args():
    print(f"Script name: {sys.argv[0]}")
    print(f"Number of arguments: {len(sys.argv) - 1}")
    
    if len(sys.argv) > 1:
        print("Arguments:")
        for i, arg in enumerate(sys.argv[1:], 1):
            print(f"  Arg {i}: {arg}")
    else:
        print("No arguments provided")

# Using argparse for better argument handling
def advanced_args():
    parser = argparse.ArgumentParser(description='Process some data')
    parser.add_argument('name', help='Your name')
    parser.add_argument('--age', type=int, default=18, help='Your age')
    parser.add_argument('--city', default='Unknown', help='Your city')
    parser.add_argument('--verbose', '-v', action='store_true', 
                       help='Enable verbose output')
    
    args = parser.parse_args()
    
    if args.verbose:
        print("=== Verbose Mode Enabled ===")
    
    print(f"Hello, {args.name}!")
    print(f"Age: {args.age}")
    print(f"City: {args.city}")

# File processing with command line args
def process_file_args():
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_file> <output_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    try:
        with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
            for line_num, line in enumerate(infile, 1):
                outfile.write(f"{line_num}: {line}")
        print(f"Processed {input_file} -> {output_file}")
    except FileNotFoundError:
        print(f"Error: {input_file} not found!")
    except Exception as e:
        print(f"Error: {e}")

# Example usage:
# python script.py John --age 25 --city "New York" --verbose
# python script.py input.txt output.txt`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices & Tips</h2>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">✅ Input/Output Best Practices</h3>
                        <ul className="text-green-700 dark:text-green-300 space-y-2">
                            <li>• Always validate user input to prevent errors and security issues</li>
                            <li>• Use try-except blocks when converting input types</li>
                            <li>• Provide clear, descriptive prompts for user input</li>
                            <li>• Use f-strings for modern string formatting</li>
                            <li>• Close files properly using &apos;with&apos; statements</li>
                            <li>• Handle FileNotFoundError when working with files</li>
                            <li>• Use meaningful variable names for input data</li>
                        </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">⚠️ Common Pitfalls</h3>
                        <ul className="text-red-700 dark:text-red-300 space-y-2">
                            <li>• Not validating input() - always returns a string</li>
                            <li>• Forgetting to handle ValueError when converting types</li>
                            <li>• Not closing files (use &apos;with&apos; statements)</li>
                            <li>• Assuming input will always be in the expected format</li>
                            <li>• Not providing user-friendly error messages</li>
                            <li>• Using eval() on user input (security risk)</li>
                        </ul>
                    </div>

                    <CodeBlock code={`# Example: Robust input function
def get_user_info():
    """Example of robust input handling"""
    
    # Get name with validation
    while True:
        name = input("Enter your name: ").strip()
        if name:
            break
        print("Name cannot be empty!")
    
    # Get age with validation
    while True:
        try:
            age = int(input("Enter your age (1-120): "))
            if 1 <= age <= 120:
                break
            print("Age must be between 1 and 120!")
        except ValueError:
            print("Please enter a valid number!")
    
    # Get email with basic validation
    while True:
        email = input("Enter email: ").strip().lower()
        if "@" in email and "." in email:
            break
        print("Please enter a valid email address!")
    
    # Display formatted output
    print("\\n" + "="*40)
    print(f"{'User Information':^40}")
    print("="*40)
    print(f"Name: {name.title()}")
    print(f"Age: {age}")
    print(f"Email: {email}")
    print("="*40)
    
    return {"name": name, "age": age, "email": email}

# Safe file operations
def safe_file_operation(filename, data):
    """Example of safe file handling"""
    try:
        with open(filename, 'w') as file:
            file.write(data)
        print(f"Data successfully written to {filename}")
        return True
    except PermissionError:
        print(f"Error: No permission to write to {filename}")
    except IOError as e:
        print(f"Error writing to file: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    return False

# Example usage:
# user_data = get_user_info()
# safe_file_operation("user_data.txt", str(user_data))`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🎯 Try These Challenges</h3>
                        <div className="text-purple-700 dark:text-purple-300 space-y-3">
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 1: Personal Information System</p>
                                <p className="text-sm">Create a program that collects user&apos;s name, age, and favorite color, then displays a personalized message with proper formatting.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 2: Grade Calculator</p>
                                <p className="text-sm">Build a program that takes multiple test scores, calculates average, and displays letter grade with formatted output.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 3: Shopping List Manager</p>
                                <p className="text-sm">Create a program that lets users add items to a shopping list and save/load the list from a file.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 4: Number Guessing Game</p>
                                <p className="text-sm">Implement a game where the computer picks a random number and the user has to guess it with hints and input validation.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InputOutput;