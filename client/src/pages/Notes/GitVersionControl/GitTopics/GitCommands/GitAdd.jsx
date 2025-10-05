import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitAdd = () => {
    const usageExamples = [
        {
            title: 'Adding a Specific File',
            command: 'git add path/to/your/file.js',
            explanation: 'This is the most common and safest use case. It stages only the file you specify, giving you precise control over your next commit.'
        },
        {
            title: 'Adding All Changes in the Current Directory',
            command: 'git add .',
            explanation: 'This command stages all new, modified, and deleted files in the current directory and its subdirectories. It\'s a quick way to stage everything.'
        },
        {
            title: 'Adding All Changes in the Entire Repository',
            command: 'git add -A\n# or\ngit add --all',
            explanation: 'Similar to `git add .`, but it stages all changes in the entire repository, regardless of your current directory. It ensures nothing is missed.'
        },
        {
            title: 'Interactive Staging (Patch Mode)',
            command: 'git add -p\n# or\ngit add --patch',
            explanation: 'A powerful feature that allows you to review changes chunk by chunk and decide whether to stage each one. It\'s perfect for splitting large changes into smaller, logical commits.'
        }
    ];

    const bestPractices = [
        'Be intentional; prefer staging specific files over using `git add .` to avoid accidentally including unwanted changes.',
        'Always review your changes with `git status` or `git diff` before adding them to the staging area.',
        'Use `git add -p` to break down large modifications into smaller, logical chunks for clearer commits.',
        'Create a `.gitignore` file to prevent temporary files, logs, and build artifacts from ever being tracked or staged.'
    ];

    const commonMistakes = [
        'Forgetting to add new files. A new file is untracked by Git until you explicitly `git add` it.',
        'Accidentally staging sensitive information like API keys or passwords.',
        'Using `git add .` blindly and including unwanted changes or temporary files.',
        'Confusing `git add` with `git commit`. Adding a file only stages it; it does not save it to the project history.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Understanding</span> git add
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git add` command is one of the most fundamental and frequently used commands in Git. Its primary job is to move changes from your **Working Directory** to the **Staging Area** (also known as the "index"). The staging area is a crucial intermediate step that lets you carefully craft what will be included in your next commit.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">The Staging Area Analogy: </strong>
                        Think of the staging area as a shopping cart. Your working directory is the store with all its items (your files). You use `git add` to place the specific items you want to buy (your changes) into your cart. The `git commit` command is the final checkout process.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Use `git add`</h2>
                    <div className="space-y-6">
                        {usageExamples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.command} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
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

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover-border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Unstage Changes</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you've accidentally staged a file, you can easily unstage it (remove it from the staging area) without losing your changes. The changes will remain in your working directory.
                        </p>
                        <CodeBlock
                            code={`# To unstage a specific file
git reset HEAD path/to/file.js

# To unstage everything
git reset`}
                            language="bash"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitAdd;