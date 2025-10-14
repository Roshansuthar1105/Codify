import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const BenefitsOfVersionControl = () => {
    const benefits = [
        {
            title: 'Complete History of Changes',
            description: 'Version control keeps a complete history of all changes made to your codebase, allowing you to track every modification, who made it, and when it was made.',
            example: `# View commit history
git log --oneline --graph --decorate --all

# See changes in a specific commit
git show <commit-hash>

# View changes between two commits
git diff <commit1> <commit2>`,
            explanation: 'This history is invaluable for debugging, understanding why changes were made, and reverting to previous states if something goes wrong.'
        },
        {
            title: 'Branching and Merging',
            description: 'Create separate branches to work on new features or bug fixes without affecting the main codebase until you\'re ready to integrate your changes.',
            example: `# Create and switch to a new branch
git checkout -b feature/new-login

# Work on your changes
git add .
git commit -m "Implement new login feature"

# Switch back to main branch
git checkout main

# Merge your feature branch
git merge feature/new-login`,
            explanation: 'Branching allows multiple developers to work on different features simultaneously without interfering with each other.'
        },
        {
            title: 'Collaboration Made Easy',
            description: 'Version control systems like Git make it easy for teams to collaborate on the same project, even when working remotely.',
            example: `# Clone a remote repository
git clone https://github.com/username/repository.git

# Fetch and merge changes from remote
git pull origin main

# Push your changes to the remote repository
git push origin feature/new-feature`,
            explanation: 'Team members can work on different parts of the project and merge their changes together seamlessly.'
        },
        {
            title: 'Backup and Recovery',
            description: 'Version control acts as a backup of your codebase, protecting against data loss from hardware failures or accidental deletions.',
            example: `# Recover a deleted file
git checkout HEAD -- path/to/deleted/file.js

# Revert to a previous commit
git revert <commit-hash>

# Reset to a specific commit (use with caution!)
git reset --hard <commit-hash>`,
            explanation: 'With version control, you can always roll back to a previous working state if something goes wrong.'
        },
        {
            title: 'Code Reviews and Quality Control',
            description: 'Version control enables code reviews through pull requests, helping maintain code quality and share knowledge among team members.',
            example: `# Create a pull request on GitHub
# 1. Push your branch to remote
# 2. Open a pull request on GitHub
# 3. Team members review and comment on changes
# 4. After approval, merge the pull request`,
            explanation: 'Code reviews help catch bugs early, improve code quality, and spread knowledge across the team.'
        }
    ];

    const bestPractices = [
        'Commit often with clear, descriptive messages',
        'Create feature branches for new work',
        'Write meaningful commit messages that explain "why" not just "what"',
        'Regularly pull changes from the main branch to stay up-to-date',
        'Review changes before committing (git diff --staged)'
    ];

    const commonScenarios = [
        {
            title: 'Undoing Changes',
            commands: [
                'git checkout -- file.js  # Discard changes in working directory',
                'git reset HEAD~1        # Undo last commit, keep changes',
                'git revert <commit>     # Create a new commit that undoes a previous commit'
            ]
        },
        {
            title: 'Resolving Merge Conflicts',
            commands: [
                'git status              # See which files have conflicts',
                '# Edit files to resolve conflicts',
                'git add .               # Mark conflicts as resolved',
                'git commit -m "Resolve merge conflicts"'
            ]
        },
        {
            title: 'Temporary Work',
            commands: [
                'git stash               # Save uncommitted changes temporarily',
                'git stash list          # List stashed changes',
                'git stash apply         # Apply most recent stash',
                'git stash drop          # Discard most recent stash'
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Benefits of</span> Version Control
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Version control is an essential tool for modern software development. It helps developers track and manage changes to code over time, collaborate with others, and maintain a history of their work. Whether you're working alone or as part of a team, version control provides numerous benefits that improve productivity and code quality.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Version control is not just about storing code - it's about enabling better collaboration, maintaining code quality, and having the confidence to make changes knowing you can always recover if something goes wrong.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Benefits</h2>
                    <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{benefit.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{benefit.description}</p>
                                <CodeBlock code={benefit.example} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{benefit.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Scenarios</h3>
                        <div className="space-y-4">
                            {commonScenarios.map((scenario, index) => (
                                <div key={`scenario-${index}`}>
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">{scenario.title}</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mt-1">
                                        <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                                            {scenario.commands.join('\n')}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm">{practice}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Getting Started with Git</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">Basic Git Workflow</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Initialize a new repository: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git init</code></li>
                            <li>Create a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.gitignore</code> file to exclude files</li>
                            <li>Stage your changes: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git add .</code></li>
                            <li>Commit your changes: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git commit -m "Initial commit"</code></li>
                            <li>Add a remote repository: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git remote add origin [repository-url]</code></li>
                            <li>Push your changes: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git push -u origin main</code></li>
                        </ol>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BenefitsOfVersionControl;
