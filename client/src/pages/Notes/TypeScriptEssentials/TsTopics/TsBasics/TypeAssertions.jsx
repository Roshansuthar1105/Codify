import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TypeAssertions = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Type Assertions
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>Type assertions</strong> tell the TypeScript compiler to treat a value as a specific type. 
                        They don't change the runtime value - they only affect type checking at compile time.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    What are Type Assertions?
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Type assertions are a way to tell TypeScript "I know more about this type than you do." 
                    They're useful when you have a value that TypeScript can't properly infer the type of, 
                    but you know what type it should be.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Important:</strong> Type assertions don't perform any runtime checking or conversion. 
                        They only affect TypeScript's type checking. Use them carefully!
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Syntax for Type Assertions
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Angle Bracket Syntax
                </h3>
                
                <CodeBlock
                    code={`// Angle bracket syntax (not recommended in JSX)
let someValue: unknown = "Hello World";
let strLength: number = (<string>someValue).length;

// With objects
let user: unknown = { name: "John", age: 25 };
let userName: string = (<{ name: string; age: number }>user).name;

// With arrays
let items: unknown = [1, 2, 3, 4, 5];
let firstItem: number = (<number[]>items)[0];`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    As Syntax (Recommended)
                </h3>
                
                <CodeBlock
                    code={`// 'as' syntax (recommended)
let someValue: unknown = "Hello World";
let strLength: number = (someValue as string).length;

// With objects
let user: unknown = { name: "John", age: 25 };
let userName: string = (user as { name: string; age: number }).name;

// With arrays
let items: unknown = [1, 2, 3, 4, 5];
let firstItem: number = (items as number[])[0];

// This syntax works better in JSX and is generally preferred`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Common Use Cases
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    DOM Element Access
                </h3>
                
                <CodeBlock
                    code={`// Getting DOM elements
let input = document.getElementById("username") as HTMLInputElement;
input.value = "John Doe";

// Or with angle bracket syntax
let button = <HTMLButtonElement>document.getElementById("submit");
button.addEventListener("click", handleClick);

// Multiple assertions
let canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    API Responses
                </h3>
                
                <CodeBlock
                    code={`// API responses are often typed as 'any' or 'unknown'
interface User {
    id: number;
    name: string;
    email: string;
}

// Fetch API returns unknown
async function fetchUser(id: string): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data as User;  // Assert that the response is a User
}

// With error handling
async function fetchUserSafe(id: string): Promise<User | null> {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        const data = await response.json();
        return data as User;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Working with Union Types
                </h3>
                
                <CodeBlock
                    code={`// When you know the specific type in a union
function processValue(value: string | number) {
    if (typeof value === "string") {
        // TypeScript knows it's a string here
        return value.toUpperCase();
    } else {
        // TypeScript knows it's a number here
        return value.toFixed(2);
    }
}

// Sometimes you need to assert the type
function processValueAssertion(value: string | number) {
    if (typeof value === "string") {
        return (value as string).toUpperCase();
    } else {
        return (value as number).toFixed(2);
    }
}

// With object unions
interface Dog {
    type: "dog";
    breed: string;
}

interface Cat {
    type: "cat";
    color: string;
}

function processAnimal(animal: Dog | Cat) {
    if (animal.type === "dog") {
        return (animal as Dog).breed;
    } else {
        return (animal as Cat).color;
    }
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Assertion Patterns
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Non-null Assertion
                </h3>
                
                <CodeBlock
                    code={`// Non-null assertion operator (!)
let element = document.getElementById("myElement")!;
// Tells TypeScript that the element is definitely not null

// With optional chaining
let value = document.getElementById("input")?.value!;
// Asserts that the value is not undefined

// In functions
function getElement(id: string): HTMLElement {
    return document.getElementById(id)!;
}

// With arrays
let numbers: number[] = [];
let first = numbers[0]!;  // Asserts that the array is not empty`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Const Assertions
                </h3>
                
                <CodeBlock
                    code={`// Const assertions for literal types
let colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

let config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }

// With function return types
function getStatus() {
    return "success" as const;
}
// Return type: "success"`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Type Guards vs Type Assertions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Type Guards (Safer)</h4>
                        <CodeBlock
                            code={`// Type guard - runtime checking
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows it's a string
        return value.toUpperCase();
    }
    return "Not a string";
}`}
                        />
                        <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                            <strong>Benefits:</strong> Runtime safety, better error handling
                        </p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Type Assertions (Faster)</h4>
                        <CodeBlock
                            code={`// Type assertion - no runtime checking
function processValue(value: unknown) {
    // Assumes value is a string
    return (value as string).toUpperCase();
}

// Can cause runtime errors if wrong
let result = processValue(42);  // Runtime error!`}
                        />
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-2">
                            <strong>Risks:</strong> No runtime safety, potential errors
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Advanced Type Assertions
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Assertion Functions
                </h3>
                
                <CodeBlock
                    code={`// Custom assertion function
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Expected string");
    }
}

function processValue(value: unknown) {
    assertIsString(value);  // Throws if not string
    return value.toUpperCase();  // TypeScript knows it's a string
}

// Assertion with return type
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
        throw new Error("Expected number");
    }
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Complex Type Assertions
                </h3>
                
                <CodeBlock
                    code={`// Asserting complex object types
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

// Asserting API response
async function fetchUser(id: string): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    
    // Assert the entire response structure
    const apiResponse = data as ApiResponse<User>;
    return apiResponse.data;
}

// Asserting array types
function processItems(items: unknown): number[] {
    return (items as number[]).filter(n => typeof n === "number");
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Best Practices
                </h2>

                <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ Do's</h3>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1">
                            <li>Use type assertions when you're certain about the type</li>
                            <li>Prefer type guards over assertions when possible</li>
                            <li>Use the 'as' syntax instead of angle brackets</li>
                            <li>Add runtime checks when using assertions</li>
                            <li>Document why you're using a type assertion</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">❌ Don'ts</h3>
                        <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                            <li>Don't use assertions to bypass type checking</li>
                            <li>Avoid assertions when type guards would work</li>
                            <li>Don't assert types without being certain</li>
                            <li>Avoid using 'any' with assertions</li>
                            <li>Don't use assertions as a quick fix for type errors</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Common Pitfalls
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Runtime Errors
                </h3>
                
                <CodeBlock
                    code={`// This will cause a runtime error
let value: unknown = 42;
let str: string = value as string;
console.log(str.toUpperCase());  // Runtime error: toUpperCase is not a function

// Better approach with type checking
let value: unknown = 42;
if (typeof value === "string") {
    let str: string = value;
    console.log(str.toUpperCase());  // Safe
} else {
    console.log("Value is not a string");
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Overuse of Assertions
                </h3>
                
                <CodeBlock
                    code={`// Don't overuse assertions
function badExample(data: unknown) {
    let user = data as { name: string; age: number };
    let name = user.name as string;
    let age = user.age as number;
    return { name, age };
}

// Better: Use proper typing
interface User {
    name: string;
    age: number;
}

function goodExample(data: unknown): User | null {
    if (typeof data === "object" && data !== null) {
        const user = data as User;
        if (typeof user.name === "string" && typeof user.age === "number") {
            return user;
        }
    }
    return null;
}`}
                />

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Remember:</strong> Type assertions are a powerful tool, but they should be used carefully. 
                        They don't provide runtime safety, so always consider whether a type guard or proper type checking would be more appropriate.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TypeAssertions;
