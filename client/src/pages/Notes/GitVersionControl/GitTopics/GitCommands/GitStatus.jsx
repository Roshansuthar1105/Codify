import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitStatus = () => {
    const outputSections = [
        {
            title: 'Current Branch',
            description: 'The first line, "On branch main", tells you which branch you are currently working on. It will also indicate if your branch is ahead of or behind the remote branch.'
        },
        {
            title: 'Changes to be Committed (Staged Area)',
            description: 'This section lists all files that have been added to the staging area using `git add`. These are the changes that will be included in your next commit.'
        },
        {
            title: 'Changes not Staged for Commit (Working Directory)',
            description: 'This section shows files that have been modified in your working directory but have not yet been staged. Git knows about these files but is not yet tracking their latest changes for the next commit.'
        },
        {
            title: 'Untracked Files',
            description: 'This lists new files in your working directory that Git has not been told to track yet. To include them in a commit, you must first add them with `git add`.'
        }
    ];

    const shortCodes = [
        { code: 'M', meaning: 'Modified (in working directory)' },
        { code: ' M', meaning: 'Modified (staged)' },
        { code: 'A', meaning: 'Added (staged)' },
        { code: 'D', meaning: 'Deleted (staged)' },
        { code: 'R', meaning: 'Renamed (staged)' },
        { code: '??', meaning: 'Untracked' },
    ];


    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Status
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git status` command is your primary tool for inspecting the state of your repository. It shows you which files have been modified, which are staged for the next commit, and which are untracked. It provides a comprehensive overview of your project's current state, making it arguably the most frequently used command in Git.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Think of `git status` as the dashboard for your repository. Before you do anything else—commit, push, or pull—running `git status` will give you the context you need to proceed correctly.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Anatomy of the `git status` Output</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        The output of `git status` is very descriptive. Let's break down a typical example.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Example Output</h3>
                        <CodeBlock
                            language="bash"
                            code={`$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/app.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        config.js`}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {outputSections.map((section, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">{section.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{section.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Short Format: `git status -s`</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        For a more compact view, you can use the `-s` or `--short` flag. This format is very useful for getting a quick glance at your changes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Short Output Example</h3>
                            <CodeBlock
                                language="bash"
                                code={`$ git status -s
 M README.md
 M src/app.js
?? config.js`}
                            />
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Status Codes</h3>
                            <ul className="space-y-2">
                                {shortCodes.map(item => (
                                    <li key={item.code}>
                                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm text-red-500">{item.code}</code>
                                        <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">{item.meaning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                        The status codes appear in two columns. The left column indicates the status of the staging area, and the right column indicates the status of the working directory. For example, `M ` means the file has been modified and staged, while ` M` means it has been modified but not yet staged.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default GitStatus;