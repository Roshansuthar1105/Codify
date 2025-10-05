import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitStash = () => {
    const stashCommands = [
        {
            title: 'Saving Changes: git stash save',
            code: `# Stash your current changes
git stash save "WIP: working on new feature X"

# A shorter alias also works
git stash "WIP: new feature"
git stash # a default message will be generated`,
            explanation: 'This command takes your uncommitted changes (both staged and unstaged), saves them on a stack for later use, and then reverts your working directory to match the last commit (HEAD).'
        },
        {
            title: 'Listing Stashes: git stash list',
            code: `git stash list

# Output will look like this:
# stash@{0}: WIP on main: 67a4e21 Add new feature
# stash@{1}: On feature-branch: WIP: updating login form`,
            explanation: 'Displays all the stashed changesets you have saved. Each stash is given an index, with stash@{0} being the most recent.'
        },
        {
            title: 'Applying Stashes: git stash pop',
            code: `# Apply the most recent stash and remove it from the list
git stash pop

# Apply a specific stash (e.g., the second one)
git stash pop stash@{1}`,
            explanation: 'Applies the changes from a stash to your current working directory and removes that stash from the stack. This is the most common way to retrieve stashed work.'
        },
        {
            title: 'Applying without Deleting: git stash apply',
            code: `# Apply the most recent stash but keep it in the list
git stash apply

# Apply a specific stash
git stash apply stash@{1}`,
            explanation: 'Works just like `git stash pop`, but it does *not* remove the stash from the stack. Useful if you want to apply the same changes to multiple branches.'
        },
        {
            title: 'Deleting Stashes: git stash drop',
            code: `# Drop the most recent stash
git stash drop

# Drop a specific stash
git stash drop stash@{1}

# Clear all stashes
git stash clear`,
            explanation: 'Removes a specific stash from the stack without applying it. Be careful, as this is a destructive action.'
        }
    ];

    const bestPractices = [
        'Always provide a descriptive message with `git stash save "message"` to remember what the stash contains.',
        'Stash changes before pulling from the remote to avoid potential conflicts with your local work-in-progress.',
        'Only stash work that is related. If you have multiple unrelated changes, make separate commits or stashes.',
        'Before using `git stash pop`, ensure you are on the same branch where you created the stash to avoid confusion.',
        'Regularly clean up old stashes using `git stash drop` or `git stash clear` to keep your stash list manageable.'
    ];

    const commonMistakes = [
        'Forgetting which branch a stash was created on, leading to applying it in the wrong context.',
        'Using `git stash` to avoid committing. If the work is significant, a feature branch with regular commits is better.',
        'Letting the stash list grow too large, making it difficult to find the changes you need.',
        'Accidentally dropping the wrong stash with `git stash drop` because the indices shift when you pop or drop.',
        'Running into conflicts when popping a stash. You must resolve these conflicts manually, just like a merge conflict.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Stash:</span> Temporarily Shelving Changes
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Ever been in the middle of coding a feature when an urgent bug report comes in? You need to switch branches, but your work isn't ready to be committed. This is the perfect scenario for `git stash`. It allows you to save your dirty working directory and switch contexts cleanly.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Git stash saves your uncommitted changes (both staged and unstaged) on a stack, allowing you to revert to a clean working directory. You can then re-apply these changes later using `git stash pop` or `git stash apply`.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Stash Commands</h2>
                    <div className="space-y-6">
                        {stashCommands.map((command, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{command.title}</h3>
                                <CodeBlock code={command.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{command.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">A Typical Workflow</h2>
                     <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>You're working on a feature and have uncommitted changes.</strong>
                                <CodeBlock code={`# You have edited file1.js and file2.js
git status
# On branch feature/new-design
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git restore <file>..." to discard changes in working directory)
#	modified:   file1.js
#	modified:   file2.js`} language="bash" />
                            </li>
                            <li>
                                <strong>An urgent task requires you to switch branches. You stash your work.</strong>
                                <CodeBlock code={`git stash save "WIP: new design form validation"`} language="bash" />
                                <p className="text-sm mt-1">Your working directory is now clean, as if you hadn't made any changes.</p>
                            </li>
                            <li>
                                <strong>You switch branches, fix the bug, commit, and switch back.</strong>
                                 <CodeBlock code={`git checkout main
# ...fix the bug...
git add .
git commit -m "Fix: critical login bug"
git checkout feature/new-design`} language="bash" />
                            </li>
                            <li>
                                <strong>Now back on your feature branch, you retrieve your stashed work.</strong>
                                 <CodeBlock code={`git stash pop`} language="bash" />
                                <p className="text-sm mt-1">Your changes to `file1.js` and `file2.js` are back, and you can continue where you left off. The stash is automatically removed from the list.</p>
                            </li>
                        </ol>
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
            </div>
        </div>
    );
};

export default GitStash;