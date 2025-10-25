import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const BasicTypes = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Basic Types
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>Basic types</strong> are the fundamental data types that TypeScript supports. 
                        They provide type safety for the most common JavaScript values and operations.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Primitive Types
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    These are the basic building blocks of TypeScript's type system, corresponding to JavaScript's primitive values.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    String Type
                </h3>
                
                <CodeBlock
                    code={`// String type examples
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = \`\${firstName} \${lastName}\`;

// String methods are available
let message: string = "Hello World";
let upperMessage: string = message.toUpperCase();
let lowerMessage: string = message.toLowerCase();
let messageLength: number = message.length;

// Template literals with type safety
let age: number = 25;
let description: string = \`\${fullName} is \${age} years old\`;`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Number Type
                </h3>
                
                <CodeBlock
                    code={`// Number type examples
let count: number = 42;
let price: number = 19.99;
let percentage: number = 0.15;
let hexValue: number = 0xf00d;
let binaryValue: number = 0b1010;
let octalValue: number = 0o744;

// All JavaScript number operations are available
let sum: number = count + price;
let rounded: number = Math.round(price);
let random: number = Math.random();`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Boolean Type
                </h3>
                
                <CodeBlock
                    code={`// Boolean type examples
let isActive: boolean = true;
let isComplete: boolean = false;
let hasPermission: boolean = true;

// Boolean operations
let canEdit: boolean = isActive && hasPermission;
let shouldShow: boolean = isActive || isComplete;
let isHidden: boolean = !isActive;

// Comparison results are boolean
let isEqual: boolean = (5 === 5);
let isGreater: boolean = (10 > 5);`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Special Types
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Null and Undefined
                </h3>
                
                <CodeBlock
                    code={`// Null and undefined types
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// Variables that might be null or undefined
let optionalString: string | null = null;
let optionalNumber: number | undefined = undefined;

// Common pattern for optional values
function processValue(value: string | null): string {
    if (value === null) {
        return "No value provided";
    }
    return value.toUpperCase();
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Void Type
                </h3>
                
                <CodeBlock
                    code={`// Void type for functions that don't return a value
function logMessage(message: string): void {
    console.log(message);
}

function showAlert(): void {
    alert("Hello World");
}

// Arrow function with void return
const printInfo = (): void => {
    console.log("This function returns nothing");
};`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Any Type
                </h3>
                
                <CodeBlock
                    code={`// Any type - use sparingly!
let dynamicValue: any = 42;
dynamicValue = "Hello";
dynamicValue = true;
dynamicValue = { name: "John" };

// Any disables type checking
let userInput: any = getUserInput();
userInput.foo.bar.baz; // No error, but might crash at runtime

// Better approach with unknown
let userData: unknown = getUserData();
if (typeof userData === 'string') {
    console.log(userData.toUpperCase()); // Safe to use
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Array Types
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Basic Array Types
                </h3>
                
                <CodeBlock
                    code={`// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];
let colors: Array<string> = ["red", "green", "blue"]; // Alternative syntax

// Array of numbers
let scores: number[] = [85, 92, 78, 96];
let temperatures: Array<number> = [20, 25, 30, 15];

// Array of booleans
let flags: boolean[] = [true, false, true];
let permissions: Array<boolean> = [true, true, false];`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Mixed Array Types
                </h3>
                
                <CodeBlock
                    code={`// Union type arrays
let mixedArray: (string | number)[] = ["hello", 42, "world", 100];
let flexibleArray: Array<string | boolean> = ["yes", true, "no", false];

// Array with any type (avoid when possible)
let anyArray: any[] = ["string", 42, true, { name: "John" }];

// Empty array with type annotation
let emptyStrings: string[] = [];
let emptyNumbers: number[] = [];`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Object Types
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Inline Object Types
                </h3>
                
                <CodeBlock
                    code={`// Inline object type
let person: { name: string; age: number; isActive: boolean } = {
    name: "John",
    age: 25,
    isActive: true
};

// Object with optional properties
let user: { 
    name: string; 
    email: string; 
    age?: number; 
    isAdmin?: boolean 
} = {
    name: "Jane",
    email: "jane@example.com"
    // age and isAdmin are optional
};

// Object with readonly properties
let config: { 
    readonly apiUrl: string; 
    readonly timeout: number 
} = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Object with Index Signatures
                </h3>
                
                <CodeBlock
                    code={`// Object with string keys and number values
let scores: { [key: string]: number } = {
    math: 95,
    science: 87,
    english: 92
};

// Object with number keys and string values
let colors: { [key: number]: string } = {
    1: "red",
    2: "green",
    3: "blue"
};

// Flexible object type
let flexible: { [key: string]: any } = {
    name: "John",
    age: 25,
    active: true
};`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Literals
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    String Literals
                </h3>
                
                <CodeBlock
                    code={`// String literal types
let direction: "up" | "down" | "left" | "right" = "up";
let status: "loading" | "success" | "error" = "loading";

// Function with string literal parameter
function move(direction: "up" | "down" | "left" | "right"): void {
    console.log(\`Moving \${direction}\`);
}

move("up");    // Valid
move("north"); // Error: Argument of type '"north"' is not assignable`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Numeric Literals
                </h3>
                
                <CodeBlock
                    code={`// Numeric literal types
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;
let httpStatus: 200 | 404 | 500 = 200;

// Function with numeric literal parameter
function handleResponse(status: 200 | 404 | 500): string {
    switch (status) {
        case 200:
            return "Success";
        case 404:
            return "Not Found";
        case 500:
            return "Server Error";
    }
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Checking Examples
                </h2>

                <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Valid Type Usage</h3>
                        <CodeBlock
                            code={`// All of these are valid
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let scores: number[] = [85, 92, 78];
let person: { name: string; age: number } = { name: "Jane", age: 30 };`}
                        />
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Type Errors</h3>
                        <CodeBlock
                            code={`// These would cause TypeScript errors
let name: string = 25;           // Error: Type 'number' is not assignable to type 'string'
let age: number = "25";          // Error: Type 'string' is not assignable to type 'number'
let isActive: boolean = "true";  // Error: Type 'string' is not assignable to type 'boolean'
let scores: number[] = ["85"];   // Error: Type 'string' is not assignable to type 'number'`}
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Guards and Checking
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    typeof Operator
                </h3>
                
                <CodeBlock
                    code={`// Using typeof for type checking
function processValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // TypeScript knows it's a string
    } else {
        return value.toString(); // TypeScript knows it's a number
    }
}

// Type checking in functions
function logValue(value: unknown): void {
    if (typeof value === "string") {
        console.log(\`String: \${value}\`);
    } else if (typeof value === "number") {
        console.log(\`Number: \${value}\`);
    } else if (typeof value === "boolean") {
        console.log(\`Boolean: \${value}\`);
    }
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Array Type Checking
                </h3>
                
                <CodeBlock
                    code={`// Checking if value is an array
function processArray(value: unknown): string {
    if (Array.isArray(value)) {
        return \`Array with \${value.length} items\`;
    }
    return "Not an array";
}

// Type-safe array operations
function getFirstItem<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[0] : undefined;
}

const numbers = [1, 2, 3];
const firstNumber = getFirstItem(numbers); // Type: number | undefined`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Best Practices for Basic Types
                </h2>

                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Type Safety Tips</h3>
                        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                            <li>Use specific types instead of <code>any</code> when possible</li>
                            <li>Prefer <code>unknown</code> over <code>any</code> for dynamic values</li>
                            <li>Use union types for values that can be one of several types</li>
                            <li>Use literal types for fixed sets of values</li>
                            <li>Always type function parameters and return values</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Common Patterns</h3>
                        <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>Use <code>string | null</code> for optional string values</li>
                            <li>Use <code>number | undefined</code> for optional numbers</li>
                            <li>Use <code>boolean</code> for flags and toggles</li>
                            <li>Use <code>void</code> for functions that don't return values</li>
                            <li>Use <code>never</code> for functions that never return</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Remember:</strong> Basic types are the foundation of TypeScript's type system. 
                        They provide type safety for the most common JavaScript values and help catch errors early in development.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BasicTypes;
