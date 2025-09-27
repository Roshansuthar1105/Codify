import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ConditionalStatements = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Conditional Statements</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Conditional statements allow your programs to make decisions and execute different code paths based on conditions. 
                    Master if, elif, and else statements to create intelligent, responsive Python applications.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic if Statements</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">if</code> statement executes code only when a condition is True.
                    </p>
                    <CodeBlock code={`# Basic if statement
age = 18
if age >= 18:
    print("You are an adult!")
    print("You can vote.")

# if statement with variables
temperature = 25
if temperature > 30:
    print("It's hot today!")

# Multiple conditions in if
score = 85
if score >= 80:
    print("Excellent work!")
    print("You got an A grade!")

# if with user input
name = input("Enter your name: ")
if name:  # Checks if name is not empty
    print(f"Hello, {name}!")

# Checking data types
value = "42"
if isinstance(value, str):
    print("This is a string")
    print(f"Length: {len(value)}")

# Checking if item exists in list
fruits = ["apple", "banana", "orange"]
if "apple" in fruits:
    print("Apple is available!")

# Checking multiple conditions
username = "admin"
password = "secret123"
if username == "admin" and password == "secret123":
    print("Login successful!")
    print("Welcome to the admin panel!")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">if-else Statements</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">else</code> to provide an alternative path when the if condition is False.
                    </p>
                    <CodeBlock code={`# Basic if-else
age = 16
if age >= 18:
    print("You can vote!")
else:
    print("You cannot vote yet.")
    print(f"Wait {18 - age} more years.")

# Even or odd checker
number = int(input("Enter a number: "))
if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")

# Password validation
password = input("Enter password: ")
if len(password) >= 8:
    print("Password is strong enough")
    print("Account created successfully!")
else:
    print("Password too short")
    print("Password must be at least 8 characters")

# Grade evaluation
score = 75
if score >= 60:
    print("Congratulations! You passed!")
    print(f"Your score: {score}")
else:
    print("Sorry, you failed.")
    print("Better luck next time!")

# Temperature checker
temp = 20
if temp > 25:
    print("It's warm outside")
    print("Perfect weather for a walk!")
else:
    print("It's cool outside")
    print("Maybe wear a jacket")

# Login system
correct_pin = "1234"
user_pin = input("Enter your PIN: ")
if user_pin == correct_pin:
    print("Access granted")
    print("Welcome to your account!")
else:
    print("Access denied")
    print("Incorrect PIN entered")

# File extension checker
filename = "document.pdf"
if filename.endswith('.txt'):
    print("This is a text file")
else:
    print("This is not a text file")
    print(f"File type: {filename.split('.')[-1]}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">if-elif-else Statements</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">elif</code> (else if) to check multiple conditions sequentially.
                    </p>
                    <CodeBlock code={`# Grade classification
score = 85
if score >= 90:
    print("Grade: A")
    print("Excellent performance!")
elif score >= 80:
    print("Grade: B")
    print("Good work!")
elif score >= 70:
    print("Grade: C")
    print("Satisfactory")
elif score >= 60:
    print("Grade: D")
    print("Needs improvement")
else:
    print("Grade: F")
    print("Failed - please retake")

# Weather advisory
temperature = 15
if temperature > 30:
    print("Hot weather warning")
    print("Stay hydrated!")
elif temperature > 20:
    print("Pleasant weather")
    print("Great day to go outside!")
elif temperature > 10:
    print("Cool weather")
    print("Light jacket recommended")
elif temperature > 0:
    print("Cold weather")
    print("Wear warm clothes")
else:
    print("Freezing weather")
    print("Stay indoors if possible")

# BMI calculator with categories
weight = 70  # kg
height = 1.75  # meters
bmi = weight / (height ** 2)

print(f"Your BMI: {bmi:.1f}")
if bmi < 18.5:
    print("Category: Underweight")
    print("Consider gaining some weight")
elif bmi < 25:
    print("Category: Normal weight")
    print("Maintain your current lifestyle!")
elif bmi < 30:
    print("Category: Overweight")
    print("Consider diet and exercise")
else:
    print("Category: Obese")
    print("Please consult a doctor")

# Age group classifier
age = 25
if age < 13:
    print("Age group: Child")
    print("Focus on learning and playing!")
elif age < 20:
    print("Age group: Teenager")
    print("Time for education and growth!")
elif age < 60:
    print("Age group: Adult")
    print("Career and family time!")
else:
    print("Age group: Senior")
    print("Time to enjoy retirement!")

# Traffic light system
light_color = input("Enter traffic light color: ").lower()
if light_color == "green":
    print("GO - Proceed safely")
elif light_color == "yellow":
    print("CAUTION - Prepare to stop")
elif light_color == "red":
    print("STOP - Wait for green light")
else:
    print("Invalid color entered")
    print("Please enter: green, yellow, or red")

# Day of week checker
day = input("Enter day of the week: ").lower()
if day == "monday":
    print("Start of the work week!")
elif day == "tuesday":
    print("Tuesday blues!")
elif day == "wednesday":
    print("Hump day - halfway there!")
elif day == "thursday":
    print("Almost there!")
elif day == "friday":
    print("TGIF! Weekend is near!")
elif day == "saturday" or day == "sunday":
    print("Weekend! Time to relax!")
else:
    print("Invalid day entered")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Nested Conditional Statements</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Nest if statements inside other if statements for complex decision-making logic.
                    </p>
                    <CodeBlock code={`# Nested conditions example - Student evaluation
age = 20
grade = 85
attendance = 90

if age >= 18:
    print("Student is eligible for advanced courses")
    
    if grade >= 80:
        print("Academic performance: Excellent")
        
        if attendance >= 85:
            print("Attendance: Good")
            print("Recommendation: Honor Roll")
        else:
            print("Attendance: Poor")
            print("Recommendation: Improve attendance")
    else:
        print("Academic performance: Needs improvement")
        
        if attendance >= 85:
            print("Attendance: Good")
            print("Recommendation: Focus on studies")
        else:
            print("Attendance: Poor")
            print("Recommendation: Academic probation")
else:
    print("Student not eligible for advanced courses")
    print("Complete basic requirements first")

# Login system with multiple checks
username = input("Username: ")
password = input("Password: ")

if username:  # Check if username is not empty
    if len(username) >= 3:
        if password:  # Check if password is not empty
            if len(password) >= 8:
                if username == "admin" and password == "password123":
                    print("Login successful!")
                    print("Welcome, Administrator!")
                else:
                    print("Invalid credentials")
            else:
                print("Password too short (minimum 8 characters)")
        else:
            print("Password cannot be empty")
    else:
        print("Username too short (minimum 3 characters)")
else:
    print("Username cannot be empty")

# Weather clothing advisor
temperature = 22
is_raining = True
is_windy = False

if temperature > 25:
    print("Base recommendation: Light clothing")
    
    if is_raining:
        print("Additional: Take an umbrella")
        
        if is_windy:
            print("Extra: Wear a light raincoat")
        else:
            print("Umbrella should be sufficient")
    else:
        if is_windy:
            print("Additional: Light windbreaker")
        else:
            print("Perfect weather for outdoor activities")
            
elif temperature > 15:
    print("Base recommendation: Moderate clothing")
    
    if is_raining:
        print("Additional: Waterproof jacket")
        
        if is_windy:
            print("Extra: Warm, waterproof coat")
    else:
        if is_windy:
            print("Additional: Windproof jacket")
            
else:
    print("Base recommendation: Warm clothing")
    
    if is_raining:
        print("Additional: Heavy raincoat")
        
        if is_windy:
            print("Extra: Full winter gear")
    else:
        if is_windy:
            print("Additional: Heavy winter coat")
        else:
            print("Regular winter clothing")

# Online shopping discount system
purchase_amount = 150
is_member = True
coupon_code = "SAVE20"

if purchase_amount > 100:
    print("Eligible for bulk discount")
    discount = 0.1  # 10% discount
    
    if is_member:
        print("Member bonus applied")
        discount += 0.05  # Additional 5% for members
        
        if coupon_code == "SAVE20":
            print("Coupon code applied")
            discount += 0.2  # Additional 20% with coupon
            
    final_amount = purchase_amount * (1 - discount)
    total_discount = purchase_amount * discount
    
    print(f"Original amount: \${purchase_amount}")
    print(f"Total discount: \${total_discount:.2f} ({discount*100:.1f}%)")
    print(f"Final amount: \${final_amount:.2f}")
else:
    print("Minimum purchase for discount: $100")
    print(f"Add \${100 - purchase_amount} to qualify for discounts")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Logical Operators in Conditions</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Combine multiple conditions using <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">and</code>, <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">or</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">not</code> operators.
                    </p>
                    <CodeBlock code={`# AND operator - all conditions must be True
age = 25
has_license = True
has_car = True

if age >= 18 and has_license and has_car:
    print("You can drive!")
    print("Have a safe trip!")
else:
    print("Requirements not met for driving")

# OR operator - at least one condition must be True
payment_method = "card"
if payment_method == "cash" or payment_method == "card" or payment_method == "digital":
    print("Payment method accepted")
    print("Processing your order...")
else:
    print("Invalid payment method")
    print("Please use: cash, card, or digital payment")

# NOT operator - reverses the condition
is_weekend = False
if not is_weekend:
    print("It's a weekday")
    print("Time to work!")
else:
    print("It's weekend!")
    print("Time to relax!")

# Complex logical combinations
username = "john_doe"
password = "secure123"
is_account_active = True
failed_attempts = 2

if (username == "john_doe" and password == "secure123") and is_account_active and failed_attempts < 3:
    print("Login successful!")
    print("Welcome back, John!")
elif not is_account_active:
    print("Account is suspended")
    print("Contact support for help")
elif failed_attempts >= 3:
    print("Too many failed attempts")
    print("Account temporarily locked")
else:
    print("Invalid username or password")
    print("Please try again")

# Age and membership validation
age = 22
is_student = True
is_senior = False

if (age >= 18 and age < 65) or is_student or is_senior:
    print("Eligible for membership")
    
    if is_student:
        print("Student discount: 20% off")
    elif is_senior:
        print("Senior discount: 15% off")
    else:
        print("Regular membership rates apply")
else:
    print("Not eligible for membership")

# Weather conditions
temperature = 28
humidity = 70
is_sunny = True

if temperature > 25 and humidity < 60 and is_sunny:
    print("Perfect weather for outdoor activities!")
    print("Recommended: Beach, hiking, picnic")
elif temperature > 25 and (humidity >= 60 or not is_sunny):
    print("Warm but not ideal conditions")
    print("Recommended: Indoor activities")
elif temperature <= 25 and is_sunny:
    print("Pleasant weather")
    print("Good for walking or light outdoor activities")
else:
    print("Stay indoors")
    print("Weather not suitable for outdoor activities")

# Grade and attendance requirements
math_grade = 85
science_grade = 78
attendance = 92

if (math_grade >= 80 or science_grade >= 80) and attendance >= 90:
    print("Meets requirements for honor society")
    
    if math_grade >= 80 and science_grade >= 80:
        print("Excellent performance in both subjects!")
        print("Eligible for academic scholarship")
    else:
        print("Strong performance in one subject")
        print("Work on improving the other subject")
        
elif attendance < 90:
    print("Good grades but attendance is low")
    print("Improve attendance to qualify for honor society")
else:
    print("Need to improve grades")
    print("Minimum 80 in at least one subject required")

# Multiple validation checks
email = "user@example.com"
phone = "1234567890"
age = 25

if ("@" in email and "." in email) and len(phone) == 10 and phone.isdigit() and age >= 18:
    print("All information is valid")
    print("Account can be created")
else:
    print("Please correct the following:")
    
    if not ("@" in email and "." in email):
        print("- Invalid email format")
    if not (len(phone) == 10 and phone.isdigit()):
        print("- Phone number must be 10 digits")
    if not age >= 18:
        print("- Must be 18 or older")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Ternary Operator (Conditional Expression)</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Python&apos;s ternary operator provides a concise way to write simple if-else statements in one line.
                    </p>
                    <CodeBlock code={`# Basic ternary operator syntax
# result = value_if_true if condition else value_if_false

age = 20
status = "adult" if age >= 18 else "minor"
print(f"You are an {status}")

# Number comparison
a, b = 10, 15
max_value = a if a > b else b
print(f"Maximum value: {max_value}")

# Grade evaluation
score = 85
grade = "Pass" if score >= 60 else "Fail"
print(f"Result: {grade}")

# Even or odd
number = 17
parity = "even" if number % 2 == 0 else "odd"
print(f"{number} is {parity}")

# Temperature description
temp = 25
weather = "hot" if temp > 30 else "warm" if temp > 20 else "cold"
print(f"Weather: {weather}")

# Membership discount
is_member = True
discount = 0.2 if is_member else 0.0
price = 100
final_price = price * (1 - discount)
print(f"Final price: \${final_price}")

# List comprehension with ternary
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
labels = ["even" if x % 2 == 0 else "odd" for x in numbers]
print("Number labels:", labels)

# Multiple ternary operators (nested)
score = 85
letter_grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(f"Letter grade: {letter_grade}")

# Function with ternary
def check_password(password):
    return "Strong" if len(password) >= 8 else "Weak"

print(check_password("mypass"))      # Weak
print(check_password("mysecurepass"))  # Strong

# Ternary in print statements
balance = 1500
print("Sufficient funds" if balance >= 1000 else "Insufficient funds")

# Complex ternary with logical operators
username = "admin"
password = "admin123"
access = "granted" if username == "admin" and len(password) >= 8 else "denied"
print(f"Access: {access}")

# Ternary for default values
name = input("Enter your name (or press Enter): ")
display_name = name if name.strip() else "Anonymous"
print(f"Hello, {display_name}!")

# Mathematical operations with ternary
x = -5
absolute_value = x if x >= 0 else -x
print(f"Absolute value of {x}: {absolute_value}")

# String operations with ternary
text = "Hello World"
case_text = text.upper() if len(text) > 5 else text.lower()
print(f"Processed text: {case_text}")`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Applications</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                        Real-world examples demonstrating how conditional statements solve common programming problems.
                    </p>
                    <CodeBlock code={`# ATM Machine Simulation
def atm_machine():
    balance = 1000
    pin = "1234"
    attempts = 0
    max_attempts = 3
    
    print("=== Welcome to ATM ===")
    
    while attempts < max_attempts:
        user_pin = input("Enter your PIN: ")
        
        if user_pin == pin:
            print("PIN accepted!")
            break
        else:
            attempts += 1
            remaining = max_attempts - attempts
            
            if remaining > 0:
                print(f"Wrong PIN! {remaining} attempts remaining")
            else:
                print("Card blocked due to too many wrong attempts")
                return
    
    while True:
        print("\\n=== ATM Menu ===")
        print("1. Check Balance")
        print("2. Withdraw")
        print("3. Deposit")
        print("4. Exit")
        
        choice = input("Enter choice (1-4): ")
        
        if choice == "1":
            print(f"Your balance: \${balance}")
            
        elif choice == "2":
            amount = float(input("Enter amount to withdraw: $"))
            
            if amount <= 0:
                print("Invalid amount!")
            elif amount > balance:
                print("Insufficient funds!")
            else:
                balance -= amount
                print(f"\${amount} withdrawn successfully")
                print(f"Remaining balance: \${balance}")
                
        elif choice == "3":
            amount = float(input("Enter amount to deposit: $"))
            
            if amount <= 0:
                print("Invalid amount!")
            else:
                balance += amount
                print(f"\${amount} deposited successfully")
                print(f"New balance: \${balance}")
                
        elif choice == "4":
            print("Thank you for using ATM!")
            break
            
        else:
            print("Invalid choice! Please try again.")

# Student Grade Management System
def grade_management():
    print("=== Student Grade Calculator ===")
    
    name = input("Enter student name: ")
    
    # Get scores for different subjects
    math_score = float(input("Math score (0-100): "))
    science_score = float(input("Science score (0-100): "))
    english_score = float(input("English score (0-100): "))
    
    # Validate scores
    if not (0 <= math_score <= 100 and 0 <= science_score <= 100 and 0 <= english_score <= 100):
        print("Error: All scores must be between 0 and 100")
        return
    
    # Calculate average
    average = (math_score + science_score + english_score) / 3
    
    # Determine letter grade
    if average >= 90:
        letter_grade = "A"
        description = "Excellent"
    elif average >= 80:
        letter_grade = "B"
        description = "Good"
    elif average >= 70:
        letter_grade = "C"
        description = "Satisfactory"
    elif average >= 60:
        letter_grade = "D"
        description = "Needs Improvement"
    else:
        letter_grade = "F"
        description = "Failing"
    
    # Check individual subject performance
    weak_subjects = []
    if math_score < 60:
        weak_subjects.append("Math")
    if science_score < 60:
        weak_subjects.append("Science")
    if english_score < 60:
        weak_subjects.append("English")
    
    # Display results
    print(f"\\n=== Grade Report for {name} ===")
    print(f"Math: {math_score}")
    print(f"Science: {science_score}")
    print(f"English: {english_score}")
    print(f"Average: {average:.1f}")
    print(f"Letter Grade: {letter_grade} ({description})")
    
    if weak_subjects:
        print(f"\\nSubjects needing improvement: {', '.join(weak_subjects)}")
    else:
        print("\\nGreat job! All subjects are above passing grade.")
    
    # Scholarship eligibility
    if average >= 85 and min(math_score, science_score, english_score) >= 75:
        print("🎉 Eligible for academic scholarship!")
    elif average >= 75:
        print("Close to scholarship eligibility - improve weak subjects")

# Simple E-commerce Checkout System
def ecommerce_checkout():
    print("=== E-commerce Checkout ===")
    
    # Shopping cart items
    cart = {
        "laptop": {"price": 899.99, "quantity": 0},
        "mouse": {"price": 25.99, "quantity": 0},
        "keyboard": {"price": 79.99, "quantity": 0},
        "monitor": {"price": 299.99, "quantity": 0}
    }
    
    # Add items to cart
    print("Available items:")
    for item, details in cart.items():
        print(f"{item.title()}: \${details['price']}")
    
    while True:
        item = input("\\nEnter item name (or 'done' to checkout): ").lower()
        
        if item == "done":
            break
        elif item in cart:
            quantity = int(input(f"How many {item}s? "))
            if quantity > 0:
                cart[item]["quantity"] = quantity
                print(f"Added {quantity} {item}(s) to cart")
            else:
                print("Invalid quantity!")
        else:
            print("Item not available!")
    
    # Calculate totals
    subtotal = sum(details["price"] * details["quantity"] for details in cart.values())
    
    if subtotal == 0:
        print("Cart is empty!")
        return
    
    print(f"\\n=== Order Summary ===")
    for item, details in cart.items():
        if details["quantity"] > 0:
            item_total = details["price"] * details["quantity"]
            print(f"{item.title()}: {details['quantity']} x \${details['price']} = \${item_total:.2f}")
    
    print(f"\\nSubtotal: \${subtotal:.2f}")
    
    # Apply discounts
    discount = 0
    if subtotal > 1000:
        discount = 0.15  # 15% discount for orders over $1000
        print("Bulk order discount (15%) applied!")
    elif subtotal > 500:
        discount = 0.10  # 10% discount for orders over $500
        print("Volume discount (10%) applied!")
    elif subtotal > 200:
        discount = 0.05  # 5% discount for orders over $200
        print("Small discount (5%) applied!")
    
    # Calculate shipping
    if subtotal > 100:
        shipping = 0
        print("Free shipping applied!")
    else:
        shipping = 9.99
        print(f"Shipping: \${shipping}")
    
    # Calculate final total
    discount_amount = subtotal * discount
    final_total = subtotal - discount_amount + shipping
    
    print(f"Discount: -\${discount_amount:.2f}")
    print(f"Final Total: \${final_total:.2f}")
    
    # Payment processing
    payment_method = input("\\nPayment method (card/cash): ").lower()
    
    if payment_method in ["card", "cash"]:
        print("\\n🎉 Order confirmed!")
        print("Thank you for your purchase!")
        
        if payment_method == "card":
            print("Payment processed via card")
        else:
            print("Please pay in cash upon delivery")
            
    else:
        print("Invalid payment method!")
        print("Order cancelled")

# Uncomment to run examples:
# atm_machine()
# grade_management()  
# ecommerce_checkout()`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices & Common Pitfalls</h2>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">✅ Best Practices</h3>
                        <ul className="text-green-700 dark:text-green-300 space-y-2">
                            <li>• Use meaningful condition names and avoid complex nested structures</li>
                            <li>• Always handle edge cases (empty strings, None values, invalid input)</li>
                            <li>• Use parentheses to make complex logical expressions clear</li>
                            <li>• Consider using elif instead of multiple separate if statements</li>
                            <li>• Use ternary operators for simple conditional assignments</li>
                            <li>• Validate user input before using it in conditions</li>
                            <li>• Keep conditions readable - break complex logic into functions</li>
                        </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">⚠️ Common Pitfalls</h3>
                        <ul className="text-red-700 dark:text-red-300 space-y-2">
                            <li>• Using assignment (=) instead of comparison (==) in conditions</li>
                            <li>• Forgetting that empty strings, 0, and None are &quot;falsy&quot; values</li>
                            <li>• Not handling case sensitivity in string comparisons</li>
                            <li>• Creating unnecessarily deep nested conditions</li>
                            <li>• Forgetting to use parentheses with complex logical expressions</li>
                            <li>• Not considering all possible execution paths</li>
                        </ul>
                    </div>

                    <CodeBlock code={`# Good practices examples

# ✅ Clear and readable conditions
def check_eligibility(age, has_license, violations):
    """Check if person is eligible to drive"""
    if age >= 18 and has_license and violations < 3:
        return "Eligible to drive"
    elif age < 18:
        return "Too young to drive"
    elif not has_license:
        return "License required"
    else:
        return "Too many violations"

# ✅ Input validation
def get_valid_grade():
    """Get a valid grade from user"""
    while True:
        try:
            grade = float(input("Enter grade (0-100): "))
            if 0 <= grade <= 100:
                return grade
            else:
                print("Grade must be between 0 and 100")
        except ValueError:
            print("Please enter a valid number")

# ✅ Using elif for mutually exclusive conditions
def classify_temperature(temp):
    """Classify temperature into categories"""
    if temp > 35:
        return "Very Hot"
    elif temp > 25:
        return "Hot"
    elif temp > 15:
        return "Warm"
    elif temp > 5:
        return "Cool"
    else:
        return "Cold"

# ❌ Common mistakes to avoid

# Wrong: Using assignment instead of comparison
# if temperature = 25:  # This would cause an error!

# Wrong: Not handling case sensitivity
user_input = "YES"
# if user_input == "yes":  # This would fail!

# Better: Handle case insensitivity
if user_input.lower() == "yes":
    print("User confirmed")

# Wrong: Overly nested conditions
# if condition1:
#     if condition2:
#         if condition3:
#             if condition4:
#                 # Too deeply nested!

# Better: Use logical operators or early returns
if condition1 and condition2 and condition3 and condition4:
    # Clear and readable

# Wrong: Not considering falsy values
name = ""
# if name:  # This would be False for empty string!

# Better: Be explicit about what you're checking
if name and name.strip():  # Check for non-empty after stripping whitespace
    print(f"Hello, {name}")

# ✅ Defensive programming
def safe_divide(a, b):
    """Safely divide two numbers"""
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return "Error: Both inputs must be numbers"
    
    if b == 0:
        return "Error: Cannot divide by zero"
    
    return a / b

# ✅ Clear logical operator precedence
# Use parentheses to make intentions clear
age = 25
has_ticket = True
is_vip = False

# Clear precedence with parentheses
if (age >= 18) and (has_ticket or is_vip):
    print("Can enter the venue")

# ✅ Proper error handling in conditions
def process_user_data(data):
    """Process user data safely"""
    if data is None:
        return "No data provided"
    
    if not isinstance(data, dict):
        return "Data must be a dictionary"
    
    if "name" not in data:
        return "Name field required"
    
    if not data["name"].strip():
        return "Name cannot be empty"
    
    return f"Processing data for {data['name']}"

# Test the function
result1 = process_user_data(None)
result2 = process_user_data({"name": "Alice"})
result3 = process_user_data({"name": ""})

print(result1)  # No data provided
print(result2)  # Processing data for Alice
print(result3)  # Name cannot be empty`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">🎯 Try These Challenges</h3>
                        <div className="text-purple-700 dark:text-purple-300 space-y-3">
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 1: Age Category Classifier</p>
                                <p className="text-sm">Create a program that takes a person&apos;s age and classifies them into categories: Child (0-12), Teenager (13-19), Adult (20-59), Senior (60+)</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 2: Password Strength Checker</p>
                                <p className="text-sm">Build a program that checks password strength based on length, uppercase, lowercase, numbers, and special characters.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 3: Simple Tax Calculator</p>
                                <p className="text-sm">Create a tax calculator with different tax brackets: 0% (0-10k), 10% (10k-40k), 22% (40k-85k), 32% (85k+)</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 4: Rock Paper Scissors Game</p>
                                <p className="text-sm">Implement the classic game with proper win/lose/tie logic and input validation.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-4">
                                <p className="font-medium">Exercise 5: Movie Ticket Pricing</p>
                                <p className="text-sm">Calculate movie ticket prices based on age (child/adult/senior), time (matinee/evening), and day (weekday/weekend).</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ConditionalStatements;