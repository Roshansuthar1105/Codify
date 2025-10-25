import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TypeInference = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Type Inference
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>Type inference</strong> is TypeScript's ability to automatically determine the type of a variable, 
                        function parameter, or return value based on the context and usage. It reduces the need for explicit type annotations.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    How Type Inference Works
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    TypeScript analyzes your code and automatically assigns types based on:
                </p>

                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
                    <li>The value assigned to a variable</li>
                    <li>The context in which a variable is used</li>
                    <li>The return statements in functions</li>
                    <li>The parameters passed to functions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Variable Type Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript infers the type from the value
let name = "John";           // Type: string
let age = 25;                // Type: number
let isActive = true;         // Type: boolean
let scores = [85, 92, 78];   // Type: number[]

// TypeScript infers the most specific type possible
let message = "Hello";       // Type: "Hello" (string literal)
let count = 42;              // Type: 42 (numeric literal)

// Arrays are inferred with their element type
let colors = ["red", "green", "blue"];  // Type: string[]
let numbers = [1, 2, 3, 4];             // Type: number[]`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Object Type Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript infers object structure
let person = {
    name: "John",
    age: 25,
    isActive: true
};
// Type: { name: string; age: number; isActive: boolean }

// Nested objects are also inferred
let user = {
    id: 1,
    profile: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com"
    },
    preferences: {
        theme: "dark",
        notifications: true
    }
};
// Type: { id: number; profile: { firstName: string; lastName: string; email: string }; preferences: { theme: string; notifications: boolean } }`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Function Type Inference
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Return Type Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript infers return type from the return statement
function add(a: number, b: number) {
    return a + b;  // TypeScript infers return type as 'number'
}

