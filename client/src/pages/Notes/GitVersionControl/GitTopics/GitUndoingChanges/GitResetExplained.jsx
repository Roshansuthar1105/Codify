import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitResetExplained = () => {
    const resetTypes = [
        {
            mode: '--soft',
            title: 'Soft Reset: Move HEAD Only',
            description: 'This is the most gentle reset. It moves the HEAD pointer to a specified commit but does not touch the Staging Index or the Working Directory. Your files remain unchanged, and all the changes from the commits you reset past are now staged.',
            effect: [
                'HEAD: Moved to the target commit.',
                'Staging Index: Unchanged. Changes from original HEAD are now staged.',
                'Working Directory: Unchanged. No files are modified.'
            ],
            useCaseExample: `# You made 3 commits but want to combine them into one.
# Go back 3 commits, keeping all changes staged.
git reset --soft HEAD~3

# Now you can create a single, new commit.
git commit -m "New single commit with all previous changes"`
        },
        {
            mode: '--mixed',
            title: 'Mixed Reset: Move HEAD & Update Staging Index',
            description: 'This is the default mode. It moves the HEAD pointer and updates the Staging Index to match the state of the commit you reset to. The Working Directory is not affected, meaning your files still contain the changes, but those changes are now unstaged.',
            effect: [
                'HEAD: Moved to the target commit.',
                'Staging Index: Updated to match the target commit. Changes are unstaged.',
                'Working Directory: Unchanged. Your files still have the modifications.'
            ],
            useCaseExample: `# You staged some files but want to unstage them.
# This unstages all currently staged changes.
git reset

# To unstage changes from the last commit:
git reset HEAD~1`
        },
        {
            mode: '--hard',
            title: 'Hard Reset: Move HEAD & Update Everything',
            description: 'This is the most powerful and potentially dangerous mode. It moves the HEAD pointer and forces the Staging Index and Working Directory to match the exact state of the commit you reset to. Any uncommitted changes in your staging index and working directory will be permanently lost.',
            effect: [
                'HEAD: Moved to the target commit.',
                'Staging Index: Reset to match the target commit. Staged changes are lost.',
                'Working Directory: Reset to match the target commit. Local changes are lost.'
            ],
            useCaseExample: `# You want to completely discard all local changes and commits.
# WARNING: This action cannot be undone.
git reset --hard origin/main

# This will make your local branch identical to the remote branch.`
        }
    ];

    const comparison = [
        {
            area: "HEAD (Current Branch Pointer)",
            soft: "Moves",
            mixed: "Moves",
            hard: "Moves"
        },
        {
            area: "Staging Index (Staged Files)",
            soft: "No change",
            mixed: "Resets to match HEAD",
            hard: "Resets to match HEAD"
        },
        {
            area: "Working Directory (Your Files)",
            soft: "No change",
            mixed: "No change",
            hard: "Resets to match HEAD"
        }
    ];

    const safetyTips = [
        'Never use `git reset --hard` on commits that have been pushed to a public/shared repository. It rewrites history, which can cause major problems for collaborators.',
        'Use `git revert` to undo changes on a shared branch, as it creates a new commit instead of rewriting history.',
        '`git reset --hard` is a command for cleaning up your local repository. Think of it as a "start over from this point" command.',
        'Before a hard reset, use `git stash` to save any work-in-progress changes you might want to re-apply later.',
        'Double-check which commit you are resetting to. A typo can lead to significant data loss.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Understanding</span> Git Reset
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <code>git reset</code> is a powerful and versatile command for undoing changes in your Git repository. Its behavior depends on which mode you use: <code>--soft</code>, <code>--mixed</code> (the default), or <code>--hard</code>. Understanding how each mode affects Git's three "trees" — <code>HEAD</code>, the <code>Staging Index</code>, and the <code>Working Directory</code> — is key to using it safely and effectively.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        The difference between <code>soft</code>, <code>mixed</code>, and <code>hard</code> is which of Git's three trees they update: the <code>HEAD</code> pointer, the <code>Staging Index</code>, and the <code>Working Directory</code>.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Three Modes of Git Reset</h2>
                    <div className="space-y-6">
                        {resetTypes.map((reset, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3" dangerouslySetInnerHTML={{ __html: reset.title.replace(/`(.*?)`/g, '<code>$1</code>') }} />
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{reset.description}</p>
                                
                                <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Effect on Git's Trees:</h4>
                                <ul className="list-disc pl-6 space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                                    {reset.effect.map((eff, i) => (
                                        <li key={i} className="text-sm">{eff}</li>
                                    ))}
                                </ul>

                                <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Common Use Case:</h4>
                                <CodeBlock code={reset.useCaseExample} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">At-a-Glance Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Area Affected</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">--soft</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">--mixed (default)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">--hard</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparison.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.area}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.soft}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.mixed}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">{item.hard}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Safety & Best Practices</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 transition-colors">
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Important Considerations</h3>
                        <ul className="space-y-2">
                            {safetyTips.map((tip, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1 font-bold">!</span>
                                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitResetExplained;