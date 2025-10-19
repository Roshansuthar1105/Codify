import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitArchitecture = () => {
    const threeTrees = [
        {
            name: 'Working Directory',
            description: 'This is your project folder with all the files you can see and edit. It\'s your active workspace where you make changes, add new files, and delete old ones.',
            state: 'Untracked / Modified Files'
        },
        {
            name: 'Staging Area (Index)',
            description: 'A unique feature of Git. It\'s an intermediate area where you prepare your next commit. You add snapshots of your changes from the Working Directory to the Staging Area before committing them.',
            state: 'Staged Changes'
        },
        {
            name: 'Repository (.git)',
            description: 'The finalized history of your project. When you commit, the changes from your Staging Area are permanently stored in the repository, which is located in the hidden `.git` directory.',
            state: 'Committed History'
        }
    ];

    const coreWorkflow = `
# 1. You are in the Working Directory. You modify a file.
#    (e.g., edit style.css)

# 2. You add the change to the Staging Area.
#    This tells Git, "I want to include this change in my next commit."
git add style.css

# 3. You can stage multiple files.
git add index.html

# 4. You commit the staged changes to the Repository.
#    This creates a permanent snapshot in the project's history.
git commit -m "Add new hero section and styles"

# After the commit, your Working Directory is clean again.
`;

    const localVsRemote = `
# 1. CLONE: Get a full copy of a remote repository, including its history.
# This creates your local repository.
git clone https://github.com/username/project.git

# 2. PUSH: Send your committed changes from your local repo to the remote repo.
# Share your work with others.
git push origin main

# 3. PULL: Fetch changes from the remote repo and merge them into your local repo.
# Get the latest updates from your team.
git pull origin main
`;

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Understanding</span> Git Architecture
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Git's power lies in its simple yet effective architecture. It operates primarily on a three-stage model that tracks files as they move from your local workspace to the project's permanent history. Understanding this flow is the key to mastering Git and leveraging its full potential for version control.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Architecture Insight: </strong>
                        Git is a <strong>Distributed</strong> Version Control System (DVCS). This means every developer has a complete copy of the project repository, including its entire history, on their local machine.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Three Trees of Git</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {threeTrees.map((tree, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{tree.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow">{tree.description}</p>
                                <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-xs font-mono uppercase text-primary-600 dark:text-primary-400">{tree.state}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Core Git Workflow: From Change to Commit</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        The fundamental workflow in Git involves moving changes between these three trees. You make edits in the Working Directory, selectively add them to the Staging Area, and then commit them to the Repository.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <CodeBlock code={coreWorkflow} language="bash" />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Local vs. Remote Repositories</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        Because Git is distributed, you have the full repository on your machine (<strong>local</strong>). A <strong>remote</strong> repository (like one on GitHub or GitLab) is simply another copy of the project that serves as a central point for collaboration. You synchronize your local repository with the remote one to share and receive changes.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <CodeBlock code={localVsRemote} language="bash" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitArchitecture;