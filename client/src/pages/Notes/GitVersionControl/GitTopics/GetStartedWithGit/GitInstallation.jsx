import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitInstallation = () => {
    const installationGuides = [
        {
            title: 'Windows Installation',
            description: 'Step-by-step guide to install Git on Windows',
            steps: [
                'Download the latest Git for Windows installer from:',
                'https://git-scm.com/download/win',
                'Run the installer with these recommended settings:',
                '- Select "Use Git from Git Bash and Windows Command Prompt"',
                '- Choose "Checkout Windows-style, commit Unix-style line endings"',
                '- Select "Use Windows\' default console window"',
                '- Choose "Default (fast-forward or merge)"',
                '- Select your preferred credential helper'
            ],
            code: `# After installation, verify by opening Command Prompt or Git Bash and run:
git --version
# Should output something like: git version 2.35.1.windows.2`,
            explanation: 'This will install Git with the most commonly used options for Windows development.'
        },
        {
            title: 'macOS Installation',
            description: 'Two methods to install Git on macOS',
            steps: [
                'Option 1: Using Homebrew (recommended):',
                '1. Install Homebrew if you don\'t have it:',
                '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
                '2. Install Git:',
                'brew install git',
                '',
                'Option 2: Using the official installer:',
                '1. Download from: https://git-scm.com/download/mac',
                '2. Open the .dmg file and follow the installation wizard'
            ],
            code: `# Verify installation in Terminal:
git --version
# Should output something like: git version 2.35.1`,
            explanation: 'Homebrew is recommended as it makes it easier to update Git and other development tools.'
        },
        {
            title: 'Linux Installation',
            description: 'Install Git on various Linux distributions',
            steps: [
                'For Debian/Ubuntu-based distributions:',
                'sudo apt update',
                'sudo apt install git',
                '',
                'For Fedora/RHEL/CentOS:',
                'sudo dnf install git',
                '',
                'For Arch Linux:',
                'sudo pacman -S git',
                '',
                'For openSUSE:',
                'sudo zypper install git'
            ],
            code: `# After installation, verify by running:
git --version
# Should output something like: git version 2.35.1`,
            explanation: 'Most Linux distributions include Git in their package repositories, making installation straightforward.'
        }
    ];

    const bestPractices = [
        'Always verify the installation with git --version after installation',
        'Consider setting up your Git identity (name and email) after installation',
        'On Windows, Git Bash provides a better terminal experience than Command Prompt',
        'Keep Git updated to the latest version for security and features'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Installation Guide
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Git is a powerful version control system that helps track changes in source code during software development.
                    This guide provides installation instructions for different operating systems.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Prerequisite: </strong>
                        Ensure you have administrative privileges to install software on your computer.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Installation Guides</h2>
                    <div className="space-y-6">
                        {installationGuides.map((guide, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{guide.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{guide.description}</p>

                                <div className="mb-4">
                                    <ul className="list-disc pl-6 space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                                        {guide.steps.map((step, i) => (
                                            <li key={i} className="text-sm">
                                                {step.startsWith('http') ? (
                                                    <a href={step} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                                        {step}
                                                    </a>
                                                ) : step.startsWith(' ') ? (
                                                    <span className="text-gray-600 dark:text-gray-400">{step}</span>
                                                ) : (
                                                    step
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <CodeBlock code={guide.code} language="bash" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{guide.explanation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={index} className="text-sm">{practice}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Verification</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                            After installation, verify Git is working by running these commands in your terminal:
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                            <CodeBlock
                                code="git --version\ngit --help"
                                language="bash"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitInstallation;
