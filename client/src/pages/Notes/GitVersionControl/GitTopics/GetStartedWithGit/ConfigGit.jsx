import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ConfigGit = () => {
    const editorConfigs = [
        {
            editor: 'Visual Studio Code',
            command: `git config --global core.editor "code --wait"`
        },
        {
            editor: 'Sublime Text',
            command: `git config --global core.editor "subl -n -w"`
        },
        {
            editor: 'Atom',
            command: `git config --global core.editor "atom --wait"`
        },
        {
            editor: 'Vim (often a default)',
            command: `git config --global core.editor "vim"`
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Configuring</span> Git
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Before you start making commits, you should tell Git who you are. This is a crucial first step on any new machine because every commit you make will be stamped with this information. You can also configure your preferred text editor for writing commit messages and other tasks.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">One-Time Setup: </strong>
                        You typically only need to set these configuration values once per computer using the `--global` flag. Git will then use this information for all of your projects on that machine.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Setting Your Identity</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Git uses your name and email to identify who made each commit. This information becomes a permanent part of the project's history. It’s important to use the same email address that you use for your hosting service (like GitHub or GitLab).
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">User Name & Email</h3>
                        <CodeBlock
                            language="bash"
                            code={`# Set your name for all repositories on this machine
git config --global user.name "Your Name"

# Set your email for all repositories on this machine
git config --global user.email "youremail@example.com"`}
                        />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Configuring Your Default Editor</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        When Git needs you to type a message, like for a commit, it will open your default text editor. You can configure this to be any editor you prefer.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="grid md:grid-cols-2 gap-4">
                            {editorConfigs.map((config, index) => (
                                <div key={index}>
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{config.editor}</h4>
                                    <CodeBlock language="bash" code={config.command} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Checking Your Settings</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        To verify your configuration settings, you can use the `git config --list` command to see all the settings Git can find. You can also check a specific value by key.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <CodeBlock
                            language="bash"
                            code={`# See all of your global configuration settings
git config --global --list

# Check a specific setting, like your username
git config user.name`}
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            You can omit `--global` to see all settings (local, global, and system) that apply to your current location.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Configuration Levels</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Global Configuration</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Using the `--global` flag writes settings to a file in your home directory (e.g., `~/.gitconfig`). These settings apply to <strong>every repository</strong> on your system for your user account.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Local Configuration</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Omitting the `--global` flag (or using `--local`) writes to a file in the current repository's `.git` directory (`.git/config`). These settings apply <strong>only to that specific repository</strong> and override global settings.
                            </p>
                            <CodeBlock language="bash" code={`# Inside a project, set an email just for this repo
git config user.email "work.email@company.com"`} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ConfigGit;