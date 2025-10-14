import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Strings = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Strings</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Strings are text data in Python. They are sequences of characters enclosed in quotes. 
                    Think of them as words, sentences, or any text you want to work with in your programs.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a String?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            A string is any text enclosed in quotes. You can use single quotes, double quotes, or triple quotes.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Different ways to create strings
name = "Alice"           # Double quotes
message = 'Hello World'  # Single quotes
paragraph = """This is a
multiline string"""      # Triple quotes

print(name)      # Alice
print(message)   # Hello World
print(paragraph) # This is a multiline string`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 1: Basic String Operations</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">String Length</h4>
                            <CodeBlock code={`text = "Hello"
length = len(text)
print(length)  # 5

# Empty string has length 0
empty = ""
print(len(empty))  # 0`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Joining Strings (Concatenation)</h4>
                            <CodeBlock code={`first_name = "John"
last_name = "Doe"

# Using + operator
full_name = first_name + " " + last_name
print(full_name)  # John Doe

# Using f-strings (recommended)
full_name = f"{first_name} {last_name}"
print(full_name)  # John Doe`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 2: Accessing String Characters</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can access individual characters in a string using index numbers (starting from 0).
                    </p>
                    
                    <CodeBlock code={`text = "Hello"

# Accessing characters by index
print(text[0])  # H (first character)
print(text[1])  # e (second character)
print(text[4])  # o (last character)

# Negative indexing (from the end)
print(text[-1])  # o (last character)
print(text[-2])  # l (second to last)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 3: String Slicing</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Slicing lets you get a part of a string by specifying start and end positions.
                    </p>
                    
                    <CodeBlock code={`text = "Hello World"

# Basic slicing [start:end]
print(text[0:5])    # Hello (characters 0 to 4)
print(text[6:11])   # World (characters 6 to 10)

# Shortcuts
print(text[:5])     # Hello (from start to position 4)
print(text[6:])     # World (from position 6 to end)
print(text[:])      # Hello World (entire string)`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 4: Common String Methods</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Case Conversion</h4>
                            <CodeBlock code={`text = "Hello World"

print(text.upper())      # HELLO WORLD
print(text.lower())      # hello world
print(text.title())      # Hello World
print(text.capitalize()) # Hello world`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Finding and Replacing</h4>
                            <CodeBlock code={`text = "Hello World"

# Replace text
new_text = text.replace("World", "Python")
print(new_text)  # Hello Python

# Find position of text
position = text.find("World")
print(position)  # 6

# Check if text contains something
print("Hello" in text)  # True
print("Python" in text) # False`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Splitting and Joining</h4>
                            <CodeBlock code={`text = "apple,banana,cherry"

# Split string into list
fruits = text.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

# Join list into string
fruit_list = ["apple", "banana", "cherry"]
result = ", ".join(fruit_list)
print(result)  # apple, banana, cherry`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 5: String Formatting</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Using f-strings (Modern Way)</h4>
                            <CodeBlock code={`name = "Alice"
age = 25
score = 95.5

# f-string formatting
message = f"Hi {name}, you are {age} years old"
print(message)  # Hi Alice, you are 25 years old

# With calculations
result = f"Your score is {score:.1f}%"
print(result)  # Your score is 95.5%`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Using .format() Method</h4>
                            <CodeBlock code={`name = "Bob"
age = 30

# Using .format()
message = "Hi {}, you are {} years old".format(name, age)
print(message)  # Hi Bob, you are 30 years old

# With named placeholders
message = "Hi {name}, you are {age} years old".format(name=name, age=age)
print(message)  # Hi Bob, you are 30 years old`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step 6: String Validation</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Check what type of characters your string contains.
                    </p>
                    
                    <CodeBlock code={`# Different types of strings
number_str = "12345"
letter_str = "hello"
mixed_str = "hello123"

# Check string content
print(number_str.isdigit())    # True (only numbers)
print(letter_str.isalpha())    # True (only letters)
print(mixed_str.isalnum())     # True (letters and numbers)

# Check case
upper_str = "HELLO"
print(upper_str.isupper())     # True`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-World Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 1: Processing Names</h4>
                            <CodeBlock code={`# Clean up a name
user_input = "  alice JOHNSON  "

# Remove extra spaces and fix case
clean_name = user_input.strip().title()
print(clean_name)  # Alice Johnson

# Split into first and last name
names = clean_name.split()
first_name = names[0]
last_name = names[1]
print(f"First: {first_name}, Last: {last_name}")`} />
                        </div>

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example 2: Email Validation</h4>
                            <CodeBlock code={`email = "user@example.com"

# Basic email check
if "@" in email and "." in email:
    parts = email.split("@")
    username = parts[0]
    domain = parts[1]
    print(f"Username: {username}")  # Username: user
    print(f"Domain: {domain}")      # Domain: example.com
else:
    print("Invalid email format")`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Escape Characters</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Special characters that help you include quotes, newlines, and tabs in strings.
                    </p>
                    
                    <CodeBlock code={`# Common escape characters
quote_text = 'She said "Hello" to me'        # double quotes inside single quotes
newline_text = "Line 1\nLine 2"              # \n for new line
tab_text = "Name:\tAlice"                    # \t for tab

print(quote_text)  # She said "Hello" to me
print(newline_text)
# Line 1
# Line 2
print(tab_text)    # Name:    Alice`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">String Method Quick Reference</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Case Methods</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                                <li><code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">.upper()</code> - ALL CAPS</li>
                                <li><code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">.lower()</code> - all lowercase</li>
                                <li><code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">.title()</code> - Title Case</li>
                                <li><code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">.capitalize()</code> - First letter only</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">Search & Replace</h3>
                            <ul className="space-y-2 text-purple-700 dark:text-purple-300 text-sm">
                                <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">.find()</code> - Find position</li>
                                <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">.replace()</code> - Replace text</li>
                                <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">.split()</code> - Split into list</li>
                                <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">.strip()</code> - Remove spaces</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Key Points to Remember</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Strings are text data enclosed in quotes</li>
                        <li>• Index starts at 0, negative index starts from end</li>
                        <li>• Use f-strings for easy formatting: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">f&quot;Hello {'{'}name{'}'}&quot;</code></li>
                        <li>• Strings are immutable - methods return new strings</li>
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">.strip()</code> to remove extra spaces</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 rounded">
                        <strong>Practice:</strong> Try creating a program that takes a user name and formats it properly (removes spaces, fixes case)!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Strings;