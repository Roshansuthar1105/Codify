import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitReset = () => {
    const resetModes = [
        {
            mode: 'Soft Reset',
            command: 'git reset --soft <commit>',
            description: 'Moves the HEAD pointer to a previous commit but does NOT change the Staging Area or the Working Directory. The changes from the reset commits are kept in the Staging Area, ready to be re-committed.',
            useCase: 'Ideal for combining several small, local commits into a single larger one (squashing) or for quickly editing the last commit message.',
            impact: {
                head: '✅ Moves',
                staging: '❌ Unchanged',
                workingDir: '❌ Unchanged'
            }
        },
        {
            mode: 'Mixed Reset (Default)',
            command: 'git reset --mixed <commit>',
            description: 'This is the default mode. It moves the HEAD pointer and resets the Staging Area to match the specified commit. However, the Working Directory remains untouched. Your changes are preserved but unstaged.',
            useCase: 'Perfect for undoing commits while keeping the work, allowing you to re-shape your commits by staging files differently.',
            impact: {
                head: '✅ Moves',
                staging: '✅ Resets',
                workingDir: '❌ Unchanged'
            }
        },
        {
            mode: 'Hard Reset',
            command: 'git reset --hard <commit>',
            description: 'Moves the HEAD pointer and resets BOTH the Staging Area and the Working Directory to match the specified commit. This is a destructive operation.',
            useCase: 'Used to completely discard recent commits and all associated changes. Useful for getting back to a known-good state and throwing away failed experiments.',
            impact: {
                head: '✅ Moves',
                staging: '✅ Resets',
                workingDir: '✅ Resets'
            }
        }
    ];

    const useCases = [
        {
            title: 'Unstaging a Single File',
            description: 'If you accidentally staged a file with `git add`, you can unstage it without affecting the file in your working directory.',
            code: `// Unstages "app.js" but keeps the changes in the file
git reset app.js`
        },
        {
            title: 'Fixing the Last Commit',
            description: 'Forgot to add a file or made a typo in the last commit? A soft reset makes this easy to fix.',
            code: `# 1. Undo the last commit, but keep changes staged
git reset --soft HEAD~1

# 2. Add the file you forgot
git add forgotten-file.txt

# 3. Commit again with the corrected changes
git commit -m "This is the corrected commit message"`
        },
        {
            title: 'Discarding Local Changes',
            description: 'To throw away all local commits and changes and make your local branch exactly match the remote branch.',
            code: `# WARNING: This will delete all unpushed commits and local changes.
git fetch origin
git reset --hard origin/main`
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Reset Explained
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    `git reset` is a powerful and versatile command for undoing changes in your repository. It works by moving the `HEAD` pointer—which points to your current branch's latest commit—to a different commit. Depending on the mode you use, it can also modify your Staging Area and Working Directory, making it essential to understand how each mode works.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Insight: </strong>
                        The main difference between `reset` modes is where the changes go. `--soft` keeps them staged, `--mixed` unstages them but keeps them in your files, and `--hard` deletes them entirely.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Three Modes of Git Reset</h2>
                    <div className="space-y-6">
                        {resetModes.map((mode, index) => (
                            <div key={index} className={`bg-white dark:bg-black p-6 rounded-lg shadow-sm border ${mode.mode === 'Hard Reset' ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-700'}`}>
                                <h3 className={`text-xl font-semibold ${mode.mode === 'Hard Reset' ? 'text-red-500' : 'text-primary-600 dark:text-primary-400'} mb-3`}>{mode.mode}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{mode.description}</p>

                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Best For:</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{mode.useCase}</p>

                                <div className="grid grid-cols-3 gap-4 text-center mb-4 text-sm">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>HEAD</strong><br />{mode.impact.head}</div>
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>Staging Area</strong><br />{mode.impact.staging}</div>
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>Working Dir</strong><br />{mode.impact.workingDir}</div>
                                </div>

                                <CodeBlock code={mode.command} language="bash" />
                                {mode.mode === 'Hard Reset' && (
                                    <p className="text-red-500 text-sm mt-3 font-semibold">
                                        Warning: Use with extreme caution. This command permanently deletes uncommitted changes and unpushed commits.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Use Cases</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{useCase.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{useCase.description}</p>
                                <CodeBlock code={useCase.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Safety Rule: Public vs. Private History</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The golden rule of `git reset` is to <strong className="text-gray-800 dark:text-white">never use it on commits that have been pushed to a shared (public) repository</strong>.
                            Resetting public history rewrites the project's timeline, which can cause serious problems for collaborators who have based their work on the "erased" commits.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">What to do instead?</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">To undo changes on a public branch, use `git revert`. It creates a new commit that reverses the changes of a previous one, safely preserving the project history.</p>
                            <CodeBlock
                                code={`# This creates a new commit that undoes the changes from the target commit
git revert <commit-hash-to-undo>`}
                                language="bash"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitReset;