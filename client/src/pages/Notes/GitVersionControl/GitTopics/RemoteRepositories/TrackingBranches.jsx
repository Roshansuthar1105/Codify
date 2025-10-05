import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TrackingBranches = () => {
    const coreConcepts = [
        {
            title: 'What is a Tracking Branch?',
            explanation: "A tracking branch is a local branch that has a direct relationship to a remote branch. When you have a tracking branch, Git knows which remote branch to pull from and push to. This connection is often called the 'upstream' branch.",
            code: `# Check the status of your branches, including tracking information
git branch -vv

# Example output:
# * main                e7a4a2a [origin/main] Add feature X
#   feature-A           a3c4b5d [origin/feature-A: ahead 1] Implement part A
#   fix-bug             f9d8e7c [origin/fix-bug] Hotfix for bug
#   local-experiment    b2a1c3d No tracking information`,
        },
        {
            title: 'Automatic Tracking Setup',
            explanation: 'When you clone a repository, your local `main` or `master` branch is automatically set up to track the corresponding branch on the remote (`origin/main`). Similarly, checking out a remote branch that you don\'t have locally also sets up tracking.',
            code: `# 1. Cloning a repository (automatically sets up tracking for the default branch)
git clone https://github.com/user/repo.git
cd repo
git branch -vv # main will be tracking origin/main

# 2. Checking out a remote branch
# Suppose 'origin/new-feature' exists on the remote, but not locally
git checkout new-feature

# Git creates a local branch 'new-feature' that tracks 'origin/new-feature'
# This is equivalent to: git checkout -b new-feature origin/new-feature`
        },
        {
            title: 'Explicitly Setting Upstream',
            explanation: 'You can manually set or change the upstream branch for your current local branch. This is useful if you created a branch locally and now want to link it to a remote branch.',
            code: `# Push the local branch to the remote and set it as the upstream
git push -u origin my-feature

# The '-u' is a shorthand for '--set-upstream'
# Future pushes from 'my-feature' branch can just use 'git push'

# If the remote branch already exists, you can set it without pushing
git branch --set-upstream-to=origin/main

# Unset the upstream information for the current branch
git branch --unset-upstream`
        }
    ];

    const benefits = [
        "**Simplified Pushing & Pulling**: Once tracking is set, you can use `git pull` and `git push` without specifying the remote or branch name.",
        "**Status Information**: `git status` will tell you if your local branch is ahead, behind, or has diverged from its upstream branch.",
        "**Collaboration**: Makes it clear which remote branch your local work corresponds to, which is essential for team collaboration.",
        "**Context-Aware Tools**: Many Git tools and IDE integrations use this tracking information to provide helpful features and context."
    ];

    const commonMistakes = [
        "**Forgetting `-u`**: Forgetting to use `git push -u origin <branch>` on the first push, requiring you to specify the remote and branch on every subsequent push.",
        "**Pushing to the Wrong Branch**: If you manually set an upstream incorrectly, you might accidentally push changes to the wrong place.",
        "**Diverged History**: When your local branch and the remote branch both have new commits. This requires a `pull` (with merge or rebase) to resolve before you can push.",
        "**Outdated Tracking Info**: If a remote branch is deleted but your local branch still tracks it. You might need to run `git remote prune origin` to clean up."
    ];


    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Tracking Branches
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    In Git, a "tracking branch" is a local branch configured to follow a remote branch. This fundamental concept simplifies your workflow by telling Git where to push your changes and where to fetch updates from. Understanding how to manage these connections is key to efficient collaboration.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        A tracking branch connects your local work to a shared remote repository. This link enables Git to give you contextual information about the state of your branch relative to the remote.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Concepts and Commands</h2>
                    <div className="space-y-6">
                        {coreConcepts.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.explanation}</p>
                                <CodeBlock code={item.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Tracking Branches?</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {benefits.map((benefit, index) => (
                                <li key={`benefit-${index}`} className="text-sm" dangerouslySetInnerHTML={{ __html: benefit }}></li>
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

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Checking Branch Status</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Once tracking is enabled, `git status` provides valuable information about your branch's position relative to its upstream counterpart.</p>
                        <CodeBlock
                            code={`# On branch 'my-feature'
# Your branch is up to date with 'origin/my-feature'.
git status

# On branch 'my-feature'
# Your branch is ahead of 'origin/my-feature' by 2 commits.
#   (use "git push" to publish your local commits)
git status

# On branch 'my-feature'
# Your branch is behind 'origin/my-feature' by 1 commit, and can be fast-forwarded.
#   (use "git pull" to update your local branch)
git status`}
                            language="bash"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TrackingBranches;