function greet(name: string) {
    return \`Hello, \${name}!\`;  // TypeScript infers return type as 'string'
}

// Arrow functions also have return type inference
const multiply = (a: number, b: number) => a * b;  // Return type: number
const formatName = (first: string, last: string) => \`\${first} \${last}\`;  // Return type: string`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Parameter Type Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript can infer parameter types in some contexts
function processItems(items) {
    // TypeScript infers 'items' as 'any[]' if no type annotation
    return items.map(item => item.toString());
}

// Better: explicit parameter types
function processItems(items: unknown[]) {
    return items.map(item => String(item));
}

// Contextual typing in callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);  // TypeScript infers 'n' as 'number'`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Advanced Type Inference
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Best Common Type
                </h3>
                
                <CodeBlock
                    code={`// TypeScript finds the best common type
let values = [0, 1, "hello"];  // Type: (string | number)[]
let mixed = [true, "world", 42];  // Type: (string | number | boolean)[]

// When no common type exists, TypeScript uses union types
let items = [1, "hello", true, { name: "John" }];  // Type: (string | number | boolean | { name: string })[]

// Explicit typing can help
let numbers: number[] = [1, 2, 3];  // Type: number[]
let strings: string[] = ["a", "b", "c"];  // Type: string[]`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Contextual Typing
                </h3>
                
                <CodeBlock
                    code={`// TypeScript uses context to infer types
window.onmousedown = function(mouseEvent) {
    // TypeScript knows mouseEvent is MouseEvent
    console.log(mouseEvent.button);  // No error
};

// Array methods provide context
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);  // TypeScript infers 'n' as 'number'

// Event handlers get proper typing
document.addEventListener('click', (event) => {
    // TypeScript knows event is MouseEvent
    console.log(event.clientX, event.clientY);
});`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Inference vs Explicit Types
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Type Inference</h4>
                        <CodeBlock
                            code={`// Let TypeScript infer the type
let name = "John";
let age = 25;
let isActive = true;

function add(a: number, b: number) {
    return a + b;
}`}
                        />
                        <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                            <strong>Benefits:</strong> Less verbose, easier to maintain, type safety preserved
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📝 Explicit Types</h4>
                        <CodeBlock
                            code={`// Explicit type annotations
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

function add(a: number, b: number): number {
    return a + b;
}`}
                        />
                        <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
                            <strong>Benefits:</strong> More explicit, better documentation, clearer intent
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    When to Use Explicit Types
                </h2>

                <div className="space-y-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Use Explicit Types When:</h3>
                        <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>TypeScript can't infer the correct type</li>
                            <li>You want to be more explicit about your intentions</li>
                            <li>Working with complex types or generics</li>
                            <li>Creating public APIs or libraries</li>
                            <li>Type inference results in a broader type than you want</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Let TypeScript Infer When:</h3>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1">
                            <li>The type is obvious from the context</li>
                            <li>You want to keep code concise</li>
                            <li>Type inference gives you the exact type you want</li>
                            <li>Working with simple, straightforward code</li>
                            <li>Type inference provides better type safety</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Inference Examples
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Array Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript infers array types
let numbers = [1, 2, 3];           // Type: number[]
let strings = ["a", "b", "c"];     // Type: string[]
let mixed = [1, "hello", true];    // Type: (string | number | boolean)[]

// Empty arrays need explicit typing
let emptyNumbers: number[] = [];
let emptyStrings: string[] = [];

// Array methods preserve type inference
let doubled = numbers.map(n => n * 2);        // Type: number[]
let uppercased = strings.map(s => s.toUpperCase());  // Type: string[]`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Object Inference
                </h3>
                
                <CodeBlock
                    code={`// TypeScript infers object structure
let config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};
// Type: { apiUrl: string; timeout: number; retries: number }

// Nested objects
let user = {
    id: 1,
    name: "John",
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345"
    }
};
// Type: { id: number; name: string; address: { street: string; city: string; zipCode: string } }`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Function Inference
                </h3>
                
                <CodeBlock
                    code={`// Return type inference
function createUser(name: string, age: number) {
    return {
        name,
        age,
        isActive: true
    };
}
// Return type: { name: string; age: number; isActive: boolean }

// Parameter inference in callbacks
const users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 }
];

const names = users.map(user => user.name);  // Type: string[]
const adults = users.filter(user => user.age >= 18);  // Type: { name: string; age: number }[]`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Inference Best Practices
                </h2>

                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">✅ Do's</h3>
                        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                            <li>Let TypeScript infer simple types when obvious</li>
                            <li>Use explicit types for function parameters and return values</li>
                            <li>Add explicit types when inference is too broad</li>
                            <li>Use type assertions when you know more than TypeScript</li>
                            <li>Trust TypeScript's inference for most cases</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Don'ts</h3>
                        <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                            <li>Don't over-annotate obvious types</li>
                            <li>Avoid using <code>any</code> to bypass inference</li>
                            <li>Don't ignore TypeScript's inference warnings</li>
                            <li>Avoid type assertions unless necessary</li>
                            <li>Don't fight TypeScript's inference unnecessarily</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Debugging Type Inference
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Using Type Queries
                </h3>
                
                <CodeBlock
                    code={`// Use 'typeof' to see inferred types
let name = "John";
let age = 25;
let isActive = true;

// In your IDE, hover over these variables to see their types
// name: string
// age: number
// isActive: boolean

// You can also use type queries in code
type NameType = typeof name;  // string
type AgeType = typeof age;    // number
type ActiveType = typeof isActive;  // boolean`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Type Inference Debugging
                </h3>
                
                <CodeBlock
                    code={`// When TypeScript can't infer the type you want
let items = [];  // Type: any[]
// Better:
let items: string[] = [];  // Type: string[]

// When inference is too broad
let value = Math.random() > 0.5 ? "hello" : 42;  // Type: string | number
// If you want it to be more specific:
let value: string | number = Math.random() > 0.5 ? "hello" : 42;`}
                />

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Tip:</strong> Type inference is one of TypeScript's most powerful features. 
                        It provides type safety with minimal code, but don't hesitate to add explicit types when they make your code clearer or more maintainable.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TypeInference;
