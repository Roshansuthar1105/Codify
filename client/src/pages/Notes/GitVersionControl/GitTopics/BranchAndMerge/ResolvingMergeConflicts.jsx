import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ResolvingMergeConflicts = () => {
    const conflictScenarios = [
        {
            title: 'Concurrent Line Edits',
            description: 'The most common cause. You and another developer edit the exact same lines in the same file on different branches. Git doesn\'t know which version to keep.'
        },
        {
            title: 'File Deleted vs. Modified',
            description: 'One developer deletes a file in their branch, while another developer modifies that same file in theirs. Git needs to know whether to delete the file or keep the modified version.'
        }
    ];

    const resolutionSteps = [
        {
            step: '1. Identify the Conflicted Files',
            description: 'When you run `git merge` or `git pull`, Git will stop and tell you exactly which files have conflicts. You can also run `git status` to see a list of "unmerged paths".',
            code: `git merge feature-branch
# Auto-merging index.js
# CONFLICT (content): Merge conflict in index.js
# Automatic merge failed; fix conflicts and then commit the result.`
        },
        {
            step: '2. Open and Edit the File(s)',
            description: 'Open the conflicted file in your code editor. You will see the conflict markers added by Git. Your task is to edit the file to be exactly how you want it, removing all the markers.',
            code: `// You might see something like this:
${'<<<<<<< HEAD'}
  console.log("Hello World");
${'======='}
  console.log("Hello Universe");
${'>>>>>>> feature-branch'}

// You decide what the final code should be, for example:
  console.log("Hello World and Universe");`
        },
        {
            step: '3. Stage the Resolved File',
            description: 'After you have manually edited the file and are satisfied with its final state, you must tell Git that the conflict is resolved by staging the file.',
            code: `git add index.js`
        },
        {
            step: '4. Commit the Merge',
            description: 'Once all conflicted files have been staged, you can finalize the merge by creating a commit. Git will usually create a default commit message for you.',
            code: `git commit
# A text editor might open with a pre-filled message like:
# "Merge branch 'feature-branch'"
# Simply save and close the editor to complete the commit.`
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Resolving</span> Merge Conflicts
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A merge conflict is not an error; it's Git's way of saying, "I don't know how to combine these changes automatically, so I need your help." Conflicts happen when Git is unable to resolve differences in code between two commits. Learning to handle them calmly and correctly is a crucial skill for any developer working in a team.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Takeaway: </strong>
                        Git marks the conflicted areas in your files with special markers (`${'<<<<<<<'}`, `${'======='}`, `${'>>>>>>>'}`). Your job is to edit these files to keep the code you want, remove the markers, and then tell Git you're done.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Conflicts Happen</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {conflictScenarios.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Anatomy of a Conflict</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                            When a conflict occurs, Git edits the file to show you both versions of the conflicting code.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4 text-sm">
                            <li>`{'<<<<<<< HEAD'}` marks the beginning of the changes from your current branch.</li>
                            <li>`{"======="}` separates the two sets of conflicting changes.</li>
                            <li>`{'>>>>>>> branch-name'}` marks the end of the changes from the branch you are trying to merge in.</li>
                        </ul>
                        <CodeBlock language="javascript" code={`function greet() {
${'<<<<<<< HEAD'}
  // This is the version in your current branch
  console.log("Hello from the main branch!");
${'======='}
  // This is the version from the feature-branch
  console.log("Howdy from the feature branch!");
${'>>>>>>> feature-branch'}
}`} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Step-by-Step Resolution Process</h2>
                    <div className="space-y-6">
                        {resolutionSteps.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.step}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                                <CodeBlock language="bash" code={item.code} />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-8 bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Helpful Tips</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="text-sm"><strong>Merge Often:</strong> Pull or merge from the main branch frequently to deal with smaller, more manageable conflicts.</li>
                        <li className="text-sm"><strong>Use a GUI Tool:</strong> Modern editors like VS Code have excellent merge conflict resolution tools that let you visually compare changes and click to accept one version or the other.</li>
                        <li className="text-sm"><strong>Communicate:</strong> Talk to your teammates to avoid working on the exact same part of the code at the same time.</li>
                        <li className="text-sm"><strong>Abort Mission:</strong> If you get overwhelmed or make a mistake, you can always cancel the merge process with `git merge --abort`. This will return you to the state before you started the merge.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ResolvingMergeConflicts;