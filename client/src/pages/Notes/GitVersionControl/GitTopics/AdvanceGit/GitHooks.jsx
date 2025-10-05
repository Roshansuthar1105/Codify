import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitHooks = () => {
    const commonHooks = [
        {
            name: 'pre-commit',
            type: 'Client-Side',
            description: 'This hook is run first, before you even type in a commit message. It’s used to inspect the snapshot that’s about to be committed.',
            use_cases: 'Run linters (ESLint, Prettier), run fast unit tests, check for code style violations. If the script exits non-zero, the commit is aborted.'
        },
        {
            name: 'prepare-commit-msg',
            type: 'Client-Side',
            description: 'This hook runs before the commit message editor is fired up but after the default message is created. It lets you edit the default message programmatically.',
            use_cases: 'Automatically insert a ticket/issue number from the branch name into the commit message.'
        },
        {
            name: 'commit-msg',
            type: 'Client-Side',
            description: 'This hook takes one argument: the path to a temporary file that contains the commit message. It runs after you close the commit message editor.',
            use_cases: 'Validate that the commit message follows a required pattern (e.g., Conventional Commits). Aborts the commit if the message is invalid.'
        },
        {
            name: 'post-commit',
            type: 'Client-Side',
            description: 'This hook runs after the commit is made. It doesn’t take any parameters and its exit status doesn’t affect the commit in any way.',
            use_cases: 'Sending notifications, triggering a local build, or updating documentation files.'
        },
        {
            name: 'pre-receive',
            type: 'Server-Side',
            description: 'This is the first script to run when handling a push from a client. It runs on the remote repository before any references are updated.',
            use_cases: 'Enforce project policies like preventing force pushes, ensuring commit messages meet standards, or blocking pushes that don\'t pass integration tests.'
        }
    ];

    const practicalExample = {
        title: 'Example: A Simple `pre-commit` Hook',
        explanation: 'This shell script will run your project\'s tests. If any test fails, the script will exit with a non-zero status, which tells Git to abort the commit.',
        code: `#!/bin/sh

# Navigate to the project root
cd "$(git rev-parse --show-toplevel)"

echo "Running tests before commit..."

# Run the test command
npm test

# Check the exit code of the last command
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1 # Exit with a non-zero status to abort the commit
fi

echo "All tests passed. Proceeding with commit."
exit 0 # Exit with zero to allow the commit
`
    };

    const bestPractices = [
        'Keep hooks fast. Slow hooks can frustrate developers and discourage their use.',
        'Hooks are not versioned with your project. Use tools like Husky to share hooks across your team.',
        'Provide clear, actionable error messages when a hook fails.',
        'Remember that users can bypass client-side hooks with `git commit --no-verify`.',
        'Write hooks in a language that is common and accessible to your team (Shell, Node.js, Python).'
    ];

    const commonMistakes = [
        'Forgetting to make the hook script executable (`chmod +x .git/hooks/pre-commit`).',
        'Assuming a specific environment or dependency is installed on every developer\'s machine.',
        'Writing overly complex logic inside a hook instead of calling a dedicated script in your project.',
        'Not accounting for different operating systems (e.g., Windows vs. macOS/Linux).',
        'Relying solely on client-side hooks for policy enforcement; critical checks should be server-side.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Hooks:</span> Automating Your Workflow
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Git hooks are custom scripts that Git executes automatically before or after key events such as `commit`, `push`, and `receive`. They are a powerful feature for automating tasks, enforcing policies, and customizing your workflow. Hooks are stored in the `.git/hooks` directory of every repository but are not versioned with the project itself.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Git hooks act as event listeners for your repository. By writing a script and giving it the correct filename, you can "hook into" a specific moment in the Git lifecycle to run your own custom logic.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Commonly Used Hooks</h2>
                    <div className="space-y-6">
                        {commonHooks.map((hook, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{hook.name}</h3>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${hook.type === 'Client-Side' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}>
                                        {hook.type}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{hook.description}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong className="font-semibold text-gray-700 dark:text-gray-300">Use Cases:</strong> {hook.use_cases}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Implement a Hook</h2>
                     <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            To enable a hook, navigate to your repository's `.git/hooks` directory. You'll see a number of sample files (e.g., `pre-commit.sample`). To activate a hook, simply rename the file by removing the `.sample` extension. Then, make the file executable and fill it with your script.
                        </p>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{practicalExample.title}</h3>
                        <CodeBlock code={practicalExample.code} language="bash" />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{practicalExample.explanation}</p>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm">{practice}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHooks;