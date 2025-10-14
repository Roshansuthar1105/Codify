import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitMerge = () => {
    const mergeWorkflow = [
        {
            step: 1,
            title: 'Prepare Your Receiving Branch',
            description: 'Before merging, always switch to the branch you want to merge INTO (usually `main`) and make sure it\'s up-to-date with the remote repository.',
            code: `git checkout main\ngit pull origin main`
        },
        {
            step: 2,
            title: 'Run the Merge Command',
            description: 'While on the receiving branch (`main`), run the `git merge` command, specifying the name of the branch you want to merge.',
            code: `git merge feature/new-login`
        },
        {
            step: 3,
            title: 'Resolve Conflicts (If Any)',
            description: 'If Git cannot automatically combine the changes, it will pause the merge and ask you to resolve the conflicts manually. (More on this below).',
            code: `# Git will notify you of conflicts here`
        },
        {
            step: 4,
            title: 'Clean Up',
            description: 'After a branch has been successfully merged, it\'s good practice to delete it to keep your repository clean.',
            code: `git branch -d feature/new-login`
        }
    ];

    const bestPractices = [
        'Merge often to keep feature branches from diverging too far from `main`.',
        'Always update your `main` branch (`git pull`) before merging.',
        'Resolve merge conflicts in small, manageable chunks.',
        'Communicate with your team to avoid working on the same lines of code unnecessarily.',
        'Review the changes before completing a merge.'
    ];

    const commonMistakes = [
        'Forgetting which branch you are on and merging in the wrong direction.',
        'Resolving conflicts by simply accepting "your" changes without understanding what the other changes do.',
        'Letting a branch live for too long, resulting in a massive, complex merge.',
        'Not deleting merged branches, which clutters the repository.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Merging</span> Branches (git merge)
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    After you've completed work on a feature or bugfix in a separate branch, the next step is to integrate those changes back into your main line of development. This process is called <strong>merging</strong>. The <code>git merge</code> command takes the independent lines of development created by branches and combines them into a single branch.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        When you merge, you are telling Git: "Take the changes from this feature branch and apply them to my main branch." Git will look at the commits on both branches and try to combine them into one unified history.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Basic Merge Workflow</h2>
                    <div className="space-y-4">
                        {mergeWorkflow.map((item) => (
                            <div key={item.step} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{`Step ${item.step}: ${item.title}`}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                                <CodeBlock language="bash" code={item.code} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Handling Merge Conflicts</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            A <strong>merge conflict</strong> occurs when Git is unable to automatically resolve differences in code between two commits. This usually happens when two developers have changed the <strong>same lines</strong> in the <strong>same file</strong> on different branches. Git will pause the merge and mark the file as conflicted so a human can decide which changes to keep.
                        </p>
                        <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Example of a Conflict Marker:</h4>
                        <CodeBlock language="javascript" code={`<<<<<<< HEAD
// Code from your current branch (e.g., main)
const greeting = "Hello, World!";
=======
// Code from the branch you are merging (e.g., feature)
const greeting = "Hello, Universe!";
>>>>>>> feature/new-greeting`} />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                            To resolve this, you must edit the file to remove the markers (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/new-greeting</code>) and manually decide which code to keep. Then, you <code>git add</code> the resolved file and <code>git commit</code> to finalize the merge.
                        </p>
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

export default GitMerge;