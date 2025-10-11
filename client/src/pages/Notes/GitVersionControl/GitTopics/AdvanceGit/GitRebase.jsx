import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitRebase = () => {
    const comparison = [
        {
            title: 'Merge Workflow',
            code: `# Starting point:
# A---B---C (main)
#      \\
#       D---E---F (feature)

# Merge 'feature' into 'main'
git switch main
git merge feature

# Result: A new merge commit is created
# A---B---C---G (main)
#      \\     /
#       D---E---F (feature)`,
            explanation: 'Merging ties two histories together by creating a new merge commit. It preserves the exact history of both branches but can result in a complex, non-linear graph.'
        },
        {
            title: 'Rebase Workflow',
            code: `# Starting point:
# A---B---C (main)
#      \\
#       D---E---F (feature)

# Rebase 'feature' onto 'main'
git switch feature
git rebase main

# Result: 'feature' commits are re-written on top of 'main'
# A---B---C---D'---E'---F' (feature)
#           (main)`,
            explanation: 'Rebasing rewrites history by re-applying commits from one branch on top of another. This creates a clean, linear history but alters the commit hashes (D\', E\', F\').'
        }
    ];

    const practicalExamples = [
        {
            title: 'Standard Rebase Process',
            code: `# 1. Make sure your main branch is up-to-date
git switch main
git pull origin main

# 2. Switch to your feature branch
git switch feature

# 3. Rebase it on top of the main branch
git rebase main

# Now your feature branch has all of its work, plus main's latest changes.`,
            explanation: 'This workflow "updates" your feature branch with the latest progress from the main branch, making the final merge much cleaner.'
        },
        {
            title: 'Handling Conflicts during Rebase',
            code: `# If a conflict occurs, Git will pause the rebase:
# CONFLICT (content): Merge conflict in file.js

# 1. Open the file and resolve the conflict manually
# 2. Stage the resolved file
git add file.js

# 3. Continue the rebase process
git rebase --continue

# (Or, to cancel the entire rebase)
git rebase --abort`,
            explanation: 'Unlike a merge where you resolve all conflicts at once, a rebase presents conflicts one commit at a time, allowing you to address them sequentially as they are re-applied.'
        }
    ];

    const bestPractices = [
        'Rebase your feature branch onto the target branch (e.g., `main`) to pull in upstream changes before creating a pull request.',
        'Use **interactive rebase** (`git rebase -i`) to clean up your local commit history (squash, reword, etc.) before sharing your work.',
        'Use `git pull --rebase` to avoid creating messy merge commits when updating your local tracking branches.'
    ];

    const goldenRule = [
        'This rule is absolute. Rebasing rewrites history by creating new commits.',
        'If you rebase a branch that others are working on, their history will diverge from yours.',
        'This forces everyone to manually fix their local history, creating confusion and potential for lost work.',
        '**It is safe to rebase your own local branches that you have not yet shared.**'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Rebasing: Creating a Linear History
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    `git rebase` is one of Git's most powerful—and misunderstood—commands. Its primary function is to re-apply a sequence of commits on top of a different base commit. This is most often used to create a "cleaner" or more linear project history by avoiding unnecessary merge commits.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover-border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        The core difference is how histories are combined. **Merge** preserves history exactly as it happened by creating a new merge commit. **Rebase** rewrites history by moving your commits, resulting in a straight line of commits.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Rebase vs. Merge Illustrated</h2>
                    <div className="space-y-6">
                        {comparison.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                <CodeBlock code={item.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{item.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Rebase Process</h2>
                    <div className="space-y-6">
                        {practicalExamples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} language="bash" />
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

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-red-300 dark:border-red-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">The Golden Rule of Rebasing</h3>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Do not rebase commits that exist outside your repository and that other people may have based their work on.</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {goldenRule.map((rule, index) => (
                                <li key={`rule-${index}`} className="text-sm">{rule}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Power Tool: Interactive Rebase</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Interactive rebase (`-i`) allows you to alter commits as they are moved. You can edit, reword, combine (squash), or drop commits entirely, giving you complete control over your branch's history before sharing it.
                    </p>
                    <CodeBlock
                        code={`# Rebase the last 3 commits interactively
git rebase -i HEAD~3

# This opens an editor with a list of commits:
# pick 1fc6c95 Add login button
# pick 6b2481b Fix button alignment
# pick f7fde4a Change button color
#
# Replace 'pick' with 'squash' or 'fixup' to combine commits,
# 'reword' to change the message, 'drop' to delete, etc.`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default GitRebase;