import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitCheckoutVsRestore = () => {
    const commands = [
        {
            name: 'git checkout',
            description: 'Historically, <code>git checkout</code> was an overloaded command used for both switching branches and restoring files from a specific commit. This dual-purpose nature could often be confusing.',
            useCases: [
                {
                    title: 'Switching Branches (Primary Modern Use)',
                    code: `# Switch to an existing branch
git checkout feature-branch

# Create and switch to a new branch
git checkout -b new-feature`,
                    explanation: 'This is the most common and accepted use of `checkout` today, although <code>git switch</code> is now preferred for this.'
                },
                {
                    title: 'Restoring Files (Legacy Method)',
                    code: `# Discard changes in a specific file in the working directory
git checkout -- src/main.js`,
                    explanation: 'This syntax tells Git to replace the file in your working directory with the version from the current branch (`HEAD`). This is now better handled by <code>git restore</code>.'
                }
            ]
        },
        {
            name: 'git switch',
            description: 'Introduced in Git 2.23, <code>git switch</code> is a dedicated command for one thing: changing your `HEAD` pointer to a different branch. It makes branch operations safer and more explicit.',
            useCases: [
                {
                    title: 'Switching Branches',
                    code: `# Switch to an existing branch
git switch main`,
                    explanation: 'A clear and direct way to move between branches.'
                },
                {
                    title: 'Creating and Switching Branches',
                    code: `# Create and switch to a new branch
git switch -c new-feature-branch`,
                    explanation: 'The `-c` flag stands for "create", making the intent obvious.'
                }
            ]
        },
        {
            name: 'git restore',
            description: 'Also introduced in Git 2.23, <code>git restore</code> is a dedicated command for undoing changes to files in your working directory or for unstaging files.',
            useCases: [
                {
                    title: 'Discarding Changes in the Working Directory',
                    code: `# Discard all changes in a file since the last commit
git restore src/app.component.ts`,
                    explanation: 'This reverts the file to its state as it was in the last commit (`HEAD`).'
                },
                {
                    title: 'Unstaging Files',
                    code: `# Move a file from the staging area back to the working directory
git restore --staged src/app.component.ts`,
                    explanation: 'This is the modern equivalent of the old `git reset HEAD <file>` command.'
                }
            ]
        }
    ];

    const comparison = [
        {
            aspect: 'Primary Purpose',
            checkout: 'Historically: Switch branches AND restore files. Modern: Primarily for switching branches.',
            restore: 'Strictly for restoring files (discarding changes or unstaging).',
            switchCmd: 'Strictly for switching branches.'
        },
        {
            aspect: 'Scope',
            checkout: 'Can affect `HEAD`, the staging area, and the working directory.',
            restore: 'Affects the working directory or the staging area.',
            switchCmd: 'Affects `HEAD` (which branch you are on).'
        },
        {
            aspect: 'Clarity',
            checkout: 'Can be ambiguous. Does `git checkout dev` switch a branch or restore a file named `dev`?',
            restore: 'Unambiguous. Always deals with file state.',
            switchCmd: 'Unambiguous. Always deals with branches.'
        },
        {
            aspect: 'Safety',
            checkout: 'Less safe. A typo could lead to discarding file changes instead of switching a branch.',
            restore: 'Safer, as its purpose is explicit.',
            switchCmd: 'Safer, as its purpose is explicit.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span>: Checkout vs. Restore & Switch
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    For a long time, the <code>git checkout</code> command was a multi-tool, handling everything from switching branches to restoring files. To improve clarity and safety, Git version 2.23 introduced two new commands, <code>git switch</code> and <code>git restore</code>, to separate these responsibilities. Understanding this separation is key to a modern, safer Git workflow.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Insight: </strong>
                        Think of it this way: `switch` is for moving your location (changing branches), while `restore` is for cleaning up your workspace (discarding file changes). `checkout` is the old tool that did both.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Commands Explained</h2>
                    <div className="space-y-6">
                        {commands.map((cmd) => (
                            <div key={cmd.name} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3 font-mono">{cmd.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{cmd.description}</p>
                                {cmd.useCases.map((useCase, index) => (
                                    <div key={index} className="mt-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{useCase.title}</h4>
                                        <CodeBlock code={useCase.code} language="bash" />
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{useCase.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Side-by-Side Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Checkout (Legacy)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Switch</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Restore</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparison.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{item.aspect}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.checkout}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.switchCmd}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.restore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="mt-8 bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Modern Workflow Recommendation</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        For cleaner and less error-prone Git usage, adopt the new commands:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li><strong>To switch or create branches:</strong> Use <code>git switch</code>.</li>
                        <li><strong>To unstage a file:</strong> Use `git restore --staged &lt;file&gt;`.</li>
                        <li><strong>To discard changes to a file in your working directory:</strong> Use `git restore &lt;file&gt;`.</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300">
                        While <code>git checkout</code> still works for backward compatibility, consciously using `switch` and `restore` will make your actions more explicit and your version control history easier to manage.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GitCheckoutVsRestore;