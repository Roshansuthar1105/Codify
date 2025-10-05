import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitBranches = () => {
    const whyUseBranches = [
        {
            title: 'Safe Isolation',
            description: 'Work on new features or bug fixes without affecting the stable, main version of your project. The main branch remains clean and deployable.'
        },
        {
            title: 'Experimentation',
            description: 'Try out new ideas freely. If an idea doesn\'t work out, you can simply discard the branch without any impact on the rest of the project.'
        },
        {
            title: 'Parallel Development',
            description: 'Multiple developers can work on different features simultaneously, each on their own branch, preventing conflicts and stepping on each other\'s toes.'
        },
        {
            title: 'Organized Workflow',
            description: 'Branches help organize the history of your project. It becomes easy to see which commits belong to which feature or bug fix.'
        }
    ];

    const bestPractices = [
        'Use descriptive names like `feature/user-auth` or `bugfix/login-error`.',
        'Always create new branches from the main, up-to-date branch (e.g., `main`).',
        'Keep branches focused on a single task or feature.',
        'Commit your changes frequently with clear messages.',
        'Delete branches after they have been successfully merged.',
        'Regularly update your feature branch with the latest changes from `main`.'
    ];

    const commonMistakes = [
        'Committing directly to the `main` branch by accident.',
        'Forgetting to switch to the new branch after creating it with `git branch`.',
        'Creating a new branch from another feature branch instead of `main`.',
        'Letting a branch diverge too much from `main`, leading to difficult merges.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Working with</span> Git Branches
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Branches are one of the most powerful features in Git. A branch is essentially an independent line of development. It acts as a movable pointer to a specific commit. Using branches allows you to work on different features in parallel without affecting the main codebase, providing a safe and organized way to manage your project's evolution.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Analogy: </strong>
                        Think of the `main` branch as the official timeline of your project. Creating a new branch is like creating an alternate timeline where you can experiment safely. Once you're happy with your changes, you can merge this alternate timeline back into the official one.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Branches?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whyUseBranches.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Branching Commands</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git branch`: List & Create</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                This command is used to list all existing branches or create a new one. The active branch is marked with an asterisk (*).
                            </p>
                            <CodeBlock language="bash" code={`# List all local branches
git branch

# Create a new branch called "new-feature"
# Note: This does NOT switch you to the new branch
git branch new-feature`} />
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git checkout -b`: Create & Switch (The Shortcut)</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                This is the most common command you'll use. It combines creating a new branch and switching to it in a single step.
                            </p>
                            <CodeBlock language="bash" code={`# Create a new branch called "another-feature" AND switch to it
git checkout -b another-feature

# This is the same as running these two commands:
# git branch another-feature
# git checkout another-feature`} />
                        </div>
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

export default GitBranches;