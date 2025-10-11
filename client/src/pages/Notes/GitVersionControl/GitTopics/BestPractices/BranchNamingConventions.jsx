import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const BranchNamingConventions = () => {
    const conventionExamples = [
        {
            category: 'Feature Branches',
            prefix: 'feature/',
            description: 'Used for developing new features. The name should clearly describe the feature being added.',
            examples: `
# Good Examples
feature/user-authentication
feature/add-dark-mode-toggle
feature/PROJ-123-implement-search-api
`
        },
        {
            category: 'Bugfix Branches',
            prefix: 'bugfix/ or fix/',
            description: 'Used for fixing bugs. It\'s helpful to include the issue or ticket number if you use a tracking system.',
            examples: `
# Good Examples
fix/login-button-not-working
bugfix/TICKET-451-fix-user-avatar-display
fix/PROJ-245-resolve-api-timeout
`
        },
        {
            category: 'Release Branches',
            prefix: 'release/',
            description: 'Used to prepare for a new production release. They allow for last-minute bug fixes and preparation.',
            examples: `
# Good Examples
release/v1.2.0
release/v2.0.0-beta
`
        },
        {
            category: 'Hotfix Branches',
            prefix: 'hotfix/',
            description: 'Used for critical, urgent fixes to the production version. These branch off from your main production branch.',
            examples: `
# Good Examples
hotfix/urgent-security-vulnerability
hotfix/v1.1.1-critical-db-connection-fix
`
        }
    ];

    const bestPractices = [
        'Be descriptive but concise. The name should communicate intent.',
        'Use hyphens `-` to separate words, not underscores `_` or camelCase.',
        'Start with a category prefix like `feature/` or `fix/` for organization.',
        'Include a ticket/issue ID if your team uses a project management tool (e.g., `feature/PROJ-123-name`).',
        'Use all lowercase letters to avoid case-sensitivity issues across different operating systems.',
        'Avoid using personal names in branches (e.g., `johns-feature`).'
    ];

    const commonMistakes = [
        'Vague or generic names like `dev`, `changes`, `my-branch`, or `bug_fix`.',
        'Inconsistent naming schemes within the same project.',
        'Making branch names excessively long and difficult to type or read.',
        'Using special characters or spaces that can cause issues with shell commands.',
        'Forgetting to delete branches after they have been merged, leading to clutter.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Good Practices: Branch Naming
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A consistent branch naming convention is a simple yet powerful tool for improving a project's clarity and organization. Well-named branches make it easier for team members to understand what work is in progress, streamline code reviews, and simplify the project's history. It's a form of communication that costs little but pays great dividends.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Treat branch names as a crucial part of your project's documentation. A good name instantly tells a story about its purpose, making your Git history transparent and easy to navigate.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Naming Patterns</h2>
                    <div className="space-y-6">
                        {conventionExamples.map((conv, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                                    {conv.category} (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">{conv.prefix}</code>)
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{conv.description}</p>
                                <CodeBlock code={conv.examples} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm">{practice}</li>
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

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">A Clean Branch List</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        When your team follows a convention, the output of `git branch` becomes a clear, at-a-glance summary of all ongoing work.
                    </p>
                    <CodeBlock
                        code={`$ git branch

* feature/PROJ-488-user-profile-page
  fix/PROJ-480-api-rate-limit
  hotfix/v2.1.1-fix-critical-login-bug
  main
  release/v2.2.0`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default BranchNamingConventions;
