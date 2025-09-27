import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TypeCasting = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Type Casting</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Type casting (or type conversion) is the process of converting data from one type to another. 
                    Python provides built-in functions like int(), float(), str(), and bool() to convert between data types safely and efficiently.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Understanding Python Data Types</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Before learning type casting, it&apos;s important to understand Python&apos;s basic data types and how to check them.
                    </p>
                    <CodeBlock code={`# Checking data types
number = 42
decimal = 3.14
text = "Hello"
flag = True
nothing = None

print(f"Type of {number}: {type(number)}")        # <class 'int'>
print(f"Type of {decimal}: {type(decimal)}")      # <class 'float'>
print(f"Type of {text}: {type(text)}")            # <class 'str'>
print(f"Type of {flag}: {type(flag)}")            # <class 'bool'>
print(f"Type of {nothing}: {type(nothing)}")      # <class 'NoneType'>

# Using isinstance() to check types
print(isinstance(42, int))          # True
print(isinstance(3.14, float))      # True
print(isinstance("Hello", str))     # True
print(isinstance(True, bool))       # True

# Complex data types
my_list = [1, 2, 3]
my_dict = {"name": "Alice", "age": 25}
my_tuple = (1, 2, 3)

print(f"Type of list: {type(my_list)}")         # <class 'list'>
print(f"Type of dictionary: {type(my_dict)}")   # <class 'dict'>
print(f"Type of tuple: {type(my_tuple)}")       # <class 'tuple'>

# Why type casting is important
user_input = input("Enter a number: ")  # Always returns string
print(f"Input type: {type(user_input)}")        # <class 'str'>
# user_input + 10  # This would cause TypeError!

# Solution: Convert string to number
number = int(user_input)
print(f"Converted type: {type(number)}")        # <class 'int'>
print(f"Result: {number + 10}")                 # Now this works!`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">String to Number Conversions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Converting strings to numbers is one of the most common type casting operations, especially when working with user input.
                    </p>
                    <CodeBlock code={`# String to integer conversion
age_str = "25"
age_int = int(age_str)
print(f"String: '{age_str}' -> Integer: {age_int}")
print(f"Can do math: {age_int + 5}")  # 30

# String to float conversion
price_str = "19.99"
price_float = float(price_str)
print(f"String: '{price_str}' -> Float: {price_float}")
print(f"With tax: {price_float * 1.1:.2f}")  # 21.99

# Converting strings with different formats
# Integers in string form
numbers = ["42", "100", "-15", "0"]
converted = [int(num) for num in numbers]
print(f"Original: {numbers}")
print(f"Converted: {converted}")

# Floats in string form
decimals = ["3.14", "-2.5", "0.0", "123.456"]
converted_floats = [float(num) for num in decimals]
print(f"Original: {decimals}")
print(f"Converted: {converted_floats}")

# Practical example: Calculate average from user input
def calculate_average():
    numbers_input = input("Enter numbers separated by spaces: ")
    # Split string and convert each to float
    numbers = [float(x) for x in numbers_input.split()]
    average = sum(numbers) / len(numbers)
    print(f"Numbers: {numbers}")
    print(f"Average: {average:.2f}")

# Example usage (commented out for demonstration)
# calculate_average()  # Try: "10 20 30 40 50"

# Converting with different number bases
binary_str = "1010"  # Binary representation of 10
octal_str = "12"     # Octal representation of 10
hex_str = "A"        # Hexadecimal representation of 10

print(f"Binary '{binary_str}' to decimal: {int(binary_str, 2)}")   # 10
print(f"Octal '{octal_str}' to decimal: {int(octal_str, 8)}")      # 10
print(f"Hex '{hex_str}' to decimal: {int(hex_str, 16)}")           # 10

# Real-world example: Processing CSV data
csv_row = "John,25,75000.50,True"
name, age_str, salary_str, is_active_str = csv_row.split(',')

# Convert to appropriate types
age = int(age_str)
salary = float(salary_str)
is_active = is_active_str == "True"  # String to boolean

print(f"Name: {name} (type: {type(name)})")
print(f"Age: {age} (type: {type(age)})")
print(f"Salary: \${salary:,.2f} (type: {type(salary)})")
print(f"Active: {is_active} (type: {type(is_active)})")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Number to String Conversions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Converting numbers to strings is essential for display, concatenation, and formatting operations.
                    </p>
                    <CodeBlock code={`# Basic number to string conversion
age = 25
height = 5.9
temperature = -10

age_str = str(age)
height_str = str(height)
temp_str = str(temperature)

print(f"Integer {age} -> String: '{age_str}'")
print(f"Float {height} -> String: '{height_str}'")
print(f"Negative {temperature} -> String: '{temp_str}'")

# String concatenation with converted numbers
name = "Alice"
score = 95
message = "Congratulations " + name + "! You scored " + str(score) + " points."
print(message)

# Better approach using f-strings (no manual conversion needed)
better_message = f"Congratulations {name}! You scored {score} points."
print(better_message)

# Converting for display purposes
def display_user_info(name, age, balance):
    """Display user information as formatted strings"""
    print("User Information:")
    print("Name: " + str(name))
    print("Age: " + str(age) + " years old")
    print("Balance: $" + str(balance))

display_user_info("Bob", 30, 1250.75)

# Converting numbers to strings with specific formatting
price = 123.456
quantity = 5
total = price * quantity

# Basic string conversion
print("Price: " + str(price))           # Price: 123.456
print("Quantity: " + str(quantity))     # Quantity: 5
print("Total: " + str(total))          # Total: 617.28

# Better: Using formatted strings for controlled output
print(f"Price: \${price:.2f}")           # Price: $123.46
print(f"Quantity: {quantity}")          # Quantity: 5
print(f"Total: \${total:.2f}")          # Total: $617.28

# Converting large numbers to readable strings
population = 1234567890
scientific = 1.23e10

print("Population: " + str(population))              # 1234567890
print("Scientific notation: " + str(scientific))     # 1.23e+10

# Using f-strings for better formatting
print(f"Population: {population:,}")                 # 1,234,567,890
print(f"Scientific: {scientific:.2e}")               # 1.23e+10

# Converting boolean values to strings
is_student = True
is_employed = False

print("Student status: " + str(is_student))          # True
print("Employment status: " + str(is_employed))      # False

# Custom string representation for booleans
student_status = "Yes" if is_student else "No"
employment_status = "Yes" if is_employed else "No"
print(f"Student: {student_status}")                  # Student: Yes
print(f"Employed: {employment_status}")              # Employed: No

# Practical example: Creating file names with numbers
def generate_filename(base_name, file_number, extension):
    """Generate filename with number"""
    return base_name + "_" + str(file_number) + "." + extension

# Generate multiple file names
for i in range(1, 6):
    filename = generate_filename("document", i, "txt")
    print(f"Generated: {filename}")
# Output: document_1.txt, document_2.txt, etc.

# Converting for logging and debugging
def log_calculation(x, y, operation, result):
    """Log mathematical operations"""
    timestamp = "2024-01-15 10:30:00"
    log_entry = timestamp + " | " + str(x) + " " + operation + " " + str(y) + " = " + str(result)
    print(log_entry)

log_calculation(15, 3, "+", 18)
log_calculation(20, 4, "/", 5.0)
log_calculation(7, 8, "*", 56)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Boolean Conversions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Understanding how Python converts different values to True or False is crucial for conditional logic.
                    </p>
                    <CodeBlock code={`# Converting to boolean with bool()
print("=== Converting Numbers to Boolean ===")
print(f"bool(0): {bool(0)}")                    # False
print(f"bool(1): {bool(1)}")                    # True
print(f"bool(-1): {bool(-1)}")                  # True
print(f"bool(42): {bool(42)}")                  # True
print(f"bool(0.0): {bool(0.0)}")                # False
print(f"bool(3.14): {bool(3.14)}")              # True
print(f"bool(-2.5): {bool(-2.5)}")              # True

print("\\n=== Converting Strings to Boolean ===")
print(f"bool(''): {bool('')}")                  # False (empty string)
print(f"bool('Hello'): {bool('Hello')}")        # True
print(f"bool(' '): {bool(' ')}")                # True (space is not empty)
print(f"bool('0'): {bool('0')}")                # True (string, not number)
print(f"bool('False'): {bool('False')}")        # True (any non-empty string)

print("\\n=== Converting Collections to Boolean ===")
print(f"bool([]): {bool([])}")                  # False (empty list)
print(f"bool([1, 2, 3]): {bool([1, 2, 3])}")   # True
print(f"bool({{}}): {bool({})}")                # False (empty dict)
print(f"bool({{'a': 1}}): {bool({'a': 1})}")   # True
print(f"bool(()): {bool(())}")                  # False (empty tuple)
print(f"bool((1, 2)): {bool((1, 2))}")         # True

print("\\n=== None and Boolean ===")
print(f"bool(None): {bool(None)}")              # False

# Practical example: Input validation
def validate_input(user_input):
    """Check if user provided valid input"""
    if bool(user_input.strip()):  # Convert to boolean after stripping whitespace
        return True
    else:
        return False

# Test validation
test_inputs = ["Alice", "  ", "", "  Bob  ", "123"]
for input_value in test_inputs:
    result = validate_input(input_value)
    print(f"Input: '{input_value}' -> Valid: {result}")

# Converting strings to boolean (common patterns)
def string_to_bool(value):
    """Convert string representations to boolean"""
    value = value.lower().strip()
    
    # True values
    if value in ['true', '1', 'yes', 'on', 'enabled']:
        return True
    # False values
    elif value in ['false', '0', 'no', 'off', 'disabled']:
        return False
    else:
        # Default: use Python's built-in conversion
        return bool(value)

# Test string to boolean conversion
test_strings = ['true', 'False', '1', '0', 'yes', 'no', 'hello', '']
for s in test_strings:
    result = string_to_bool(s)
    print(f"'{s}' -> {result}")

# Boolean in conditional statements
def check_access(username, password, is_active):
    """Check user access with boolean conversion"""
    has_username = bool(username)
    has_password = bool(password)
    account_active = bool(is_active)
    
    print(f"Username provided: {has_username}")
    print(f"Password provided: {has_password}")
    print(f"Account active: {account_active}")
    
    if has_username and has_password and account_active:
        return "Access granted"
    else:
        return "Access denied"

# Test access check
print("\\n=== Access Check Examples ===")
print(check_access("alice", "secret123", True))     # Access granted
print(check_access("", "password", True))           # Access denied
print(check_access("bob", "pass", False))           # Access denied

# Converting numbers to boolean for flags
def process_user_settings(notifications, dark_mode, auto_save):
    """Process user settings where 1=enabled, 0=disabled"""
    notifications_enabled = bool(notifications)
    dark_mode_enabled = bool(dark_mode)
    auto_save_enabled = bool(auto_save)
    
    settings = {
        'notifications': notifications_enabled,
        'dark_mode': dark_mode_enabled,
        'auto_save': auto_save_enabled
    }
    
    return settings

# Example with numeric flags
user_prefs = process_user_settings(1, 0, 1)
print("\\n=== User Settings ===")
for setting, enabled in user_prefs.items():
    status = "Enabled" if enabled else "Disabled"
    print(f"{setting.title()}: {status}")

# Practical example: Form validation
def validate_registration_form(data):
    """Validate registration form data"""
    errors = []
    
    # Check required fields (convert to boolean to check if provided)
    if not bool(data.get('username', '').strip()):
        errors.append("Username is required")
    
    if not bool(data.get('email', '').strip()):
        errors.append("Email is required")
    
    if not bool(data.get('password', '')):
        errors.append("Password is required")
    
    # Check agreement checkbox (should be truthy)
    if not bool(data.get('agree_terms', False)):
        errors.append("Must agree to terms and conditions")
    
    return {
        'valid': len(errors) == 0,
        'errors': errors
    }

# Test form validation
test_forms = [
    {'username': 'alice', 'email': 'alice@email.com', 'password': 'secret', 'agree_terms': True},
    {'username': '', 'email': 'bob@email.com', 'password': 'pass', 'agree_terms': False},
    {'username': 'charlie', 'email': '', 'password': '', 'agree_terms': True}
]

print("\\n=== Form Validation Examples ===")
for i, form in enumerate(test_forms, 1):
    result = validate_registration_form(form)
    print(f"Form {i}: {'Valid' if result['valid'] else 'Invalid'}")
    if result['errors']:
        for error in result['errors']:
            print(f"  - {error}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">List, Tuple, and Set Conversions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Convert between different collection types to leverage their unique properties and methods.
                    </p>
                    <CodeBlock code={`# Converting between list, tuple, and set
original_list = [1, 2, 3, 2, 1, 4, 3]
print(f"Original list: {original_list}")

# List to tuple (makes it immutable)
list_to_tuple = tuple(original_list)
print(f"List to tuple: {list_to_tuple}")
print(f"Type: {type(list_to_tuple)}")

# List to set (removes duplicates)
list_to_set = set(original_list)
print(f"List to set: {list_to_set}")
print(f"Type: {type(list_to_set)}")

# Tuple to list (makes it mutable)
tuple_data = (5, 6, 7, 8, 9)
tuple_to_list = list(tuple_data)
print(f"Tuple to list: {tuple_to_list}")
tuple_to_list.append(10)  # Now we can modify it
print(f"After appending: {tuple_to_list}")

# Set to list (to get indexing and ordering)
set_data = {10, 5, 15, 20, 5, 10}  # Duplicates will be removed
set_to_list = list(set_data)
print(f"Set to list: {set_to_list}")
print(f"First element: {set_to_list[0]}")  # Now we can index

# Set to tuple
set_to_tuple = tuple(set_data)
print(f"Set to tuple: {set_to_tuple}")

# String to list (character by character)
text = "Hello"
string_to_list = list(text)
print(f"String to list: {string_to_list}")

# String to set (unique characters)
text_with_duplicates = "programming"
string_to_set = set(text_with_duplicates)
print(f"String '{text_with_duplicates}' to set: {string_to_set}")

# List of strings to set (for unique values)
names = ["Alice", "Bob", "Alice", "Charlie", "Bob", "David"]
unique_names = set(names)
print(f"Original names: {names}")
print(f"Unique names: {unique_names}")

# Practical example: Remove duplicates from list while preserving order
def remove_duplicates_preserve_order(items):
    """Remove duplicates while preserving the original order"""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

numbers_with_dupes = [1, 3, 2, 3, 1, 4, 2, 5, 4]
clean_numbers = remove_duplicates_preserve_order(numbers_with_dupes)
print(f"\\nWith duplicates: {numbers_with_dupes}")
print(f"Without duplicates (ordered): {clean_numbers}")

# Converting range to list
number_range = range(1, 11)  # 1 to 10
range_to_list = list(number_range)
print(f"Range to list: {range_to_list}")

# Converting dictionary keys/values to lists
student_grades = {"Alice": 85, "Bob": 92, "Charlie": 78}
names_list = list(student_grades.keys())
grades_list = list(student_grades.values())
pairs_list = list(student_grades.items())

print(f"Names: {names_list}")
print(f"Grades: {grades_list}")
print(f"Pairs: {pairs_list}")

# Practical example: Data processing pipeline
def process_survey_responses(responses):
    """Process survey responses through different collection types"""
    print(f"Original responses: {responses}")
    
    # Convert to set to find unique responses
    unique_responses = set(responses)
    print(f"Unique responses: {unique_responses}")
    
    # Convert back to sorted list
    sorted_responses = sorted(list(unique_responses))
    print(f"Sorted unique responses: {sorted_responses}")
    
    # Convert to tuple for immutable storage
    final_data = tuple(sorted_responses)
    print(f"Final immutable data: {final_data}")
    
    return final_data

# Test data processing
survey_data = ["satisfied", "neutral", "satisfied", "dissatisfied", "neutral", "satisfied"]
processed_data = process_survey_responses(survey_data)

# Nested conversions
nested_list = [[1, 2], [3, 4], [5, 6]]
print(f"\\nNested list: {nested_list}")

# Convert inner lists to tuples
list_of_tuples = [tuple(inner_list) for inner_list in nested_list]
print(f"List of tuples: {list_of_tuples}")

# Flatten nested list and convert to set
flattened = [item for sublist in nested_list for item in sublist]
flattened_set = set(flattened)
print(f"Flattened and unique: {flattened_set}")

# Real-world example: Processing CSV-like data
csv_data = [
    "Alice,25,Engineer",
    "Bob,30,Designer", 
    "Charlie,28,Developer",
    "Alice,25,Engineer"  # Duplicate
]

def process_csv_data(data):
    """Process CSV data removing duplicates"""
    # Convert to set to remove duplicates
    unique_rows = set(data)
    
    # Convert back to list for processing
    processed_rows = []
    for row in unique_rows:
        # Split each row and convert to tuple
        fields = tuple(row.split(','))
        processed_rows.append(fields)
    
    return processed_rows

processed_csv = process_csv_data(csv_data)
print(f"\\nProcessed CSV data:")
for row in processed_csv:
    name, age, job = row
    print(f"Name: {name}, Age: {age}, Job: {job}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Error Handling in Type Casting</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Type casting can fail when the conversion is not possible. Learn to handle these errors gracefully using try-except blocks.
                    </p>
                    <CodeBlock code={`# Common type casting errors and how to handle them

print("=== Handling ValueError in int() conversion ===")
invalid_strings = ["abc", "12.5", "", "10a", " "]

for string_val in invalid_strings:
    try:
        result = int(string_val)
        print(f"✅ '{string_val}' -> {result}")
    except ValueError as e:
        print(f"❌ '{string_val}' -> Error: {e}")

print("\\n=== Handling ValueError in float() conversion ===")
float_test_strings = ["3.14", "abc", "12", "", "1.2.3"]

for string_val in float_test_strings:
    try:
        result = float(string_val)
        print(f"✅ '{string_val}' -> {result}")
    except ValueError as e:
        print(f"❌ '{string_val}' -> Error: {e}")

# Safe conversion functions
def safe_int(value, default=0):
    """Safely convert value to integer with default fallback"""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def safe_float(value, default=0.0):
    """Safely convert value to float with default fallback"""
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def safe_bool(value, default=False):
    """Safely convert value to boolean with default fallback"""
    try:
        if isinstance(value, str):
            value = value.lower().strip()
            if value in ['true', '1', 'yes', 'on']:
                return True
            elif value in ['false', '0', 'no', 'off']:
                return False
            else:
                return bool(value)
        return bool(value)
    except (ValueError, TypeError):
        return default

# Testing safe conversion functions
print("\\n=== Testing Safe Conversion Functions ===")
test_values = ["123", "abc", "45.67", "", None, "true", "false", [1, 2, 3]]

for value in test_values:
    int_result = safe_int(value, -1)
    float_result = safe_float(value, -1.0)
    bool_result = safe_bool(value, None)
    
    print(f"Value: {value}")
    print(f"  Safe int: {int_result}")
    print(f"  Safe float: {float_result}")
    print(f"  Safe bool: {bool_result}")
    print()

# Advanced error handling with custom messages
def convert_with_validation(value, target_type, field_name="value"):
    """Convert value to target type with descriptive error messages"""
    try:
        if target_type == int:
            result = int(value)
            if isinstance(value, str) and '.' in value:
                print(f"Warning: {field_name} '{value}' contains decimal, truncated to {result}")
            return result
        elif target_type == float:
            return float(value)
        elif target_type == str:
            return str(value)
        elif target_type == bool:
            return bool(value)
        else:
            raise ValueError(f"Unsupported target type: {target_type}")
            
    except ValueError as e:
        raise ValueError(f"Cannot convert {field_name} '{value}' to {target_type.__name__}: {e}")
    except TypeError as e:
        raise TypeError(f"Type error converting {field_name} '{value}': {e}")

# Testing validation function
print("=== Testing Conversion with Validation ===")
test_cases = [
    ("25", int, "age"),
    ("19.99", float, "price"),
    ("12.5", int, "quantity"),
    ("hello", int, "user_id"),
    (None, str, "description")
]

for value, target_type, field_name in test_cases:
    try:
        result = convert_with_validation(value, target_type, field_name)
        print(f"✅ {field_name}: '{value}' -> {result} ({type(result).__name__})")
    except (ValueError, TypeError) as e:
        print(f"❌ {e}")

# Practical example: Processing form data with error handling
def process_form_data(form_data):
    """Process form data with proper type conversion and error handling"""
    processed_data = {}
    errors = []
    
    # Define expected types for each field
    field_types = {
        'name': str,
        'age': int,
        'salary': float,
        'is_active': bool,
        'experience_years': int
    }
    
    for field, expected_type in field_types.items():
        raw_value = form_data.get(field, '')
        
        try:
            if expected_type == bool:
                # Special handling for boolean fields
                processed_data[field] = safe_bool(raw_value)
            elif expected_type == int:
                if isinstance(raw_value, str) and not raw_value.strip():
                    processed_data[field] = 0  # Default for empty integer fields
                else:
                    processed_data[field] = int(raw_value)
            elif expected_type == float:
                if isinstance(raw_value, str) and not raw_value.strip():
                    processed_data[field] = 0.0  # Default for empty float fields
                else:
                    processed_data[field] = float(raw_value)
            else:  # str
                processed_data[field] = str(raw_value).strip()
                
        except (ValueError, TypeError) as e:
            errors.append(f"Invalid {field}: '{raw_value}' - {e}")
            processed_data[field] = None
    
    return {
        'data': processed_data,
        'errors': errors,
        'valid': len(errors) == 0
    }

# Test form processing
print("\\n=== Testing Form Data Processing ===")
test_forms = [
    {
        'name': 'Alice Johnson',
        'age': '28',
        'salary': '75000.50',
        'is_active': 'true',
        'experience_years': '5'
    },
    {
        'name': 'Bob Smith',
        'age': 'invalid',
        'salary': '50000',
        'is_active': '1',
        'experience_years': ''
    },
    {
        'name': '',
        'age': '25.5',  # Float provided for int field
        'salary': 'not_a_number',
        'is_active': 'maybe',
        'experience_years': '3'
    }
]

for i, form in enumerate(test_forms, 1):
    result = process_form_data(form)
    print(f"Form {i}:")
    print(f"  Valid: {result['valid']}")
    print(f"  Data: {result['data']}")
    if result['errors']:
        print(f"  Errors: {result['errors']}")
    print()

# Best practices for error handling in type casting
def robust_data_converter(data_dict, schema):
    """
    Convert dictionary data according to schema with comprehensive error handling
    
    schema format: {'field_name': {'type': type, 'required': bool, 'default': value}}
    """
    result = {
        'converted_data': {},
        'errors': [],
        'warnings': []
    }
    
    for field_name, field_config in schema.items():
        target_type = field_config['type']
        required = field_config.get('required', False)
        default_value = field_config.get('default', None)
        
        raw_value = data_dict.get(field_name)
        
        # Handle missing required fields
        if required and (raw_value is None or raw_value == ''):
            result['errors'].append(f"Required field '{field_name}' is missing or empty")
            continue
            
        # Handle missing optional fields
        if raw_value is None or raw_value == '':
            result['converted_data'][field_name] = default_value
            if default_value is not None:
                result['warnings'].append(f"Using default value for '{field_name}': {default_value}")
            continue
        
        # Attempt conversion
        try:
            if target_type == bool and isinstance(raw_value, str):
                result['converted_data'][field_name] = safe_bool(raw_value)
            else:
                result['converted_data'][field_name] = target_type(raw_value)
                
        except (ValueError, TypeError) as e:
            result['errors'].append(f"Cannot convert '{field_name}' value '{raw_value}' to {target_type.__name__}: {e}")
            result['converted_data'][field_name] = default_value
    
    return result

# Test robust converter
print("=== Testing Robust Data Converter ===")
schema = {
    'user_id': {'type': int, 'required': True},
    'username': {'type': str, 'required': True},
    'age': {'type': int, 'required': False, 'default': 18},
    'balance': {'type': float, 'required': False, 'default': 0.0},
    'is_premium': {'type': bool, 'required': False, 'default': False}
}

test_data = {
    'user_id': '12345',
    'username': 'alice_cooper',
    'age': 'twenty-five',  # Invalid
    'balance': '',         # Empty
    'is_premium': 'yes'
}

conversion_result = robust_data_converter(test_data, schema)
print(f"Converted data: {conversion_result['converted_data']}")
print(f"Errors: {conversion_result['errors']}")
print(f"Warnings: {conversion_result['warnings']}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Applications & Real-World Examples</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        See how type casting is used in real applications like data processing, file I/O, and API interactions.
                    </p>
                    <CodeBlock code={`# Example 1: CSV Data Processing
def process_csv_file(csv_content):
    """Process CSV data with proper type conversion"""
    lines = csv_content.strip().split('\\n')
    headers = lines[0].split(',')
    
    # Define column types
    column_types = {
        'id': int,
        'name': str,
        'age': int,
        'salary': float,
        'is_active': bool,
        'join_date': str
    }
    
    processed_data = []
    
    for line in lines[1:]:  # Skip header
        values = line.split(',')
        row_data = {}
        
        for i, (header, value) in enumerate(zip(headers, values)):
            header = header.strip()
            value = value.strip()
            
            if header in column_types:
                try:
                    if column_types[header] == bool:
                        row_data[header] = value.lower() in ['true', '1', 'yes']
                    else:
                        row_data[header] = column_types[header](value)
                except ValueError:
                    print(f"Warning: Could not convert '{value}' to {column_types[header].__name__} for {header}")
                    row_data[header] = None
            else:
                row_data[header] = value  # Keep as string if type not specified
        
        processed_data.append(row_data)
    
    return processed_data

# Test CSV processing
sample_csv = """id,name,age,salary,is_active,join_date
1,Alice Johnson,28,75000.50,true,2020-01-15
2,Bob Smith,35,82000.00,false,2019-03-22
3,Charlie Brown,29,68000.75,true,2021-07-10"""

csv_data = process_csv_file(sample_csv)
print("=== Processed CSV Data ===")
for row in csv_data:
    print(f"ID: {row['id']}, Name: {row['name']}, Age: {row['age']}, "
          f"Salary: \${row['salary']:,.2f}, Active: {row['is_active']}")

# Example 2: Configuration File Parser
def parse_config_file(config_content):
    """Parse configuration file with automatic type detection"""
    config = {}
    
    for line in config_content.strip().split('\\n'):
        if '=' in line and not line.startswith('#'):
            key, value = line.split('=', 1)
            key = key.strip()
            value = value.strip()
            
            # Remove quotes if present
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            
            # Auto-detect type and convert
            if value.lower() in ['true', 'false']:
                config[key] = value.lower() == 'true'
            elif value.isdigit():
                config[key] = int(value)
            elif value.replace('.', '').replace('-', '').isdigit():
                config[key] = float(value)
            else:
                config[key] = value
    
    return config

# Test config parser
sample_config = """
# Database Configuration
host = "localhost"
port = 5432
database = "myapp"
timeout = 30
ssl_enabled = true
max_connections = 100
retry_delay = 2.5
debug_mode = false
"""

parsed_config = parse_config_file(sample_config)
print("\\n=== Parsed Configuration ===")
for key, value in parsed_config.items():
    print(f"{key}: {value} ({type(value).__name__})")

# Example 3: JSON-like Data Processing
def process_api_response(response_data):
    """Process API response with proper type conversion"""
    # Simulate API response as strings (common in web forms)
    processed = {}
    
    # Type conversion rules
    conversion_rules = {
        'user_id': int,
        'score': float,
        'username': str,
        'is_verified': lambda x: x.lower() == 'true' if isinstance(x, str) else bool(x),
        'tags': lambda x: x.split(',') if isinstance(x, str) else list(x),
        'metadata': eval  # Be careful with eval in real applications!
    }
    
    for key, value in response_data.items():
        if key in conversion_rules:
            try:
                converter = conversion_rules[key]
                processed[key] = converter(value)
            except (ValueError, TypeError, SyntaxError) as e:
                print(f"Warning: Failed to convert {key}: {e}")
                processed[key] = value
        else:
            processed[key] = value
    
    return processed

# Test API response processing
api_data = {
    'user_id': '12345',
    'score': '87.5',
    'username': 'alice_cooper',
    'is_verified': 'true',
    'tags': 'python,developer,experienced',
    'metadata': "{'last_login': '2024-01-15', 'login_count': 42}"
}

processed_api = process_api_response(api_data)
print("\\n=== Processed API Response ===")
for key, value in processed_api.items():
    print(f"{key}: {value} ({type(value).__name__})")

# Example 4: Form Data Validator and Converter
class FormProcessor:
    """A class to handle form data processing with type conversion"""
    
    def __init__(self):
        self.field_definitions = {}
    
    def define_field(self, name, field_type, required=False, default=None, validator=None):
        """Define a form field with its type and validation rules"""
        self.field_definitions[name] = {
            'type': field_type,
            'required': required,
            'default': default,
            'validator': validator
        }
    
    def process_form(self, form_data):
        """Process form data according to field definitions"""
        result = {
            'data': {},
            'errors': [],
            'warnings': []
        }
        
        for field_name, field_def in self.field_definitions.items():
            raw_value = form_data.get(field_name, '')
            
            # Handle empty values
            if not raw_value and raw_value != 0:
                if field_def['required']:
                    result['errors'].append(f"{field_name} is required")
                    continue
                else:
                    result['data'][field_name] = field_def['default']
                    continue
            
            # Type conversion
            try:
                if field_def['type'] == bool:
                    converted_value = str(raw_value).lower() in ['true', '1', 'yes', 'on']
                else:
                    converted_value = field_def['type'](raw_value)
                
                # Custom validation
                if field_def['validator']:
                    validation_result = field_def['validator'](converted_value)
                    if validation_result is not True:
                        result['errors'].append(f"{field_name}: {validation_result}")
                        continue
                
                result['data'][field_name] = converted_value
                
            except (ValueError, TypeError) as e:
                result['errors'].append(f"{field_name}: Cannot convert '{raw_value}' to {field_def['type'].__name__}")
        
        return result

# Use the FormProcessor
print("\\n=== Form Processing Example ===")
processor = FormProcessor()

# Define form fields
processor.define_field('name', str, required=True)
processor.define_field('age', int, required=True, validator=lambda x: True if 0 <= x <= 120 else "Age must be between 0 and 120")
processor.define_field('email', str, required=True, validator=lambda x: True if '@' in x else "Invalid email format")
processor.define_field('salary', float, default=0.0)
processor.define_field('newsletter', bool, default=False)

# Test form data
test_form = {
    'name': 'John Doe',
    'age': '28',
    'email': 'john.doe@example.com',
    'salary': '65000.00',
    'newsletter': 'yes'
}

form_result = processor.process_form(test_form)
print(f"Processed form data: {form_result['data']}")
print(f"Errors: {form_result['errors']}")
print(f"Warnings: {form_result['warnings']}")

# Example 5: Database Record Converter
def convert_db_record(record, schema):
    """Convert database record according to schema definition"""
    converted = {}
    
    for field, field_type in schema.items():
        if field in record:
            value = record[field]
            
            # Handle None/NULL values
            if value is None:
                converted[field] = None
                continue
            
            # Handle different database types
            try:
                if field_type == 'datetime':
                    # Convert timestamp string to datetime-like representation
                    converted[field] = str(value)  # Simplified for demo
                elif field_type == 'decimal':
                    converted[field] = float(value)
                elif field_type == 'integer':
                    converted[field] = int(value)
                elif field_type == 'boolean':
                    converted[field] = bool(value) if not isinstance(value, str) else value.lower() in ['1', 'true', 't']
                else:  # string
                    converted[field] = str(value)
                    
            except (ValueError, TypeError) as e:
                print(f"Warning: Could not convert {field} value '{value}': {e}")
                converted[field] = value
        
        else:
            converted[field] = None
    
    return converted

# Test database record conversion
db_schema = {
    'id': 'integer',
    'name': 'string',
    'created_at': 'datetime',
    'balance': 'decimal',
    'is_active': 'boolean'
}

db_record = {
    'id': '123',
    'name': 'Alice',
    'created_at': '2024-01-15 10:30:00',
    'balance': '1250.75',
    'is_active': '1'
}

converted_record = convert_db_record(db_record, db_schema)
print("\\n=== Converted Database Record ===")
for field, value in converted_record.items():
    print(f"{field}: {value} ({type(value).__name__})")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices & Common Pitfalls</h2>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">✅ Best Practices</h3>
                        <ul className="text-green-700 dark:text-green-300 space-y-2">
                            <li>• Always validate data before type casting</li>
                            <li>• Use try-except blocks to handle conversion errors gracefully</li>
                            <li>• Provide meaningful default values for failed conversions</li>
                            <li>• Consider using isinstance() to check types before conversion</li>
                            <li>• Create helper functions for common conversion patterns</li>
                            <li>• Document expected input formats for your functions</li>
                            <li>• Test edge cases like empty strings, None values, and extreme numbers</li>
                        </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">⚠️ Common Pitfalls</h3>
                        <ul className="text-red-700 dark:text-red-300 space-y-2">
                            <li>• Not handling ValueError when converting invalid strings to numbers</li>
                            <li>• Assuming all user input is valid before conversion</li>
                            <li>• Using eval() for string-to-object conversion (security risk)</li>
                            <li>• Forgetting that empty strings and None are &quot;falsy&quot; in boolean conversion</li>
                            <li>• Not considering locale-specific number formats (e.g., commas as decimal separators)</li>
                            <li>• Losing precision when converting large integers to float</li>
                            <li>• Not handling TypeError when trying to convert incompatible types</li>
                        </ul>
                    </div>

                    <CodeBlock code={`# Comprehensive example showing best practices
class TypeCaster:
    """A robust type casting utility class"""
    
    @staticmethod
    def to_int(value, default=None, allow_float=True):
        """
        Convert value to integer with comprehensive error handling
        
        Args:
            value: Value to convert
            default: Default value if conversion fails
            allow_float: Whether to allow conversion of float strings
        """
        if value is None:
            return default
            
        try:
            # Handle string inputs
            if isinstance(value, str):
                value = value.strip()
                if not value:
                    return default
                
                # Check if it's a float string
                if '.' in value and allow_float:
                    return int(float(value))  # Convert float to int
                
            return int(value)
            
        except (ValueError, TypeError, OverflowError):
            return default
    
    @staticmethod
    def to_float(value, default=None, handle_thousands_sep=False):
        """
        Convert value to float with error handling
        
        Args:
            value: Value to convert
            default: Default value if conversion fails
            handle_thousands_sep: Whether to handle thousands separators
        """
        if value is None:
            return default
            
        try:
            if isinstance(value, str):
                value = value.strip()
                if not value:
                    return default
                
                # Handle thousands separators
                if handle_thousands_sep:
                    value = value.replace(',', '')
                
            return float(value)
            
        except (ValueError, TypeError, OverflowError):
            return default
    
    @staticmethod
    def to_bool(value, default=None, true_values=None, false_values=None):
        """
        Convert value to boolean with custom true/false values
        
        Args:
            value: Value to convert
            default: Default value if conversion fails
            true_values: Custom values that should be considered True
            false_values: Custom values that should be considered False
        """
        if value is None:
            return default
            
        # Default true/false values
        if true_values is None:
            true_values = {'true', '1', 'yes', 'on', 'enabled', 'y', 't'}
        if false_values is None:
            false_values = {'false', '0', 'no', 'off', 'disabled', 'n', 'f'}
        
        try:
            if isinstance(value, str):
                value = value.lower().strip()
                if value in true_values:
                    return True
                elif value in false_values:
                    return False
                else:
                    # Fall back to Python's built-in boolean conversion
                    return bool(value)
            
            return bool(value)
            
        except (ValueError, TypeError):
            return default
    
    @staticmethod
    def to_string(value, default="", handle_none=True):
        """
        Convert value to string with options for None handling
        
        Args:
            value: Value to convert
            default: Default value if conversion fails
            handle_none: How to handle None values
        """
        try:
            if value is None and handle_none:
                return "None" if default == "" else default
            
            return str(value)
            
        except (ValueError, TypeError):
            return default

# Demonstrate the TypeCaster utility
print("=== TypeCaster Utility Examples ===")

# Test integer conversion
test_int_values = ["123", "45.67", "  78  ", "", None, "abc", "1,234"]
print("Integer conversions:")
for val in test_int_values:
    result = TypeCaster.to_int(val, default=-1, allow_float=True)
    print(f"  '{val}' -> {result}")

# Test float conversion
test_float_values = ["123.45", "1,234.56", "78", "", None, "abc"]
print("\\nFloat conversions:")
for val in test_float_values:
    result = TypeCaster.to_float(val, default=-1.0, handle_thousands_sep=True)
    print(f"  '{val}' -> {result}")

# Test boolean conversion
test_bool_values = ["true", "FALSE", "1", "0", "yes", "no", "maybe", "", None]
print("\\nBoolean conversions:")
for val in test_bool_values:
    result = TypeCaster.to_bool(val, default=None)
    print(f"  '{val}' -> {result}")

# Example of common mistakes and how to avoid them
print("\\n=== Common Mistakes and Solutions ===")

def demonstrate_mistakes():
    """Show common type casting mistakes"""
    
    # ❌ Mistake 1: Not handling empty strings
    try:
        user_age = ""  # Empty input
        age = int(user_age)  # This will raise ValueError
    except ValueError:
        print("❌ Mistake: Empty string conversion failed")
        # ✅ Solution: Check for empty strings
        age = int(user_age) if user_age.strip() else 0
        print(f"✅ Solution: Default age used: {age}")
    
    # ❌ Mistake 2: Not handling None values
    try:
        value = None
        number = int(value)  # This will raise TypeError
    except TypeError:
        print("❌ Mistake: None conversion failed")
        # ✅ Solution: Check for None
        number = int(value) if value is not None else 0
        print(f"✅ Solution: Default number used: {number}")
    
    # ❌ Mistake 3: Assuming boolean conversion behavior
    misleading_values = ["0", "", "False", "false", "no"]
    print("❌ Mistake: Misleading boolean conversions")
    for val in misleading_values:
        python_bool = bool(val)  # Might not be what you expect
        smart_bool = TypeCaster.to_bool(val)
        print(f"  '{val}': bool() -> {python_bool}, smart_bool -> {smart_bool}")
    
    # ✅ Best practice: Comprehensive input validation
    def safe_user_input_processor(raw_input):
        """Process user input safely"""
        # Trim whitespace
        cleaned = raw_input.strip() if raw_input else ""
        
        # Check if empty
        if not cleaned:
            return {'value': None, 'error': 'Input is empty'}
        
        # Try different conversions
        # Try integer first
        if cleaned.isdigit() or (cleaned.startswith('-') and cleaned[1:].isdigit()):
            return {'value': int(cleaned), 'type': 'integer', 'error': None}
        
        # Try float
        try:
            float_val = float(cleaned)
            return {'value': float_val, 'type': 'float', 'error': None}
        except ValueError:
            pass
        
        # Try boolean
        if cleaned.lower() in ['true', 'false', 'yes', 'no', '1', '0']:
            bool_val = TypeCaster.to_bool(cleaned)
            return {'value': bool_val, 'type': 'boolean', 'error': None}
        
        # Default to string
        return {'value': cleaned, 'type': 'string', 'error': None}
    
    print("\\n✅ Smart input processing:")
    test_inputs = ["123", "45.67", "true", "hello", "", "  42  ", "-15"]
    for inp in test_inputs:
        result = safe_user_input_processor(inp)
        print(f"  '{inp}' -> {result}")

demonstrate_mistakes()

# Performance considerations
print("\\n=== Performance Tips ===")

def performance_comparison():
    """Compare different type casting approaches"""
    import time
    
    # Sample data
    string_numbers = [str(i) for i in range(1000)]
    
    # Method 1: Basic int() with try-except
    start_time = time.time()
    results1 = []
    for s in string_numbers:
        try:
            results1.append(int(s))
        except ValueError:
            results1.append(0)
    time1 = time.time() - start_time
    
    # Method 2: Pre-validation
    start_time = time.time()
    results2 = []
    for s in string_numbers:
        if s.isdigit():
            results2.append(int(s))
        else:
            results2.append(0)
    time2 = time.time() - start_time
    
    print(f"Method 1 (try-except): {time1:.6f} seconds")
    print(f"Method 2 (pre-validation): {time2:.6f} seconds")
    print(f"Pre-validation is {time1/time2:.1f}x faster for valid inputs")

performance_comparison()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🎯 Try These Challenges</h3>
                        <div className="text-purple-700 dark:text-purple-300 space-y-3">
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 1: Data Cleaner</p>
                                <p className="text-sm">Create a function that takes a list of mixed data types and returns a cleaned list with appropriate type conversions.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 2: Configuration Parser</p>
                                <p className="text-sm">Build a configuration file parser that automatically detects and converts data types from string values.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 3: Grade Calculator</p>
                                <p className="text-sm">Create a program that processes student grades from various input formats (strings, floats) and calculates averages.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 4: Survey Data Processor</p>
                                <p className="text-sm">Process survey responses with different answer formats (Yes/No, 1-5 scale, text) and convert them to standardized types.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 5: Safe Calculator</p>
                                <p className="text-sm">Build a calculator that safely handles string input, converts to numbers, and performs operations with error handling.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TypeCasting;