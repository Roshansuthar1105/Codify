import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitPushPull = () => {
    const coreCommands = [
        {
            command: 'git push',
            description: 'Uploads your committed changes from a local branch to its corresponding branch on the remote repository. This is how you share your work with your team.',
            syntax: 'git push <remote_name> <branch_name>',
            exampleCode: `# Push the "main" branch to the "origin" remote
git push origin main

# Push a new feature branch and set it up to track the remote branch
git push --set-upstream origin feature/user-login
# or using the shorthand:
git push -u origin feature/user-login`
        },
        {
            command: 'git pull',
            description: 'Fetches the latest updates from a remote repository and automatically merges them into your current local branch. It\'s a combination of `git fetch` and `git merge`.',
            syntax: 'git pull <remote_name> <branch_name>',
            exampleCode: `# Get the latest changes from the "main" branch on "origin"
git pull origin main

# If you have tracking set up, you can just run:
git pull`
        }
    ];

    const commonWorkflow = [
        'Start your day by getting the latest updates: `git pull origin main`',
        'Create a new branch for your task: `git checkout -b feature/new-task`',
        'Make your changes and commit them: `git commit -am "Implement feature X"`',
        'Share your new branch and commits with the team: `git push -u origin feature/new-task`',
        'Once your work is reviewed and merged, switch back to main and repeat the cycle.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Syncing with Remotes:</span> Git Push & Git Pull
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Since Git is a distributed version control system, you have a complete copy of the project on your local machine. However, to collaborate, you need a central place to share changes. This is the "remote" repository (like on GitHub or GitLab). The commands `git push` and `git pull` are the essential tools for sending your local changes to the remote and receiving changes from others.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Analogy: </strong>
                        Think of the remote repository as a central library's master copy of a book. When you `git pull`, you're getting the latest official edits for your own copy. When you `git push`, you're submitting your new chapter to the library for everyone else to read.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Core Commands</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {coreCommands.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.command}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Syntax:</strong> <code>{item.syntax}</code></p>
                                <CodeBlock language="bash" code={item.exampleCode} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">A Typical Daily Workflow</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The push/pull cycle is central to collaborative development. Here's a simplified look at how a developer might use these commands in their daily work:
                        </p>
                        <ul className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonWorkflow.map((step, index) => (
                                <li key={index} className="text-sm">{step}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Handling Conflicts</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">When Your Push is Rejected</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                            Sometimes, Git will reject your `push` because another developer has pushed changes to the same branch since you last pulled. This prevents you from overwriting their work.
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-white text-sm mb-2">The Solution:</p>
                        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            <li>First, `pull` the latest changes from the remote: `git pull origin main`.</li>
                            <li>Git will merge the remote changes with your local commits. You may need to resolve merge conflicts at this stage if your changes overlap.</li>
                            <li>Once the merge is complete and conflicts are resolved, you can safely `push` your combined changes again: `git push origin main`.</li>
                        </ol>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default GitPushPull;