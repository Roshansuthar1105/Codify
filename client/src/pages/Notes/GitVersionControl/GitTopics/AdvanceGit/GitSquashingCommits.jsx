import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitSquashingCommits = () => {
    const processSteps = [
        {
            title: '1. Identify Commits to Squash',
            code: `# Let's say our history looks messy like this:
git log --oneline
# 7c3d4a1 Add forgotten semicolon
# 3a2c1d0 WIP on user form
# 5d8f3b4 Start implementing user form

# We want to combine these 3 commits into one.
# Start an interactive rebase for the last 3 commits:
git rebase -i HEAD~3`,
            explanation: 'First, identify the series of commits you want to combine. Then, start an interactive rebase with `git rebase -i`, specifying the range of commits to work with.'
        },
        {
            title: '2. Mark Commits for Squashing',
            code: `# Your text editor will open with the following:
pick 5d8f3b4 Start implementing user form
pick 3a2c1d0 WIP on user form
pick 7c3d4a1 Add forgotten semicolon

# To squash, change "pick" to "squash" (or "s") for the commits
# you want to merge into the one above them.
pick 5d8f3b4 Start implementing user form
s 3a2c1d0 WIP on user form
s 7c3d4a1 Add forgotten semicolon

# Save and close the editor.`,
            explanation: 'In the interactive editor, keep `pick` for the first commit and change `pick` to `squash` or `s` for all the subsequent commits you want to combine.'
        },
        {
            title: '3. Craft the New Commit Message',
            code: `# Git will now open another editor to create the new commit message.
# This is a combination of all the messages from the squashed commits.
#
#   Start implementing user form
#   WIP on user form
#   Add forgotten semicolon

# Delete the old messages and write a new, clean, and descriptive one.
# For example:
Implement user form with validation

# - Add form component structure
# - Include email and password fields
# - Add client-side validation for both fields

# Save and close the editor.`,
            explanation: 'After choosing which commits to squash, Git prompts you to write a new commit message. It\'s best practice to discard the old messages and write a single, comprehensive message that describes the entire change.'
        },
        {
            title: '4. The Final, Clean History',
            code: `# Check the log again
git log --oneline

# --- New Output ---
# f4a3b2c Implement user form with validation`,
            explanation: 'The original three commits have now been replaced by a single, well-worded commit, resulting in a much cleaner project history.'
        },
    ];

    const bestPractices = [
        'Squash only on your local feature branches before they are merged.',
        'Combine small, related commits (like "fix typo", "WIP", "add test") into a single logical feature.',
        'Write a clear and comprehensive new commit message that summarizes the entire change.',
        'Ensure your code is in a stable, working state before starting a squash.',
        'Use squashing to make your pull requests easier to review and understand.'
    ];

    const commonMistakes = [
        '**The Golden Rule:** Never squash commits that have already been pushed to a shared branch (like `main` or `develop`). This rewrites history and can cause major issues for your teammates.',
        'Squashing unrelated changes into a single, confusing commit.',
        'Force-pushing (`git push --force`) to a shared branch after squashing.',
        'Writing a lazy commit message for the new, combined commit.',
        'Accidentally resolving merge conflicts incorrectly during the rebase process.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Squashing Commits
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Squashing in Git is the process of combining a sequence of commits into a single, cohesive commit. It's not a standalone command, but rather a powerful feature of interactive rebase (`git rebase -i`). The primary goal is to clean up your project's history, turning a series of messy "work-in-progress" commits into one logical change.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Squashing transforms a messy local history into a clean, understandable story. It's a cleanup step you perform on your feature branch *before* sharing your code, ensuring your contribution is presented as a single, logical unit.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Squashing Process</h2>
                    <div className="space-y-6">
                        {processSteps.map((step, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                                <CodeBlock code={step.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{step.explanation}</p>
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
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes & The Golden Rule</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitSquashingCommits;