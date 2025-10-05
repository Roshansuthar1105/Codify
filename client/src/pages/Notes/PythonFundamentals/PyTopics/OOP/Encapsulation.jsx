import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Encapsulation = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Python <span className='text-primary-600 dark:text-primary-400'>Encapsulation</span>
            </h1>
            
            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Encapsulation is like putting your valuables in a safe. It hides and protects important data from being accidentally changed.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is Encapsulation?</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 dark:text-blue-300">
                            Encapsulation means hiding the internal details and providing controlled access to data.
                        </p>
                    </div>
                    
                    <CodeBlock code={`# Without encapsulation - anyone can change balance
class BadAccount:
    def __init__(self, balance):
        self.balance = balance  # Public - anyone can access

account = BadAccount(1000)
account.balance = -500  # Oops! Negative balance allowed`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Private Attributes (Hidden Data)</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Use double underscore <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">__</code> to make attributes private (hidden).
                    </p>
                    
                    <CodeBlock code={`class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private (hidden)
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
print(account.get_balance())  # 1000 - Works!
# print(account.__balance)    # Error! Cannot access directly`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Controlled Access with Methods</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Create special methods to safely access and modify private data.
                    </p>
                    
                    <CodeBlock code={`class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    def deposit(self, amount):
        if amount > 0:  # Check if amount is valid
            self.__balance += amount
        else:
            print("Amount must be positive!")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Invalid withdrawal!")
    
    def get_balance(self):
        return self.__balance

# Safe usage
account = BankAccount(1000)
account.deposit(500)    # Valid deposit
account.withdraw(200)   # Valid withdrawal
print(account.get_balance())  # 1300`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Public vs Private vs Protected</h2>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Public</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm mb-2">Anyone can access</p>
                            <code className="text-xs bg-green-100 dark:bg-green-800 px-2 py-1 rounded">name</code>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Protected</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">Family can access</p>
                            <code className="text-xs bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">_name</code>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Private</h3>
                            <p className="text-red-700 dark:text-red-300 text-sm mb-2">Only class can access</p>
                            <code className="text-xs bg-red-100 dark:bg-red-800 px-2 py-1 rounded">__name</code>
                        </div>
                    </div>
                    
                    <CodeBlock code={`class Person:
    def __init__(self, name, age, ssn):
        self.name = name        # Public - anyone can see
        self._age = age         # Protected - use carefully
        self.__ssn = ssn        # Private - only this class

person = Person("John", 25, "123-45-6789")
print(person.name)    # Works - public
print(person._age)    # Works but not recommended
# print(person.__ssn) # Error - private`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Property Decorators (Getters & Setters)</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        A cleaner way to control access using <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">@property</code>.
                    </p>
                    
                    <CodeBlock code={`class Circle:
    def __init__(self, radius):
        self.__radius = radius
    
    @property
    def radius(self):  # Getter
        return self.__radius
    
    @radius.setter
    def radius(self, value):  # Setter
        if value > 0:
            self.__radius = value
        else:
            print("Radius must be positive!")
    
    @property
    def area(self):
        return 3.14 * self.__radius ** 2

# Usage like normal attributes
circle = Circle(5)
print(circle.radius)  # 5 (using getter)
print(circle.area)    # 78.5 (calculated)
circle.radius = 10    # Uses setter with validation`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Simple Real-World Example</h2>
                    
                    <CodeBlock code={`class Phone:
    def __init__(self, brand):
        self.brand = brand          # Public
        self._model = "Unknown"     # Protected
        self.__password = "0000"    # Private
    
    def unlock(self, password):
        if password == self.__password:
            return "Phone unlocked!"
        else:
            return "Wrong password!"
    
    def change_password(self, old_pass, new_pass):
        if old_pass == self.__password:
            self.__password = new_pass
            return "Password changed!"
        else:
            return "Wrong old password!"

# Using the phone
my_phone = Phone("iPhone")
print(my_phone.brand)                    # iPhone
print(my_phone.unlock("0000"))           # Phone unlocked!
print(my_phone.change_password("0000", "1234"))  # Password changed!`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Encapsulation?</h2>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <strong>Security:</strong> Protects important data from being changed accidentally
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <strong>Control:</strong> You decide how data can be accessed or modified
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <strong>Validation:</strong> Check if new values are valid before storing
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <strong>Easier maintenance:</strong> Changes inside class don&apos;t affect outside code
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Quick Summary</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">__</code> for private attributes</li>
                        <li>• Create methods to safely access private data</li>
                        <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">@property</code> for cleaner getter/setter methods</li>
                        <li>• Always validate data before storing it</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Encapsulation;