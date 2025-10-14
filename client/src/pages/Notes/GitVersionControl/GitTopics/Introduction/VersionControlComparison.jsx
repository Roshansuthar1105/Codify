import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const VersionControlComparison = () => {
    const vcTypes = [
        {
            type: 'Centralized Version Control (CVCS)',
            description: 'A single, central repository on a server that stores all the versioned files. Users check out files from this central server to their local machines.',
            characteristics: [
                'Single point of failure (if server goes down, developers cannot collaborate)',
                'Requires network connection for most operations',
                'Easier to understand for beginners',
                'Examples: Subversion (SVN), Perforce, CVS',
                'All users have access to the same central repository',
                'Branching can be expensive and is often avoided'
            ],
            workflow: `# Typical CVCS workflow
# 1. Connect to the central repository
svn checkout https://example.com/svn/repo/trunk

# 2. Make changes locally
# 3. Update from central repository (resolve any conflicts)
svn update

# 4. Commit changes back to central repository
svn commit -m "Update documentation"`
        },
        {
            type: 'Distributed Version Control (DVCS)',
            description: 'Every user has a complete copy of the repository, including its full history. Changes are shared between repositories as a separate step.',
            characteristics: [
                'No single point of failure',
                'Most operations are performed locally (faster, works offline)',
                'Branching and merging are lightweight and encouraged',
                'Examples: Git, Mercurial, Bazaar',
                'Supports various workflows (centralized, integration manager, etc.)',
                'Better support for open-source contributions'
            ],
            workflow: `# Typical DVCS workflow
# 1. Clone a repository (creates full local copy)
git clone https://github.com/username/repo.git

# 2. Make changes locally
# 3. Stage and commit changes
git add .
git commit -m "Add new feature"

# 4. Push changes to remote repository
git push origin main

# 5. Pull changes from others
git pull origin main`
        }
    ];

    const comparison = [
        {
            aspect: 'Repository Access',
            centralized: 'Single central repository',
            distributed: 'Every user has a complete repository'
        },
        {
            aspect: 'Network Requirement',
            centralized: 'Required for most operations',
            distributed: 'Only needed when syncing with others'
        },
        {
            aspect: 'Speed',
            centralized: 'Slower (network dependent)',
            distributed: 'Faster (most operations are local)'
        },
        {
            aspect: 'Branching',
            centralized: 'Heavyweight, often avoided',
            distributed: 'Lightweight and encouraged'
        },
        {
            aspect: 'Flexibility',
            centralized: 'Limited workflow options',
            distributed: 'Supports multiple workflows'
        },
        {
            aspect: 'Learning Curve',
            centralized: 'Easier to learn',
            distributed: 'More complex concepts to master'
        }
    ];

    const whenToUse = [
        {
            type: 'Choose Centralized When',
            reasons: [
                'Working in a strictly controlled enterprise environment',
                'Need fine-grained access control to parts of the codebase',
                'Working with large binary files that don\'t merge well',
                'Team is more comfortable with a simpler workflow'
            ]
        },
        {
            type: 'Choose Distributed When',
            reasons: [
                'Working with open-source projects',
                'Need to work offline or with unreliable network connections',
                'Want to experiment with branches and features',
                'Working in a team that values flexibility and autonomy'
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Version Control</span> Comparison
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Version control systems come in two main flavors: centralized and distributed. Understanding the differences between these approaches is crucial for choosing the right tool for your project and team. This guide will help you understand the key characteristics, advantages, and use cases for each type.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Insight: </strong>
                        The main difference is that centralized systems have a single central repository, while distributed systems give each developer their own complete repository with full history.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Types of Version Control Systems</h2>
                    <div className="space-y-6">
                        {vcTypes.map((vc, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{vc.type}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{vc.description}</p>
                                
                                <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Characteristics:</h4>
                                <ul className="list-disc pl-6 space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                                    {vc.characteristics.map((char, i) => (
                                        <li key={i} className="text-sm">{char}</li>
                                    ))}
                                </ul>

                                <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Workflow Example:</h4>
                                <CodeBlock code={vc.workflow} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Side-by-Side Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Centralized</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Distributed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparison.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.aspect}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.centralized}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.distributed}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">When to Use Each</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whenToUse.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{item.type}</h3>
                                <ul className="space-y-2">
                                    {item.reasons.map((reason, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">•</span>
                                            <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Migration Between Systems</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Many teams migrate from centralized to distributed systems as their needs grow. Tools like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git-svn</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">hg convert</code> can help with this transition.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Example: Converting SVN to Git</h4>
                            <CodeBlock 
                                code={`# Install git-svn if not already installed
# For Ubuntu/Debian: sudo apt-get install git-svn
# For macOS: brew install git-svn

# Clone an SVN repository
git svn clone https://svn.example.com/repo --stdlayout --prefix=origin/

# The repository is now a Git repository with full history
# You can now add a Git remote and push to it
git remote add github https://github.com/username/repo.git
git push -u github main`}
                                language="bash"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VersionControlComparison;
