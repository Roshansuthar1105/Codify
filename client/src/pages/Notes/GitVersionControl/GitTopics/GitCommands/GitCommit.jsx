import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitCommit = () => {
    const commitAnatomy = [
        {
            part: 'A Unique Hash (ID)',
            description: 'A 40-character SHA-1 hash (e.g., `1a410ef95287b6424b7b2a75b24851214e21a196`). This is the unique identifier for the commit, ensuring its integrity.'
        },
        {
            part: 'Author & Committer Info',
            description: 'The name, email, and timestamp of the person who originally wrote the code and the person who committed it. Usually, these are the same.'
        },
        {
            part: 'The Commit Message',
            description: 'A human-readable description explaining the purpose of the changes. This is crucial for understanding the project\'s history.'
        },
        {
            part: 'Pointer to Parent(s)',
            description: 'A reference to the hash of the preceding commit(s). This is what links the commits together to form a chronological chain or history.'
        }
    ];

    const bestPractices = [
        'Use the imperative mood in the subject line (e.g., "Add feature" not "Added feature")',
        'Keep the subject line short (around 50 characters)',
        'Separate the subject from the body with a blank line',
        'Use the body to explain the "what" and "why," not the "how"',
        'Wrap the body at around 72 characters for readability'
    ];

    const commonMistakes = [
        'Writing vague messages like "Fixed bugs" or "stuff"',
        'Mixing unrelated changes into a single commit',
        'Committing commented-out code or debugging statements',
        'Forgetting to run tests before committing',
        'Committing large, generated files (like build artifacts) that don\'t belong in the repo'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Understanding</span> Git Commits
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `commit` is the fundamental unit in Git. It's a snapshot of your entire project's tracked files at a specific point in time. Every time you save your work in Git, you are creating a commit. Understanding how commits work is the key to mastering Git and managing your project's history effectively.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        A commit is not a "diff" or a set of changes; it's a complete snapshot. Git is smart enough to store this efficiently, so it doesn't waste space by duplicating unchanged files.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Anatomy of a Commit</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {commitAnatomy.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.part}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Three Stages: From Change to Commit</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        Before a file change becomes part of a commit, it passes through three stages. This process gives you precise control over what gets saved in your project's history.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <CodeBlock
                            code={`
    [ 1. Working Directory ]      <-- Your local project files. You modify them here.
               |
               | (You run 'git add <file>...')
               v
    [ 2. Staging Area (Index) ]   <-- A "drafting" area. You add finished changes here
               |                      to prepare for the next snapshot.
               |
               | (You run 'git commit'...)
               v
    [ 3. Repository (.git dir) ]  <-- The permanent home. Git creates a commit with the
                                      staged files and stores it forever in history.`}
                            language="text"
                        />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Writing Good Commit Messages</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        A commit message is a communication tool for your future self and your team. A clear, concise message makes your project history valuable and easy to navigate.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                {bestPractices.map((practice, index) => (
                                    <li key={`best-${index}`} className="text-sm">{practice}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                {commonMistakes.map((mistake, index) => (
                                    <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                 <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Example Commands</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Staging and Committing</h3>
                            <CodeBlock 
                                code={`# 1. Stage a specific file for the next commit
git add components/Navbar.js

# 2. Stage all modified and new files in the current directory
git add .

# 3. Commit the staged changes with a short message
git commit -m "Feat: Add user authentication link to navbar"

# 4. Commit with a more detailed message (opens your text editor)
git commit`}
                                language="bash"
                            />
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Viewing History</h3>
                            <CodeBlock 
                                code={`# See a log of all commits in the current branch
git log

# See a more compact version of the log
git log --oneline --graph`}
                                language="bash"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitCommit;