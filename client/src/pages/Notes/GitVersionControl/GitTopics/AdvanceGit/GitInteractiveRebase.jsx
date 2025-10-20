import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitInteractiveRebase = () => {
    const commonOps = [
        {
            title: 'Combining Commits (`squash` & `fixup`)',
            code: `#
pick 223c3e7 Add basic HTML structure
s 8f8f2d1 Add header and nav styles  # 's' is short for 'squash'
f 9a1b4c5 Fix typo in header       # 'f' is short for 'fixup'

# After saving, Git will open another editor to combine messages
# from the 'pick' and 'squash' commits. The 'fixup' message
# will be discarded automatically.`,
            explanation: '`squash` combines commits and lets you edit the commit messages together. `fixup` is similar but discards the message of the fixed-up commit entirely.'
        },
        {
            title: 'Rewording a Commit Message (`reword`)',
            code: `# Simply change 'pick' to 'reword' (or 'r')
r 223c3e7 Add basic HTML structure

# After saving, Git will open an editor allowing you to
# write a new commit message for this specific commit.`,
            explanation: '`reword` is perfect for quickly fixing typos or improving the clarity of a commit message without changing the code.'
        },
        {
            title: 'Reordering and Dropping Commits',
            code: `# To reorder, just change the order of the lines:
pick 9a1b4c5 A feature
pick 223c3e7 A dependency for that feature
# becomes ->
pick 223c3e7 A dependency for that feature
pick 9a1b4c5 A feature

# To drop a commit, delete the line or use 'drop' ('d')
d 8f8f2d1 Remove this commit entirely`,
            explanation: 'You can change the order in which commits are applied by reordering them in the list. To completely remove a commit, simply delete its line or use the `drop` command.'
        }
    ];

    const bestPractices = [
        '**Rule #1: NEVER** rebase commits that you have pushed and shared with others.',
        'Rebase in small, logical chunks. It\'s easier to resolve issues than in one giant rebase.',
        'Clean up your local feature branch history *before* creating a pull request.',
        'Use `squash` and `fixup` to turn messy "WIP" commits into a single, coherent feature commit.',
        'If you get stuck, remember you can always escape with `git rebase --abort`.'
    ];

    const commonMistakes = [
        'Rebasing the `main` branch or any other shared, long-lived branch.',
        'Rewriting history that another developer has already based their work on.',
        'Trying to rebase a massive feature branch with hundreds of commits at once.',
        'Not knowing how to resolve rebase conflicts when they occur.',
        'Using `git push --force` instead of the safer `git push --force-with-lease`.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Interactive Rebase
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Interactive rebase is one of Git's most powerful features. It allows you to modify commits, rewrite messages, and change history in a variety of ways. It's the ultimate tool for cleaning up a messy local commit history on your feature branch before sharing it with your team.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-yellow-400 dark:border-yellow-600 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold text-yellow-600 dark:text-yellow-500">⚠️ Important: </strong>
                        With great power comes great responsibility. Interactive rebase rewrites commit history. You should **only** use it on commits that have not yet been pushed to a shared repository.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Starting an Interactive Rebase Session</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">The Command</h3>
                         <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">You can start a session relative to your current position (`HEAD`) or against another branch.</p>
                        <CodeBlock code={`# Rebase the last 3 commits from your current position
git rebase -i HEAD~3

# Rebase all commits on your current branch that are not on 'main'
git rebase -i main`} language="bash" />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">After running this, Git will open your default text editor with a list of the commits you've selected, along with instructions.</p>
                         <CodeBlock code={`# This is what you'll see in your editor:
pick 223c3e7 Add basic HTML structure
pick 8f8f2d1 Add header styles
pick 9a1b4c5 Fix typo in header

# Rebase 5d8f3b4..9a1b4c5 onto 5d8f3b4 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# ... and more`} language="bash" />

                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Operations</h2>
                    <div className="space-y-6">
                        {commonOps.map((op, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{op.title}</h3>
                                <CodeBlock code={op.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{op.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm" dangerouslySetInnerHTML={{ __html: practice }} />
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">The Golden Rule of Rebasing & Pushing</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        After rewriting history on your local feature branch, you will have to "force push" to update the remote branch. Use `--force-with-lease` as a safety check to avoid overwriting work if someone else has pushed to the branch.
                    </p>
                    <CodeBlock
                        code={`# On your feature branch...
# 1. Clean up your local history
git rebase -i main

# 2. Push your cleaned-up branch
# This will fail if someone else has pushed to your branch since you last pulled.
git push --force-with-lease origin my-feature-branch`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default GitInteractiveRebase;