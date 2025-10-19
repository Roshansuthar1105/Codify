import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitFetch = () => {
    const fetchVsPull = [
        {
            command: 'git fetch',
            description: 'This is the "safe" option. It downloads all the new data from the remote repository but doesn\'t integrate any of it into your working files. It updates your remote-tracking branches (like `origin/main`).',
            action: 'Downloads remote changes only.',
            result: 'Your local work is untouched. You can inspect the fetched changes before deciding to merge them.'
        },
        {
            command: 'git pull',
            description: 'This is more aggressive. It\'s a combination of two commands: <code>git fetch</code> followed by `git merge`. It downloads the new data AND immediately tries to merge it into your current branch.',
            action: 'Downloads remote changes AND merges them.',
            result: 'Your local work is updated with remote changes, which can sometimes lead to unexpected merge conflicts.'
        }
    ];

    const commonScenarios = [
        {
            title: 'Checking for Upstream Changes',
            description: 'Before starting a new feature, run <code>git fetch</code> to see if any teammates have pushed updates. This allows you to plan your work around the latest version of the project.'
        },
        {
            title: 'Code Reviews',
            description: 'You can fetch a colleague\'s feature branch to your local machine to review their code and test it without it affecting your own branches.'
        },
        {
            title: 'Cleaning Up Stale Branches',
            description: 'Using `git fetch --prune` removes remote-tracking branches from your local repository that have been deleted on the remote, keeping your branch list clean.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Understanding</span> Git Fetch
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code>git fetch</code> command is a fundamental part of collaborating with others using Git. Its primary job is to communicate with a remote repository (like one on GitHub) and download any new information—commits, files, and branches—that you don't have yet. Crucially, <code>git fetch</code> does not change your own local work. It's a safe way to update your local repository with the latest from the remote.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong>
                        <code>git fetch</code> lets you look at what has changed on the remote server, but it doesn't force you to merge those changes into your work. It downloads the data and lets you decide what to do with it.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4"><span className='text-primary-600 dark:text-primary-400'>git fetch</span> vs. <span className='text-primary-600 dark:text-primary-400'>git pull</span></h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        This is the most common point of confusion for developers new to Git. While they seem similar, they have a critical difference in what they do to your local code.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {fetchVsPull.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3 font-mono">{item.command}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-800 dark:text-white"><strong className="font-semibold">Action:</strong> {item.action}</p>
                                    <p className="text-gray-800 dark:text-white"><strong className="font-semibold">Result:</strong> {item.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Safe Update Workflow</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        Using `fetch` allows for a more intentional and safe workflow for updating your local branches.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <CodeBlock language="bash" code={`# 1. Fetch the latest info from the 'origin' remote
git fetch origin

# At this point, your local 'main' branch is unchanged.
# The changes are stored in a remote-tracking branch called 'origin/main'.

# 2. (Optional) See the differences between your local branch and the fetched branch
git diff main origin/main

# 3. If you are ready, merge the fetched changes into your local branch
git merge origin/main`} />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">This three-step process gives you full control and prevents unexpected changes to your code.</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Scenarios</h2>
                    <div className="space-y-6">
                        {commonScenarios.map((scenario, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{scenario.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{scenario.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitFetch;