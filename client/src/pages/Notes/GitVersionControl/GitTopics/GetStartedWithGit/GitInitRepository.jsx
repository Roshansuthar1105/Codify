import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitInitRepository = () => {
    const scenarios = [
        {
            title: 'Scenario 1: Starting a Brand New Project',
            description: 'If you are starting from scratch, you can have Git create the project directory for you and initialize it at the same time.',
            code: `# This creates a new directory named 'my-new-app' and initializes a Git repository inside it.
git init my-new-app

# Navigate into your new project directory
cd my-new-app`
        },
        {
            title: 'Scenario 2: Adding Git to an Existing Project',
            description: 'If you already have a project folder with files in it, you can turn it into a Git repository by running the command from inside that folder.',
            code: `# First, navigate to your existing project's root directory
cd /path/to/my-existing-project

# Run the init command. This adds a .git folder to your current directory.
git init`
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Initializing A Repository <span className="text-primary-600 dark:text-primary-400">(git init)</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git init` command is the very first step to start tracking a project with Git. It creates a new Git repository from scratch. You can either use it to convert an existing, untracked project into a Git repository or initialize a new, empty one. This command is a one-time setup for any new project.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Function: </strong>
                        `git init` transforms a regular directory into a Git repository by creating a hidden `.git` subdirectory, which contains all the metadata Git needs to track changes.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Scenarios for `git init`</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {scenarios.map((scenario, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{scenario.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{scenario.description}</p>
                                <CodeBlock code={scenario.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Happens When You Run `git init`?</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            When you execute `git init`, Git creates a hidden directory named `.git` in your project's root folder. This directory is the heart of your repository. It contains all the objects, references, and configuration files that make version control possible.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4 text-sm">
                            <li><strong>`objects` directory:</strong> Stores all your files and commits as compressed data.</li>
                            <li><strong>`refs` directory:</strong> Stores pointers to commits (like branches and tags).</li>
                            <li><strong>`HEAD` file:</strong> Points to the branch you are currently working on.</li>
                            <li><strong>`config` file:</strong> Contains repository-specific settings.</li>
                        </ul>
                        <div className="text-primary-500 dark:text-primary-400 mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                            <strong>Important:</strong> You should almost never need to manually edit the contents of the `.git` directory. Git manages these files for you.
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Next Steps: Your First Commit</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Initializing a repository is just the beginning. To actually save the state of your project, you need to add your files to Git's tracking index (staging) and then commit them. This creates your first snapshot.
                        </p>
                        <CodeBlock
                            code={`# After running 'git init', check the status
git status
# On branch master
# No commits yet
# nothing to commit (create/copy files and use "git add" to track)

# Create a new file
echo "Hello World" > README.md

# Add the file to the staging area
git add README.md

# Commit the staged file to the repository's history
git commit -m "Initial commit: Add README file"`}
                            language="bash"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitInitRepository;