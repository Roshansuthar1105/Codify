import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitDeleteBranches = () => {
    const whyDelete = [
        {
            title: 'Reduces Clutter',
            description: 'A clean repository with only active or relevant branches is easier to navigate and understand for the entire team.'
        },
        {
            title: 'Prevents Confusion',
            description: 'Removing old branches prevents developers from accidentally checking them out or basing new work on outdated code.'
        },
        {
            title: 'Improves Performance',
            description: 'While minor, having a large number of branches can slightly slow down some Git operations. Regular cleanup is good hygiene.'
        },
        {
            title: 'Signals Completion',
            description: 'Deleting a branch after it has been merged is a clear signal to the team that the work for that feature or fix is complete and integrated.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Deleting</span> Git Branches
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Once the work on a branch is complete and has been merged into your main branch, it's best practice to delete it. Keeping your repository tidy by removing stale branches helps prevent clutter and makes it easier for your team to navigate the project. Git provides simple and safe commands to manage this process.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Deleting a branch in Git only removes the pointer to the commits. The commits themselves are not immediately deleted. They will remain in your repository until Git's internal "garbage collection" process cleans them up, as long as they are not part of another branch's history.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Delete Branches?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whyDelete.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Deletion Commands</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git branch -d`: Safe Delete</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                The `-d` (or `--delete`) flag is for safe deletion. Git will check if the branch has been fully merged into your current branch. If it hasn't, Git will prevent the deletion to avoid accidental loss of work.
                            </p>
                            <CodeBlock language="bash" code={`# Switch to the main branch first
git checkout main

# Attempt to delete a merged branch (this will succeed)
git branch -d feature/login-page
# Output: Deleted branch feature/login-page (was a1b2c3d).

# Attempt to delete an unmerged branch (this will fail)
git branch -d feature/unfinished-work
# Output: error: The branch 'feature/unfinished-work' is not fully merged.`} />
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git branch -D`: Force Delete</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                The `-D` (a capital D) flag will force delete the branch, regardless of its merge status. This is useful when you want to permanently abandon all the work on a specific branch. Use this command with caution.
                            </p>
                            <CodeBlock language="bash" code={`# Force delete the branch, even if it has unmerged changes
git branch -D feature/failed-experiment

# Output: Deleted branch feature/failed-experiment (was e4f5g6h).`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Important Rule: You Can't Delete Your Current Branch</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                            Git will not allow you to delete the branch you are currently working on. You must switch to a different branch before you can delete another one.
                        </p>
                        <CodeBlock language="bash" code={`# Assume we are currently on 'feature/to-be-deleted'
git branch -d feature/to-be-deleted
# Output: error: Cannot delete branch 'feature/to-be-deleted' checked out at '.../my-project'

# The correct way: switch to another branch first
git checkout main
git branch -d feature/to-be-deleted`} />
                    </div>
                </section>

            </div>
        </div>
    );
};

export default GitDeleteBranches;