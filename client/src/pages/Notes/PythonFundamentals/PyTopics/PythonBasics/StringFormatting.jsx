import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const StringFormatting = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>String Formatting</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    String formatting allows you to create dynamic strings by inserting variables and expressions into text. 
                    Python offers several methods, with f-strings being the modern, preferred approach for clean and readable code.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic String Concatenation</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The simplest way to combine strings, but not the most efficient for complex formatting.
                    </p>
                    <CodeBlock code={`# Basic concatenation with + operator
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)  # Output: John Doe

# Concatenation with variables and literals
age = 25
message = "Hello, I'm " + first_name + " and I'm " + str(age) + " years old."
print(message)

# Multiple line concatenation
address = "123 Main Street, " + \
          "Anytown, " + \
          "USA"
print(address)

# Concatenation in loops
fruits = ["apple", "banana", "cherry"]
fruit_list = ""
for fruit in fruits:
    fruit_list = fruit_list + fruit + ", "
print("Fruits: " + fruit_list[:-2])  # Remove last comma and space

# Concatenation with numbers (requires conversion)
score = 95
percentage = 87.5
result = "Score: " + str(score) + ", Percentage: " + str(percentage) + "%"
print(result)

# Common pitfall - concatenating different types
# This would cause an error: "Score: " + 95
# Always convert numbers to strings first`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">F-Strings (Formatted String Literals) - Recommended</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        F-strings (Python 3.6+) are the modern, fastest, and most readable way to format strings. 
                        Simply prefix your string with &apos;f&apos; and use curly braces &#123;&#125; to embed expressions.
                    </p>
                    <CodeBlock code={`# Basic f-string usage
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
# Output: My name is Alice and I am 25 years old.

# F-strings with expressions
price = 19.99
tax_rate = 0.1
total = price * (1 + tax_rate)
print(f"Price: \${price}, Total with tax: \${total:.2f}")
# Output: Price: $19.99, Total with tax: $21.99

# Mathematical expressions inside f-strings
length = 10
width = 5
print(f"Rectangle area: {length * width} square units")
print(f"Rectangle perimeter: {2 * (length + width)} units")

# String methods in f-strings
text = "hello world"
print(f"Original: {text}")
print(f"Title case: {text.title()}")
print(f"Uppercase: {text.upper()}")
print(f"Length: {len(text)} characters")

# Conditional expressions in f-strings
score = 85
print(f"Result: {'Pass' if score >= 60 else 'Fail'}")
print(f"Grade: {'A' if score >= 90 else 'B' if score >= 80 else 'C'}")

# Function calls in f-strings
import math
radius = 5
print(f"Circle area: {math.pi * radius**2:.2f}")
print(f"Square root of 16: {math.sqrt(16)}")

# List and dictionary access in f-strings
student = {"name": "Bob", "grade": 92}
scores = [88, 94, 76, 89]
print(f"Student: {student['name']}, Grade: {student['grade']}")
print(f"Highest score: {max(scores)}, Average: {sum(scores)/len(scores):.1f}")

# Date formatting with f-strings
from datetime import datetime
now = datetime.now()
print(f"Current date: {now.strftime('%Y-%m-%d')}")
print(f"Current time: {now.strftime('%H:%M:%S')}")
print(f"Full datetime: {now:%Y-%m-%d %H:%M:%S}")

# Multi-line f-strings
name = "Charlie"
age = 30
city = "New York"
info = f"""
Personal Information:
Name: {name}
Age: {age}
City: {city}
Status: {'Adult' if age >= 18 else 'Minor'}
"""
print(info)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">F-String Number Formatting</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        F-strings provide powerful number formatting options for decimals, percentages, padding, and alignment.
                    </p>
                    <CodeBlock code={`# Decimal places
pi = 3.14159265359
print(f"Pi to 2 decimal places: {pi:.2f}")      # 3.14
print(f"Pi to 4 decimal places: {pi:.4f}")      # 3.1416
print(f"Pi to 0 decimal places: {pi:.0f}")      # 3

# Percentage formatting
success_rate = 0.856
print(f"Success rate: {success_rate:.1%}")      # 85.6%
print(f"Success rate: {success_rate:.2%}")      # 85.60%

# Scientific notation
big_number = 1234567890
small_number = 0.00001234
print(f"Big number: {big_number:.2e}")          # 1.23e+09
print(f"Small number: {small_number:.2e}")      # 1.23e-05

# Number padding and alignment
numbers = [1, 23, 456, 7890]
for num in numbers:
    print(f"Number: {num:5d}")    # Right-aligned, 5 characters wide

# Zero padding
for i in range(1, 11):
    print(f"Item {i:03d}")       # 001, 002, 003, etc.

# Thousands separator
population = 1234567
salary = 75000.50
print(f"Population: {population:,}")            # 1,234,567
print(f"Salary: \${salary:,.2f}")               # $75,000.50

# Binary, octal, and hexadecimal
number = 255
print(f"Decimal: {number}")                     # 255
print(f"Binary: {number:b}")                    # 11111111
print(f"Octal: {number:o}")                     # 377
print(f"Hexadecimal: {number:x}")               # ff
print(f"Hexadecimal (upper): {number:X}")       # FF

# Sign formatting
positive = 42
negative = -42
print(f"Always show sign: {positive:+d}")       # +42
print(f"Always show sign: {negative:+d}")       # -42
print(f"Space for positive: {positive: d}")     #  42
print(f"Space for positive: {negative: d}")     # -42

# Combining formatting options
value = 1234.5678
print(f"Formatted: {value:+10.2f}")            # +   1234.57
print(f"With separator: {value:+10,.2f}")      # + 1,234.57`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">F-String Text Alignment</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Control text alignment and padding within f-strings for creating formatted tables and aligned output.
                    </p>
                    <CodeBlock code={`# Text alignment
name = "Alice"
print(f"Left aligned:    |{name:<10}|")        # |Alice     |
print(f"Right aligned:   |{name:>10}|")        # |     Alice|
print(f"Center aligned:  |{name:^10}|")        # |  Alice   |

# Alignment with different fill characters
print(f"Left with dots:  |{name:.<10}|")       # |Alice.....|
print(f"Right with dots: |{name:.>10}|")       # |.....Alice|
print(f"Center with stars:|{name:*^10}|")      # |**Alice***|

# Creating formatted tables
products = [
    {"name": "Laptop", "price": 999.99, "quantity": 5},
    {"name": "Mouse", "price": 25.50, "quantity": 20},
    {"name": "Keyboard", "price": 75.00, "quantity": 15}
]

# Table header
print(f"{'Product':<15} {'Price':>10} {'Qty':>5} {'Total':>10}")
print("-" * 45)

# Table rows
for product in products:
    name = product['name']
    price = product['price']
    qty = product['quantity']
    total = price * qty
    print(f"{name:<15} \${price:>8.2f} {qty:>5d} \${total:>8.2f}")

# Progress bar using alignment
def show_progress(percentage):
    bar_length = 20
    filled_length = int(bar_length * percentage / 100)
    bar = '█' * filled_length + '-' * (bar_length - filled_length)
    return f"Progress: |{bar}| {percentage:3.0f}%"

print(show_progress(0))      # Empty bar
print(show_progress(25))     # Quarter filled
print(show_progress(50))     # Half filled
print(show_progress(75))     # Three quarters
print(show_progress(100))    # Full bar

# Menu formatting
menu_items = [
    ("Burger", 8.99),
    ("Pizza", 12.50),
    ("Salad", 6.75),
    ("Drink", 2.25)
]

print("MENU")
print("=" * 25)
for item, price in menu_items:
    print(f"{item:<15} \${price:>6.2f}")

# Creating boxes around text
def create_box(text):
    width = len(text) + 4
    print("+" + "-" * (width - 2) + "+")
    print(f"| {text:^{width-4}} |")
    print("+" + "-" * (width - 2) + "+")

create_box("Welcome!")
create_box("Python String Formatting")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The .format() Method</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.format()</code> method was the preferred approach before f-strings. Still useful for templates and dynamic formatting.
                    </p>
                    <CodeBlock code={`# Basic format method
name = "Bob"
age = 28
print("My name is {} and I am {} years old.".format(name, age))

# Positional arguments
print("Hello {0}, you are {1} years old. Nice to meet you, {0}!".format(name, age))

# Keyword arguments
print("Hello {name}, you are {age} years old.".format(name="Charlie", age=35))

# Mixed positional and keyword
print("{0} is {age} years old and lives in {1}".format("David", "Boston", age=40))

# Number formatting with .format()
price = 123.456
print("Price: \${:.2f}".format(price))           # $123.46
print("Price: \${:10.2f}".format(price))         # $    123.46
print("Price: \${:<10.2f}".format(price))        # $123.46   

# Accessing object attributes
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Eve", 22)
print("Name: {p.name}, Age: {p.age}".format(p=person))

# Accessing list/dict elements
data = {"name": "Frank", "scores": [85, 90, 88]}
print("Student: {d[name]}".format(d=data))
print("First score: {d[scores][0]}".format(d=data))

# Dynamic formatting
def format_currency(amount, currency="USD"):
    if currency == "USD":
        return "\${:.2f}".format(amount)
    elif currency == "EUR":
        return "€{:.2f}".format(amount)
    else:
        return "{:.2f} {}".format(amount, currency)

print(format_currency(123.45))           # $123.45
print(format_currency(123.45, "EUR"))    # €123.45
print(format_currency(123.45, "GBP"))    # 123.45 GBP

# Format with templates
template = "Hello {name}, your balance is \${balance:.2f}"
users = [
    {'name': "Alice", 'balance': 1250.75},
    {'name': "Bob", 'balance': 890.25},
    {'name': "Charlie", 'balance': 2100.00}
]

for user in users:
    print(template.format(**user))

# Advanced formatting with format()
print("{:*^50}".format(" WELCOME "))     # Stars around "WELCOME"
print("{:<20} {:>10}".format("Item", "Value"))

# Date formatting with format()
from datetime import datetime
now = datetime.now()
print("Date: {{':%Y-%m-%d'}}".format(now))
print("Time: {{':%H:%M:%S'}}".format(now))`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">% String Formatting (Legacy)</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The oldest formatting method in Python, similar to C&apos;s printf. Still found in older codebases.
                    </p>
                    <CodeBlock code={`# Basic % formatting
name = "Grace"
age = 30
print("My name is %s and I am %d years old." % (name, age))

# Format specifiers
price = 19.99
quantity = 3
print("Item: $%.2f, Quantity: %d, Total: $%.2f" % (price, quantity, price * quantity))

# Different format types
integer = 42
float_num = 3.14159
string = "Hello"
print("Integer: %d" % integer)           # %d for integers
print("Float: %.2f" % float_num)         # %.2f for floats with 2 decimals
print("String: %s" % string)             # %s for strings
print("Character: %c" % 65)              # %c for character (ASCII)

# Padding and alignment with %
print("Right aligned: %10s|" % "text")   # |      text|
print("Left aligned: %-10s|" % "text")   # |text      |
print("Zero padded: %05d" % 42)          # 00042

# Scientific notation
big_number = 1234567.89
print("Scientific: %.2e" % big_number)   # 1.23e+06

# Percentage
ratio = 0.875
print("Percentage: %.1f%%" % (ratio * 100))  # 87.5% (note the %% for literal %)

# Using dictionary with % formatting
data = {"name": "Henry", "age": 45, "city": "Seattle"}
print("%(name)s is %(age)d years old and lives in %(city)s." % data)

# Hexadecimal and octal
number = 255
print("Decimal: %d, Hex: %x, Octal: %o" % (number, number, number))
# Output: Decimal: 255, Hex: ff, Octal: 377

# Why % formatting is less preferred
# - Less readable than f-strings
# - More error-prone
# - Limited functionality compared to modern methods
# Example of problems:
try:
    print("Value: %d" % "not a number")  # This would cause TypeError
except TypeError as e:
    print(f"Error with % formatting: {e}")

# Comparison of all three methods
name = "Isabel"
score = 87.5

# % formatting
percent_way = "Student %s scored %.1f%%" % (name, score)

# .format() method
format_way = "Student {} scored {:.1f}%".format(name, score)

# f-string (recommended)
f_string_way = f"Student {name} scored {score:.1f}%"

print("% formatting:", percent_way)
print(".format() method:", format_way)
print("f-string:", f_string_way)
print("All produce the same result!")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Applications</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Real-world examples showing how string formatting solves common programming problems.
                    </p>
                    <CodeBlock code={`# Report generation
def generate_sales_report(data):
    """Generate a formatted sales report"""
    print("=" * 60)
    print(f"{'SALES REPORT':^60}")
    print("=" * 60)
    
    total_sales = 0
    print(f"{'Product':<20} {'Units':<8} {'Price':<10} {'Revenue':<12}")
    print("-" * 60)
    
    for item in data:
        revenue = item['units'] * item['price']
        total_sales += revenue
        
        print(f"{item['product']:<20} "
              f"{item['units']:<8} "
              f"\${item['price']:<9.2f} "
              f"\${revenue:<11.2f}")
    
    print("-" * 60)
    print(f"{'TOTAL REVENUE:':<40} \${total_sales:>17.2f}")
    print("=" * 60)

# Sample data
sales_data = [
    {"product": "Laptop", "units": 10, "price": 999.99},
    {"product": "Mouse", "units": 25, "price": 29.99},
    {"product": "Keyboard", "units": 15, "price": 79.99},
    {"product": "Monitor", "units": 8, "price": 299.99}
]

generate_sales_report(sales_data)

# Log message formatting
import datetime

def log_message(level, message, module="main"):
    """Create formatted log messages"""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"[{timestamp}] {level:>5} | {module:<10} | {message}"

# Usage examples
print(log_message("INFO", "Application started"))
print(log_message("WARN", "Low memory detected", "memory"))
print(log_message("ERROR", "Database connection failed", "database"))
print(log_message("DEBUG", "Processing user input", "input"))

# Email template system
def create_email_template(template_name, **kwargs):
    """Create emails from templates"""
    templates = {
        "welcome": """
Dear {name},

Welcome to our service! Your account has been created successfully.

Account Details:
- Username: {username}
- Email: {email}
- Plan: {plan}
- Start Date: {start_date}

Best regards,
The Team
        """,
        
        "invoice": """
INVOICE #{invoice_number}

Bill To: {customer_name}
Date: {date}
Due Date: {due_date}

{'Description':<30} {'Amount':>10}
{'-'*42}
{description:<30} \${amount:>9.2f}

{'Total:':<30} \${amount:>9.2f}

Thank you for your business!
        """,
        
        "reminder": """
Hi {name},

This is a friendly reminder about {subject}.

Details:
- Date: {date}
- Time: {time}
- Location: {location}

Please let us know if you need to reschedule.

Regards,
{sender}
        """
    }
    
    if template_name in templates:
        return templates[template_name].format(**kwargs)
    else:
        return f"Template '{template_name}' not found"

# Email examples
welcome_email = create_email_template(
    "welcome",
    name="John Doe",
    username="johndoe123",
    email="john@example.com",
    plan="Premium",
    start_date="2024-01-01"
)
print(welcome_email)

# Configuration file generator
def generate_config_file(settings):
    """Generate a configuration file with proper formatting"""
    config_lines = ["# Configuration File", "# Generated automatically", ""]
    
    for section, values in settings.items():
        config_lines.append(f"[{section.upper()}]")
        
        for key, value in values.items():
            if isinstance(value, str):
                config_lines.append(f'{key} = "{value}"')
            elif isinstance(value, bool):
                config_lines.append(f"{key} = {str(value).lower()}")
            else:
                config_lines.append(f"{key} = {value}")
        
        config_lines.append("")  # Empty line between sections
    
    return "\\n".join(config_lines)

# Configuration example
app_settings = {
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "myapp",
        "timeout": 30,
        "ssl": True
    },
    "logging": {
        "level": "INFO",
        "file": "/var/log/app.log",
        "max_size": "10MB",
        "backup_count": 5
    }
}

config_content = generate_config_file(app_settings)
print(config_content)

# Progress tracking with formatting
def track_progress(tasks):
    """Display progress for multiple tasks"""
    print(f"{'Task':<25} {'Status':<10} {'Progress':<20} {'ETA':<10}")
    print("-" * 70)
    
    for task in tasks:
        # Create progress bar
        progress = task['completed'] / task['total']
        bar_length = 15
        filled = int(bar_length * progress)
        bar = "█" * filled + "░" * (bar_length - filled)
        
        # Format status
        status = "Done" if progress >= 1.0 else "Working"
        percentage = progress * 100
        
        print(f"{task['name']:<25} "
              f"{status:<10} "
              f"|{bar}| {percentage:5.1f}% "
              f"{task['eta']:<10}")

# Progress example
project_tasks = [
    {"name": "Design", "completed": 8, "total": 8, "eta": "Done"},
    {"name": "Frontend Development", "completed": 15, "total": 20, "eta": "2 days"},
    {"name": "Backend API", "completed": 12, "total": 18, "eta": "4 days"},
    {"name": "Testing", "completed": 3, "total": 10, "eta": "1 week"},
    {"name": "Documentation", "completed": 0, "total": 5, "eta": "3 days"}
]

track_progress(project_tasks)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices & Performance</h2>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">✅ Best Practices</h3>
                        <ul className="text-green-700 dark:text-green-300 space-y-2">
                            <li>• Use f-strings for most string formatting (Python 3.6+)</li>
                            <li>• Use .format() when you need templates or dynamic formatting</li>
                            <li>• Avoid % formatting in new code (legacy method)</li>
                            <li>• Keep format specifiers simple and readable</li>
                            <li>• Use meaningful variable names in f-strings</li>
                            <li>• Consider performance for high-frequency formatting operations</li>
                            <li>• Use raw strings (r&quot;&quot;) when dealing with special characters</li>
                        </ul>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">⚡ Performance Comparison</h3>
                        <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                            <li>• f-strings: Fastest and most efficient</li>
                            <li>• .format(): Slower than f-strings but flexible</li>
                            <li>• % formatting: Slowest, avoid in new code</li>
                            <li>• String concatenation: Inefficient for multiple operations</li>
                        </ul>
                    </div>

                    <CodeBlock code={`# Performance demonstration (conceptual)
import time

# Example showing why f-strings are preferred
name = "Alice"
age = 25
location = "New York"

# ✅ F-string (fastest, most readable)
result1 = f"Hello {name}, you are {age} years old and live in {location}."

# ✅ .format() method (good for templates)
template = "Hello {}, you are {} years old and live in {}."
result2 = template.format(name, age, location)

# ❌ String concatenation (inefficient)
result3 = "Hello " + name + ", you are " + str(age) + " years old and live in " + location + "."

# ❌ % formatting (legacy, slower)
result4 = "Hello %s, you are %d years old and live in %s." % (name, age, location)

# All produce the same result, but performance differs
print("All methods produce same result:")
print("F-string:", result1)
print(".format():", result2)
print("Concatenation:", result3)
print("% formatting:", result4)

# Best practices for different scenarios
def demonstrate_best_practices():
    """Show when to use each formatting method"""
    
    # ✅ Use f-strings for simple, direct formatting
    user = "Bob"
    score = 87.5
    message = f"User {user} scored {score:.1f}%"
    print("Simple formatting:", message)
    
    # ✅ Use .format() for templates and dynamic content
    email_template = "Dear {name}, your order #{order_id} is {status}."
    orders = [
        {"name": "Alice", "order_id": "12345", "status": "shipped"},
        {"name": "Bob", "order_id": "12346", "status": "processing"}
    ]
    
    for order in orders:
        print("Template:", email_template.format(**order))
    
    # ✅ Use f-strings for debugging
    def debug_function(x, y):
        result = x * y
        print(f"Debug: {x=}, {y=}, {result=}")  # Python 3.8+ feature
        return result
    
    debug_function(5, 7)
    
    # ✅ Proper handling of None values
    value = None
    safe_output = f"Value: {value or 'Not set'}"
    print("Safe formatting:", safe_output)
    
    # ✅ Formatting large numbers
    population = 1234567890
    gdp = 21.43e12
    print(f"Population: {population:,}")
    print(f"GDP: \${gdp:,.2e}")
    
    # ✅ Multi-line f-strings for readability
    product = {"name": "Laptop", "price": 999.99, "stock": 5}
    description = f"""
    Product Information:
    - Name: {product['name']}
    - Price: \${product['price']:,.2f}
    - In Stock: {product['stock']} units
    - Status: {'Available' if product['stock'] > 0 else 'Out of Stock'}
    """
    print("Multi-line formatting:", description)

demonstrate_best_practices()

# Common formatting mistakes to avoid
def common_mistakes():
    """Show common formatting mistakes and how to fix them"""
    
    # ❌ Don't do this - concatenation in loops
    items = ["apple", "banana", "cherry", "date"]
    # Bad way:
    # result = ""
    # for item in items:
    #     result += item + ", "
    
    # ✅ Better way - use join()
    result = ", ".join(items)
    print("Joined items:", result)
    
    # ❌ Don't format the same string repeatedly
    # for i in range(1000):
    #     message = "Processing item {}".format(i)  # Creates template each time
    
    # ✅ Better - prepare template once
    template = "Processing item {}"
    for i in range(3):  # Just showing concept
        message = template.format(i)
        print("Template reuse:", message)
    
    # ❌ Don't ignore None values
    name = None
    try:
        # This could cause issues
        message = f"Hello {name.upper()}"  # Would raise AttributeError
    except AttributeError:
        # ✅ Handle None properly
        message = f"Hello {name.upper() if name else 'Guest'}"
        print("Safe None handling:", message)

common_mistakes()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🎯 Try These Challenges</h3>
                        <div className="text-purple-700 dark:text-purple-300 space-y-3">
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 1: Personal Business Card</p>
                                <p className="text-sm">Create a formatted business card display using f-strings with proper alignment and borders.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 2: Receipt Generator</p>
                                <p className="text-sm">Build a program that generates formatted receipts with item names, prices, quantities, and totals.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 3: Grade Report Card</p>
                                <p className="text-sm">Create a formatted grade report showing subjects, scores, letter grades, and GPA calculation.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 4: File Size Formatter</p>
                                <p className="text-sm">Write a function that formats file sizes (bytes to KB, MB, GB) with appropriate decimal places.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 5: Log Message Parser</p>
                                <p className="text-sm">Create a system that formats log messages with timestamps, levels, and module information.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StringFormatting;