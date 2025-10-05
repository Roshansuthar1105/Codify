import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const MergeTypes = () => {
    const comparison = [
        {
            aspect: 'Scenario',
            fastForward: 'Target branch has no new commits since the feature branch was created. The history is linear.',
            threeWay: 'Both the target branch and the feature branch have new commits. The histories have diverged.'
        },
        {
            aspect: 'Git\'s Action',
            fastForward: 'Simply moves the target branch\'s pointer forward to the latest commit of the feature branch.',
            threeWay: 'Finds a common ancestor and creates a new "merge commit" that has two parents.'
        },
        {
            aspect: 'Resulting History',
            fastForward: 'A perfectly linear history. It looks as if the commits were made directly on the target branch.',
            threeWay: 'A graph-like history that explicitly shows where a feature branch was merged back in.'
        },
        {
            aspect: 'Use Case',
            fastForward: 'Simple, small changes or when maintaining a clean, linear history is a priority.',
            threeWay: 'Standard for collaborative projects where branches diverge. Preserves the context of the feature branch.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Merging:</span> Fast-Forward vs. Three-Way
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    When you use `git merge`, Git employs one of two primary strategies to integrate changes: a "fast-forward" merge or a "three-way" merge. The strategy Git chooses depends entirely on the structure of the commit history between the two branches you're merging. Understanding both is key to managing your project's history effectively.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Difference: </strong>
                        A **fast-forward** merge is a simple pointer update, possible only on a linear path. A **three-way** merge is a true merge that combines two diverging histories by creating a brand new commit.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Fast-Forward Merge</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            This occurs when the branch you're merging into (e.g., `main`) has not had any new commits since your feature branch was created. Since there are no diverging changes to reconcile, Git can simply "fast-forward" the `main` branch pointer to the latest commit of your feature branch.
                        </p>
                        <CodeBlock language="text" code={`# Before Merge: main has not changed
A---B---C (main)
         \\
          D---E (feature)

# After 'git merge feature': main's pointer just moves forward
A---B---C---D---E (main, feature)`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Three-Way Merge</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            This is the more common scenario. It happens when the branch you're merging into has new commits that your feature branch doesn't have. The histories have diverged. Git must create a new **merge commit** to tie the two histories together. This commit has two parents—one from each branch.
                        </p>
                        <CodeBlock language="text" code={`# Before Merge: Both branches have new commits
          D---E (feature)
         /
A---B---C---F---G (main)

# After 'git merge feature': A new merge commit 'H' is created
          D---E
         /     \\
A---B---C---F---G---H (main)`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Side-by-Side Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fast-Forward Merge</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Three-Way Merge</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparison.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{item.aspect}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.fastForward}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.threeWay}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Forcing a Merge Commit with `--no-ff`</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Sometimes, you may want to create a merge commit even when a fast-forward is possible. This is useful for preserving the historical context of a feature branch, clearly marking in the history where a feature was completed and integrated. This is a common practice for pull requests on platforms like GitHub.
                        </p>
                        <CodeBlock language="bash" code={`# This command creates a merge commit even if a fast-forward is possible.
git merge --no-ff feature-branch`} />
                    </div>
                </section>

            </div>
        </div>
    );
};

export default MergeTypes;