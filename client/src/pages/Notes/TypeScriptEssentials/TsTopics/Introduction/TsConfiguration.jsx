import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TsConfiguration = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    TypeScript Configuration
                </h1>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 dark:text-blue-200">
                        <strong>tsconfig.json</strong> is the configuration file that controls how TypeScript compiles your code. 
                        Understanding its options is crucial for effective TypeScript development.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Creating tsconfig.json
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You can create a <code>tsconfig.json</code> file manually or use the TypeScript compiler to generate one with default settings.
                </p>

                <CodeBlock
                    code={`# Generate default tsconfig.json
npx tsc --init

# This creates a tsconfig.json with all options commented out`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Basic Configuration
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Minimal tsconfig.json
                </h3>

                <CodeBlock
                    code={`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Essential Compiler Options
                </h2>

                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Target & Module</h3>
                        <CodeBlock
                            code={`{
  "target": "ES2020",        // JavaScript version to compile to
  "module": "commonjs",      // Module system (commonjs, es2015, esnext)
  "lib": ["ES2020", "DOM"]   // Library files to include
}`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            <strong>target:</strong> Specifies the JavaScript version for the output. 
                            <strong>module:</strong> Defines the module system for the compiled code.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Output Configuration</h3>
                        <CodeBlock
                            code={`{
  "outDir": "./dist",        // Output directory for compiled files
  "rootDir": "./src",        // Root directory of source files
  "declaration": true,       // Generate .d.ts files
  "declarationMap": true,    // Generate source maps for declarations
  "sourceMap": true          // Generate source maps for debugging
}`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            Controls where compiled files are placed and what additional files are generated.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Strict Type Checking</h3>
                        <CodeBlock
                            code={`{
  "strict": true,                    // Enable all strict type checking options
  "noImplicitAny": true,            // Error on expressions with implied 'any' type
  "strictNullChecks": true,         // Enable strict null checks
  "strictFunctionTypes": true,      // Enable strict checking of function types
  "noImplicitReturns": true,        // Error when not all code paths return a value
  "noFallthroughCasesInSwitch": true // Error on fallthrough cases in switch statements
}`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            These options provide the strictest type checking for maximum type safety.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Project Structure Options
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Include and Exclude
                </h3>

                <CodeBlock
                    code={`{
  "include": [
    "src/**/*",           // Include all files in src directory
    "tests/**/*"          // Include test files
  ],
  "exclude": [
    "node_modules",       // Exclude node_modules
    "dist",              // Exclude build output
    "**/*.test.ts"       // Exclude test files (if using separate config)
  ]
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Files Option
                </h3>

                <CodeBlock
                    code={`{
  "files": [
    "src/index.ts",      // Explicitly list files to compile
    "src/utils.ts"
  ]
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Advanced Configuration Options
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Module Resolution</h4>
                        <CodeBlock
                            code={`{
  "moduleResolution": "node",
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"],
    "@/components/*": ["src/components/*"]
  }
}`}
                        />
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Experimental Features</h4>
                        <CodeBlock
                            code={`{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "jsx": "react-jsx"
}`}
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Environment-Specific Configurations
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Development Configuration
                </h3>

                <CodeBlock
                    code={`// tsconfig.dev.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": false,
    "removeComments": false
  },
  "include": ["src/**/*", "tests/**/*"]
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Production Configuration
                </h3>

                <CodeBlock
                    code={`// tsconfig.prod.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declaration": true
  },
  "exclude": ["tests/**/*", "**/*.test.ts"]
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Common Configuration Patterns
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Node.js Project
                </h3>

                <CodeBlock
                    code={`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`}
                />

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    React Project
                </h3>

                <CodeBlock
                    code={`{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Configuration Validation
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                    Checking Your Configuration
                </h3>

                <CodeBlock
                    code={`# Validate tsconfig.json
npx tsc --noEmit

# Show configuration
npx tsc --showConfig

# List all files that would be compiled
npx tsc --listFiles`}
                />

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                    Best Practices
                </h2>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Configuration Tips:</h3>
                    <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1">
                        <li>Start with <code>strict: true</code> for new projects</li>
                        <li>Use <code>baseUrl</code> and <code>paths</code> for clean imports</li>
                        <li>Enable <code>sourceMap</code> for debugging</li>
                        <li>Use <code>skipLibCheck</code> to speed up compilation</li>
                        <li>Create separate configs for different environments</li>
                        <li>Exclude unnecessary files to improve performance</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Remember:</strong> TypeScript configuration is project-specific. 
                        Choose options that match your project's needs and team preferences.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TsConfiguration;
