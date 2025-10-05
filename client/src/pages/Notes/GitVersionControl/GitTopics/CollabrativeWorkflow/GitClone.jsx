import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitClone = () => {
    const cloneExamples = [
        {
            title: 'Clone using HTTPS',
            code: `# Find the HTTPS URL on the repository page (e.g., GitHub, GitLab)
git clone https://github.com/username/repository-name.git`,
            explanation: 'This is the most common method. It works everywhere but may require you to enter your username and password (or a personal access token) when pushing changes.'
        },
        {
            title: 'Clone using SSH',
            code: `# You must have an SSH key configured with your Git provider.
git clone git@github.com:username/repository-name.git`,
            explanation: 'This method is more secure and convenient for frequent contributors as it doesn\'t require you to enter your credentials every time.'
        },
        {
            title: 'Clone into a Specific Directory',
            code: `# The command will create a new folder named 'my-project-folder'
git clone https://github.com/username/repository-name.git my-project-folder`,
            explanation: 'By default, Git creates a directory with the same name as the repository. You can provide an extra argument to specify a different directory name.'
        },
        {
            title: 'Clone a Specific Branch',
            code: `# Use the --branch flag (or -b)
git clone --branch develop https://github.com/username/repository-name.git

# This is equivalent to:
# git clone https://github.com/username/repository-name.git
# cd repository-name
# git checkout develop`,
            explanation: 'This is useful when you only need to work on a specific feature branch and want to avoid checking out the default branch first.'
        },
        {
            title: 'Shallow Clone (Limited History)',
            code: `# Clone only the latest commit
git clone --depth 1 https://github.com/username/repository-name.git

# Clone the latest 5 commits
git clone --depth 5 https://github.com/username/repository-name.git`,
            explanation: 'A shallow clone downloads only a specified number of recent commits, resulting in a much smaller and faster download. This is ideal for CI/CD pipelines or when you don\'t need the full project history.'
        },
    ];

    const keyFlags = [
        { name: '--branch <name>', description: 'Checkout a specific branch instead of the default.' },
        { name: '--depth <depth>', description: 'Creates a shallow clone with a history truncated to the specified number of commits.' },
        { name: '--bare', description: 'Creates a bare repository (no working directory), typically used for servers.' },
        { name: '--mirror', description: 'Sets up a mirror of the original repository, including all remote branches and tags.' },
        { name: '--quiet', description: 'Operates quietly. Suppresses progress and other messages.' },
    ];
    
    const troubleshooting = [
        { issue: 'Permission denied (publickey)', resolution: 'Ensure your SSH key is correctly added to your local SSH agent and your Git provider account.' },
        { issue: 'Repository not found', resolution: 'Double-check the repository URL for typos. Ensure you have access rights to the repository.' },
        { issue: 'Authentication failed', resolution: 'If using HTTPS, you may need a Personal Access Token (PAT) instead of your password. Your password might have expired or been changed.' },
        { issue: 'fatal: destination path already exists', resolution: 'The directory you are trying to clone into is not empty. Choose a different directory name or remove the existing one.' },
    ];


    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Cloning A Repository <span className="text-primary-600 dark:text-primary-400">(git clone)</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git clone` command is your entry point to contributing to an existing codebase. It creates a local copy of a remote repository on your machine, allowing you to work on the project files. This local copy contains the complete history of the project and maintains a connection to the original repository.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        `git clone` does more than just download files. It initializes a new Git repository, copies all the data (commits, branches, tags) from the remote, and automatically sets up a tracking connection to the cloned URL under the name "origin".
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Cloning Scenarios</h2>
                    <div className="space-y-6">
                        {cloneExamples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Flags & Options</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            {keyFlags.map((flag, index) => (
                                <li key={`flag-${index}`} className="text-sm">
                                    <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono text-primary-600 dark:text-primary-400">{flag.name}</code>: {flag.description}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Troubleshooting</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {troubleshooting.map((item, index) => (
                                <li key={`mistake-${index}`} className="text-sm">
                                    <strong>{item.issue}:</strong> {item.resolution}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover-border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">HTTPS vs. SSH: Which to Choose?</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Your choice of URL (HTTPS or SSH) determines how you authenticate with the remote server.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li><strong>HTTPS:</strong> Easy to start with and works behind firewalls. Best for public or read-only access, or if you don't want to set up SSH keys. Requires authentication (password or token) for pushing.</li>
                        <li><strong>SSH:</strong> More secure and convenient for developers who contribute frequently. After a one-time setup of SSH keys, you won't need to re-enter your credentials. This is the preferred method for most developers.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GitClone;