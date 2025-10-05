import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitRevert = () => {
    const revertExamples = [
        {
            title: 'Reverting the Most Recent Commit',
            description: 'The simplest use case. `HEAD` refers to the latest commit on the current branch. This command will create a new commit that undoes the changes made in the last commit.',
            code: `# View the commit history
git log --oneline

# Revert the last commit
# This will open a text editor for the new commit message
git revert HEAD

# View the history again to see the new "Revert" commit
git log --oneline`
        },
        {
            title: 'Reverting a Specific Older Commit',
            description: 'You can revert any commit in the history by providing its hash. This is useful for undoing a specific change that was introduced several commits ago.',
            code: `# Find the hash of the commit you want to undo
git log --oneline
# e.g., ab12cd3 Add faulty feature

# Revert the specific commit using its hash
git revert ab12cd3`
        },
        {
            title: 'Reverting a Merge Commit',
            description: 'Reverting a merge commit is more complex because Git doesn\'t know which parent branch to keep as the "mainline". You must specify it with `-m <parent-number>`. Parent 1 is typically the branch you merged into (e.g., `main`).',
            code: `# Find the merge commit hash
git log --oneline --graph
# e.g., * fe45gh6 (HEAD -> main) Merge branch 'feature'
#      |\
#      | * de78ij9 (feature) Add new feature
#      * | lm12no3 Update docs

# Revert the merge, keeping the first parent (main) as the mainline
git revert -m 1 fe45gh6`
        }
    ];

    const comparisonData = [
        {
            aspect: 'Effect on History',
            revert: 'Non-destructive. Creates a new commit to undo changes.',
            reset: 'Destructive. Moves the branch pointer, potentially discarding commits.'
        },
        {
            aspect: 'Safety',
            revert: 'Safe for shared/public branches (e.g., main, develop).',
            reset: 'Unsafe for shared branches. Should only be used on local, private branches.'
        },
        {
            aspect: 'Use Case',
            revert: 'To publicly undo a committed change in a shared history.',
            reset: 'To clean up local history before pushing or to discard local changes.'
        },
        {
            aspect: 'Collaboration',
            revert: 'Easy for team members to pull the change like any other commit.',
            reset: 'Causes history divergence, requiring others to force-pull or rebase.'
        }
    ];

    const bestPractices = [
        'Always use `git revert` to undo changes on a shared branch.',
        'Write clear and descriptive revert commit messages explaining why the change was undone.',
        'Communicate with your team before reverting a major feature or merge commit.',
        'Use `git revert --no-commit` if you want to revert multiple commits and group them into a single new commit.'
    ];

    const potentialIssues = [
        'Reverting can cause merge conflicts if subsequent commits have modified the same lines of code.',
        'Reverting a revert commit will re-apply the original changes.',
        'Mistaking `revert` for `reset` is a common but dangerous error for beginners.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Revert: Safely Undoing Changes
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git revert` command is a forward-moving undo operation that offers a safe way to undo an entire commit. Unlike `git reset`, which alters the existing commit history, `revert` figures out how to invert the changes introduced by the commit and appends a new commit with the resulting inverse content. This prevents Git from losing history, which is crucial for shared repositories.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        `git revert` does not delete history. It creates a new commit that is the inverse of a previous commit. This makes it the safe and standard way to undo changes on a branch that has been pushed and shared with others.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Revert Scenarios</h2>
                    <div className="space-y-6">
                        {revertExamples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{example.description}</p>
                                <CodeBlock code={example.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Git Revert vs. Git Reset</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">git revert</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">git reset</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparisonData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.aspect}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.revert}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.reset}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Potential Issues</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {potentialIssues.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitRevert;