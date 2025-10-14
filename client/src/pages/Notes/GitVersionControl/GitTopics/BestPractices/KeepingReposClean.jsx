import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const KeepingReposClean = () => {
    const corePractices = [
        {
            title: 'Mastering the `.gitignore` File',
            code: `# A sample .gitignore for a Node.js project

# Dependencies
/node_modules

# Build output
/build
/dist

# Log files
*.log
npm-debug.log*

# Environment variables
.env
.env.local

# OS-specific files
.DS_Store
Thumbs.db`,
            explanation: 'The `.gitignore` file is your first and most important tool. It prevents unwanted files like dependencies, logs, build artifacts, and secrets from ever being tracked by Git, keeping your repository lean and focused on source code.'
        },
        {
            title: 'Writing Atomic and Descriptive Commits',
            code: `# BAD ❌
git commit -m "stuff"
git commit -m "fix bug and add feature and update docs"

# GOOD ✅
git commit -m "Fix: Resolve user login authentication error"
git commit -m "Feat: Add user profile page with avatar upload"
git commit -m "Docs: Update installation guide for v2.0"`,
            explanation: 'An atomic commit contains a single, complete logical change. This makes your history easy to read, understand, and debug. Use a consistent format (e.g., Conventional Commits) for your messages.'
        }
    ];

    const historyManagement = [
        {
            title: 'Pruning Stale Branches',
            code: `# Switch to your main branch and pull the latest changes
git checkout main
git pull origin main

# Delete a local branch that has been merged
git branch -d feature/user-login

# Delete a remote branch after it has been merged
git push origin --delete feature/user-login`,
            explanation: 'Repositories can get cluttered with old branches. Regularly deleting branches after they have been merged into your main branch keeps your repository tidy and easy to navigate.'
        },
        {
            title: 'Using Interactive Rebase for Cleanup',
            code: `# Before merging, clean up the last 3 commits on your feature branch
git rebase -i HEAD~3

# This opens an editor where you can 'squash' or 'fixup'
# commits to combine them into a single, clean commit.

# pick 1a2b3c4 Feat: Add basic form structure
# squash 4d5e6f7 Feat: Add form validation
# squash 8g9h0i1 Fix: Correct typo in form label`,
            explanation: 'Interactive rebase is a powerful tool for tidying up your commit history on a feature branch *before* you merge it. You can reword, reorder, and combine commits to present a clean and logical history.'
        }
    ];

    const dos = [
        'Use a comprehensive `.gitignore` from the very beginning of a project.',
        'Write commit messages in the imperative mood (e.g., "Add feature" not "Added feature").',
        'Keep commits small and focused on a single logical change.',
        'Delete local and remote branches after they are successfully merged.',
        'Use tools like Git LFS (Large File Storage) for binary files like images, videos, or datasets.'
    ];

    const donts = [
        'Never commit secrets, API keys, or other sensitive credentials.',
        'Don\'t commit generated code, build artifacts, or package dependencies.',
        'Avoid vague commit messages like "WIP", "fixes", or "changes".',
        'Don\'t force push to shared branches (`main`, `develop`) as it rewrites history.',
        'Avoid making a single, massive commit for an entire feature.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Good Practices:</span> Keeping Repositories Clean
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A Git repository is more than just a code backup—it’s a living document that tells the story of your project. A clean, well-maintained repository is easier to navigate, simpler to debug, and much more welcoming for collaborators. Adopting a few key habits can significantly improve the quality of your project's history.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Treat your repository's history with the same care as your code. A clean history provides context and clarity, making the project more sustainable and professional in the long run.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Cleanup Practices</h2>
                    <div className="space-y-6">
                        {corePractices.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                <CodeBlock code={item.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{item.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Managing History & Branches</h2>
                    <div className="space-y-6">
                        {historyManagement.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                <CodeBlock code={item.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{item.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Do's</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {dos.map((item, index) => (
                                <li key={`do-${index}`} className="text-sm">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Don'ts</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {donts.map((item, index) => (
                                <li key={`dont-${index}`} className="text-sm">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default KeepingReposClean;