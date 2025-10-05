import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ForkingWorkflow = () => {
    const workflowSteps = [
        {
            title: 'Step 1: Fork the Repository',
            description: "This creates a personal, server-side copy of the original ('upstream') repository under your own account. You have full write access to this fork.",
            code: `# On GitHub/GitLab/etc., click the 'Fork' button on the original repository's page.
# This creates a copy, for example: https://github.com/YourUsername/OriginalRepo`
        },
        {
            title: 'Step 2: Clone Your Fork',
            description: "Download your forked repository to your local machine. This is where you'll make your changes. 'origin' will automatically point to your fork.",
            code: `git clone https://github.com/YourUsername/OriginalRepo.git
cd OriginalRepo`
        },
        {
            title: 'Step 3: Add the Upstream Remote',
            description: "To keep your fork updated with the original project, add a remote that points to it. It's conventionally named 'upstream'.",
            code: `# Add the original repository as a remote named 'upstream'
git remote add upstream https://github.com/OriginalOwner/OriginalRepo.git

# Verify the new remote
git remote -v
# origin    https://github.com/YourUsername/OriginalRepo.git (fetch)
# origin    https://github.com/YourUsername/OriginalRepo.git (push)
# upstream  https://github.com/OriginalOwner/OriginalRepo.git (fetch)
# upstream  https://github.com/OriginalOwner/OriginalRepo.git (push)`
        },
        {
            title: 'Step 4: Create a Branch, Make Changes, and Commit',
            description: "Create a new branch for your feature or bug fix. This isolates your work and keeps the main branch clean.",
            code: `# Create a new branch for your work
git checkout -b new-feature

# Make your code changes...
# Stage and commit them
git add .
git commit -m "feat: Implement the new feature"`
        },
        {
            title: 'Step 5: Push Changes to Your Fork (origin)',
            description: "Push your new feature branch to your forked repository on the remote server.",
            code: `git push origin new-feature`
        },
        {
            title: 'Step 6: Create a Pull Request (PR)',
            description: "From your fork on GitHub/GitLab, create a pull request to the original 'upstream' repository. This proposes your changes to the project maintainers.",
            code: `# Go to your fork on GitHub.
# You will see a prompt to 'Compare & pull request'.
# Click it, fill out the details, and submit the PR.`
        },
        {
            title: 'Step 7: Sync Your Fork with Upstream',
            description: "Periodically, you should update your fork's main branch with any changes from the original project to avoid conflicts.",
            code: `# Switch to your main branch
git checkout main

# Fetch the latest changes from the upstream repository
git fetch upstream

# Merge upstream's main branch into your local main branch
git merge upstream/main

# Push the updates to your fork's (origin) main branch
git push origin main`
        }
    ];

    const advantages = [
        'Allows contributions without giving collaborators write access to the original repository.',
        'Provides a clean project history as maintainers control the merging process.',
        'Gives contributors full control over their own server-side repository (the fork).',
        'Isolates all contributor work from the official repository until it is ready to be reviewed.',
        'Ideal for large, distributed teams and especially for open-source projects.'
    ];
    
    const whenToUse = [
        'When contributing to open-source projects (e.g., on GitHub).',
        'In large organizations where you want to restrict direct access to a central repository.',
        'When you want to use a project as a starting point for your own work.',
        'Any scenario where contributors are not trusted with direct push access to a project.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                The <span className="text-primary-600 dark:text-primary-400">Git</span> Forking Workflow
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The Forking Workflow is fundamentally different from other popular Git workflows because it gives every developer their own server-side repository. It's the standard model for open-source projects, allowing for safe and clean contributions from a large number of people without granting them direct access to the source code.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        The main idea is that contributions are not pushed directly to the official repository. Instead, they are pushed to a contributor's own forked copy, and then proposed to the main project through a pull request.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Workflow Steps</h2>
                    <div className="space-y-6">
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{step.description}</p>
                                <CodeBlock code={step.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Advantages</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {advantages.map((item, index) => (
                                <li key={`adv-${index}`} className="text-sm">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">When to Use It</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {whenToUse.map((item, index) => (
                                <li key={`use-${index}`} className="text-sm">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ForkingWorkflow;