import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitCherryPick = () => {
    const examples = [
        {
            title: 'Basic Cherry-Pick',
            code: `# Step 1: Find the commit hash you want from another branch
git log feature-branch --oneline
# 7a4e9b3 Add new login button <--- This is the commit we want
# 3c8e1a2 Refactor API service

# Step 2: Switch to the branch where you want to apply the commit
git switch main

# Step 3: Cherry-pick the commit
git cherry-pick 7a4e9b3`,
            explanation: 'This command takes the changes from the specified commit and applies them to your current branch, creating a new commit with the same changes.'
        },
        {
            title: 'Cherry-Picking a Range of Commits',
            code: `# Suppose we want commits B and C from another branch
# A -- B -- C -- D (feature-branch)

# Find the commit hashes
git log feature-branch --oneline
# ...
# 3c8e1a2 (C) Refactor API service
# 7a4e9b3 (B) Add new login button
# ...

# Apply commits B and C onto the current branch
# The A..C syntax means "commits after A, up to and including C"
git cherry-pick 7a4e9b3^..3c8e1a2`,
            explanation: 'You can cherry-pick a range of commits. The `^..` notation is useful for including the starting commit in the range.'
        }
    ];

    const workflows = [
        {
            title: 'Workflow: Applying a Hotfix',
            code: `# A critical bug is fixed on the main branch
git log main --oneline
# 9fceb02 Fix critical bug in API <--- The hotfix commit
# ...

# The same fix needs to be applied to an older release branch
git switch release-v1.0

# Cherry-pick the hotfix commit onto the release branch
git cherry-pick 9fceb02`,
            explanation: 'Cherry-picking is ideal for backporting critical fixes to maintenance branches without bringing in other, newer features from the main branch.'
        },
        {
            title: 'Handling Conflicts',
            code: `# Start the cherry-pick
git cherry-pick 7a4e9b3
# Auto-merging index.js
# CONFLICT (content): Merge conflict in index.js
# error: could not apply 7a4e9b3... Add new login button

# Step 1: Open the file(s) with conflicts and resolve them manually
# Step 2: Stage the resolved file(s)
git add index.js

# Step 3: Continue the cherry-pick process
git cherry-pick --continue

# Alternatively, to cancel the whole operation:
git cherry-pick --abort`,
            explanation: 'If the changes in the picked commit conflict with your current branch, Git will pause and let you resolve the conflicts manually.'
        }
    ];

    const bestPractices = [
        'Use cherry-pick for very specific situations like hotfixes or backporting a small change.',
        'Prefer `git merge` or `git rebase` for integrating entire feature branches.',
        'Always review the changes you are about to cherry-pick to understand their context.',
        'Communicate with your team when cherry-picking to avoid confusion about duplicated commits in the history.',
        'Test thoroughly after a cherry-pick, as the code is being applied in a new context.'
    ];

    const commonMistakes = [
        'Using cherry-pick when a standard `git merge` would be more appropriate.',
        'Thinking it moves a commit. It copies the changes into a new, distinct commit.',
        'Cherry-picking a commit that relies on changes from other commits that are not being picked.',
        'Losing track of which commits have been cherry-picked, leading to a messy history.',
        'Mishandling conflicts, leading to a broken state.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Cherry-Pick: Applying Specific Commits
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    `git cherry-pick` is a powerful command that allows you to choose a commit from one branch and apply it onto another. This is in contrast to `git merge`, which applies all the commits from another branch. Cherry-picking is a surgical tool, enabling you to grab individual changes that you need.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Cherry-picking doesn't move a commit; it takes the patch (the set of changes) from the target commit and reapplies it on your current branch, creating a brand new commit with a different hash.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Usage</h2>
                    <div className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Workflows & Conflict Resolution</h2>
                    <div className="space-y-6">
                        {workflows.map((workflow, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{workflow.title}</h3>
                                <CodeBlock code={workflow.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{workflow.explanation}</p>
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

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use Cherry-Pick vs. Merge</h3>
                     <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Choosing the right tool is crucial for maintaining a clean project history.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li><strong>`git cherry-pick`</strong>: For applying a *single commit* from another branch. Use for hotfixes, backporting fixes, or reapplying a commit made to the wrong branch.</li>
                        <li><strong>`git merge`</strong>: For integrating an *entire branch's history* into another. This is the standard way to combine feature branches with your main line of development.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default GitCherryPick;