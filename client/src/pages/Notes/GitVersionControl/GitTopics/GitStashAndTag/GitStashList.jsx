import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitStashList = () => {
    const examples = [
        {
            title: 'Basic `git stash list`',
            code: `# Save some changes to the stash
git stash

# View the list of stashes
git stash list

# --- Sample Output ---
# stash@{0}: WIP on main: 5d8f3b4 Add user authentication
# stash@{1}: WIP on feature/new-ui: 3a2c1d0 Update component styles`,
            explanation: 'The default command shows all stashes in a LIFO (Last-In, First-Out) order. `stash@{0}` is always the most recent stash.'
        },
        {
            title: 'Stashing with a Message',
            code: `# Stash changes with a descriptive message
git stash save "Working on user profile validation"

# The list is now much clearer
git stash list

# --- Sample Output ---
# stash@{0}: On main: Working on user profile validation
# stash@{1}: WIP on main: 5d8f3b4 Add user authentication`,
            explanation: 'Using `git stash save "message"` (or `git stash push -m "message"`) is highly recommended for identifying stashes later.'
        },
        {
            title: 'Inspecting a Stash',
            code: `# Show a summary of changes for the latest stash
git stash show

# Show a full diff (patch) for a specific stash
git stash show -p stash@{1}

# --- Sample Output for "show -p" ---
# diff --git a/src/App.js b/src/App.js
# index 9e8d7d7..6e8b4e2 100644
# --- a/src/App.js
# +++ b/src/App.js
# @@ -1,5 +1,6 @@
#  function App() {
# +  // My stashed change
#    return <div>Hello</div>
#  }`,
            explanation: 'Use `git stash show` to quickly see which files were changed, and add the `-p` flag to inspect the exact code changes within a stash.'
        },
        {
            title: 'Applying or Dropping a Stash',
            code: `# View the list to find the stash you need
git stash list
# stash@{0}: On main: Working on user profile validation
# stash@{1}: WIP on feature/new-ui: 3a2c1d0 Update component styles

# Apply the changes from stash@{1} but keep it in the list
git stash apply stash@{1}

# Apply the changes and remove it from the list
git stash pop stash@{1}

# Delete a specific stash without applying it
git stash drop stash@{1}`,
            explanation: 'You can interact with any stash in the list, not just the most recent one, by providing its identifier.'
        }
    ];

    const bestPractices = [
        'Always use `git stash save "message"` to add a description.',
        'Regularly clean up your stash list by dropping stashes you no longer need.',
        'Use `git stash show -p` to verify the contents of a stash before applying it.',
        'For larger, long-term work, prefer creating a new branch over keeping a stash for a long time.',
        'A clean stash list is a happy stash list. Don\'t let it become a graveyard of forgotten code.'
    ];

    const commonMistakes = [
        'Creating too many anonymous "WIP on..." stashes, making it impossible to find things.',
        'Forgetting what a stash contains because it lacks a descriptive message.',
        'Accidentally dropping the wrong stash.',
        'Applying a stash to the wrong branch, which can lead to complex merge conflicts.',
        'Using `git stash` as a long-term storage solution instead of committing to feature branches.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Stash List
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git stash` command is a powerful tool for temporarily shelving changes you've made to your working copy so you can work on something else. The `git stash list` command is your way to view and manage these shelved changes. Understanding how to read and interact with this list is key to using stashes effectively.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Think of `git stash list` as your clipboard history for uncommitted code. It shows you a chronological list of saved states, allowing you to pick, choose, and manage your work-in-progress without making premature commits.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Commands & Output</h2>
                    <div className="space-y-6">
                        {examples.slice(0, 2).map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Inspecting & Using Stashes</h2>
                    <div className="space-y-6">
                        {examples.slice(2).map((example, index) => (
                            <div key={index + 2} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
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

export default GitStashList;