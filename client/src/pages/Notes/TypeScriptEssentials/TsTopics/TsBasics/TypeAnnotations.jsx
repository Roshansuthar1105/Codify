import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TypeAnnotations = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Type Annotations
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>Type annotations</strong> are explicit type declarations that tell TypeScript what type a variable, 
                        function parameter, or return value should be. They help catch errors and provide better IDE support.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Variable Type Annotations
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You can add type annotations to variables using a colon followed by the type.
                </p>

                <CodeBlock
                    code={`// Basic type annotations
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3, 4, 5];

// You can also use const with type annotations
const PI: number = 3.14159;
const colors: string[] = ["red", "green", "blue"];`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    When to Use Variable Annotations
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Use type annotations when:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        <li>TypeScript can't infer the type correctly</li>
                        <li>You want to be explicit about the expected type</li>
                        <li>Working with complex types or generics</li>
                        <li>Documenting code for other developers</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Function Type Annotations
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Parameter Types
                </h3>
                
                <CodeBlock
                    code={`// Function with typed parameters
function greet(name: string, age: number): string {
    return \`Hello \${name}, you are \${age} years old\`;
}

// Arrow function with types
const calculateArea = (length: number, width: number): number => {
    return length * width;
};

// Function with optional parameters
function createUser(name: string, email: string, age?: number): object {
    return {
        name,
        email,
        age: age || 0
    };
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Return Type Annotations
                </h3>
                
                <CodeBlock
                    code={`// Explicit return type
function add(a: number, b: number): number {
    return a + b;
}

// Function that returns void
function logMessage(message: string): void {
    console.log(message);
}

// Function that returns an array
function getNumbers(): number[] {
    return [1, 2, 3, 4, 5];
}

// Function that returns a promise
async function fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Object Type Annotations
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Inline Object Types
                </h3>
                
                <CodeBlock
                    code={`// Inline object type annotation
const person: { name: string; age: number; isActive: boolean } = {
    name: "John",
    age: 25,
    isActive: true
};

// Object with optional properties
const user: { 
    name: string; 
    email: string; 
    age?: number; 
    isAdmin?: boolean 
} = {
    name: "Jane",
    email: "jane@example.com"
    // age and isAdmin are optional
};`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Array Type Annotations
                </h3>
                
                <CodeBlock
                    code={`// Array of strings
const names: string[] = ["Alice", "Bob", "Charlie"];

// Array of numbers
const scores: number[] = [85, 92, 78, 96];

// Array of objects
const users: { name: string; age: number }[] = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 }
];

// Alternative array syntax
const colors: Array<string> = ["red", "green", "blue"];`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Advanced Type Annotations
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Union Types
                </h3>
                
                <CodeBlock
                    code={`// Variable that can be string or number
let id: string | number = "abc123";
id = 123; // This is also valid

// Function parameter with union type
function formatId(id: string | number): string {
    return \`ID: \${id}\`;
}

// Array with union types
const mixedArray: (string | number)[] = ["hello", 42, "world", 100];`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Function Types
                </h3>
                
                <CodeBlock
                    code={`// Function type annotation
let mathOperation: (a: number, b: number) => number;

// Assign a function to the variable
mathOperation = (a, b) => a + b;

// Function that takes a function as parameter
function processNumbers(
    numbers: number[], 
    operation: (num: number) => number
): number[] {
    return numbers.map(operation);
}

// Usage
const doubled = processNumbers([1, 2, 3], (num) => num * 2);`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Annotation Best Practices
                </h2>

                <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Do's</h3>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1">
                            <li>Use explicit types for function parameters and return values</li>
                            <li>Add types for complex objects and interfaces</li>
                            <li>Use union types when a variable can have multiple types</li>
                            <li>Be explicit with array types: <code>string[]</code> not <code>any[]</code></li>
                            <li>Use type annotations for public API functions</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Don'ts</h3>
                        <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                            <li>Don't over-annotate simple variables where type is obvious</li>
                            <li>Avoid using <code>any</code> type unless absolutely necessary</li>
                            <li>Don't annotate variables when TypeScript can infer the type</li>
                            <li>Avoid redundant annotations: <code>let x: number = 5</code> (inference is enough)</li>
                            <li>Don't use type assertions as a substitute for proper typing</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Common Type Annotation Patterns
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Event Handlers
                </h3>
                
                <CodeBlock
                    code={`// React event handler
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('Button clicked');
};

// DOM event handler
const handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
};`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    API Responses
                </h3>
                
                <CodeBlock
                    code={`// API response type
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// Usage with type annotation
const fetchUser = async (id: string): Promise<ApiResponse<User>> => {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
};`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Generic Functions
                </h3>
                
                <CodeBlock
                    code={`// Generic function with type annotation
function identity<T>(arg: T): T {
    return arg;
}

// Usage with explicit type
const result: string = identity<string>("hello");
const number: number = identity<number>(42);`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Annotation vs Type Inference
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Explicit Annotations</h4>
                        <CodeBlock
                            code={`// Explicit type annotation
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            <strong>Use when:</strong> Type is not obvious or you want to be explicit
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Type Inference</h4>
                        <CodeBlock
                            code={`// TypeScript infers the types
let name = "John";        // string
let age = 25;             // number
let isActive = true;      // boolean`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            <strong>Use when:</strong> Type is obvious from the value
                        </p>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Tip:</strong> Start with type inference and add explicit annotations only when necessary. 
                        TypeScript's inference is very good and reduces code verbosity while maintaining type safety.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TypeAnnotations;
