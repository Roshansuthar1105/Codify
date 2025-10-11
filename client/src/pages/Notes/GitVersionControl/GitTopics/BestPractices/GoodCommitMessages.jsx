import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GoodCommitMessages = () => {
    const rules = [
        {
            rule: '1. Separate subject from body with a blank line',
            explanation: 'Tools like `git log` and `git rebase` use this separation to format output. The subject is the summary, the body is the detail.'
        },
        {
            rule: '2. Limit the subject line to 50 characters',
            explanation: 'This keeps commit summaries concise and readable in various Git tools and on platforms like GitHub, which often truncates longer subjects.'
        },
        {
            rule: '3. Capitalize the subject line',
            explanation: 'This is a stylistic convention that makes the subject line read like a standard title or sentence heading.'
        },
        {
            rule: '4. Do not end the subject line with a period',
            explanation: 'The subject line is treated as a title, and titles typically do not end with a period. It also saves precious characters.'
        },
        {
            rule: '5. Use the imperative mood in the subject line',
            explanation: 'Write the subject as if you are giving a command (e.g., "Fix bug," not "Fixed bug" or "Fixes bug"). This matches Git\'s own style for automatically generated messages (e.g., "Merge branch...").'
        },
        {
            rule: '6. Wrap the body at 72 characters',
            explanation: 'This ensures that the commit message body is easy to read in terminals and other interfaces without forcing awkward line wraps.'
        },
        {
            rule: '7. Use the body to explain what and why vs. how',
            explanation: 'The code itself shows *how* the change was made. The commit message body should provide the context: *What* was the problem, and *why* is this the right solution?'
        }
    ];

    const examples = [
        {
            title: 'Fixing a Bug',
            bad: 'Fixed the login issue',
            good: `Fix: Correct redirect loop on login page

The previous logic did not handle cases where the user was
already authenticated but accessed the login page directly,
causing an infinite redirect.

This change introduces a check at the top of the component to
redirect authenticated users to the dashboard immediately.

Resolves: #431`
        },
        {
            title: 'Adding a Feature',
            bad: 'added user export',
            good: `Feat: Add CSV export for user data

Implement a new endpoint /api/users/export that allows admins
to download a CSV file of all users in the system.

The "Export to CSV" button is now available on the main
user management dashboard.`
        },
        {
            title: 'Improving Performance',
            bad: 'made things faster',
            good: `Perf: Optimize image loading with lazy loading

Refactor the main image component to use the Intersection
Observer API. Images outside the viewport are no longer loaded
on initial page render, significantly improving the Largest
Contentful Paint (LCP) score.`
        }
    ];

    const bestPractices = [
        'Keep commits small and focused on a single logical change.',
        'Proofread your messages before committing.',
        'If your commit addresses an issue, reference it in the body or footer (e.g., `Fixes #123`).',
        'Follow your team\'s established conventions for commit messages.',
        'A good commit message provides context that the code alone cannot.'
    ];

    const commonMistakes = [
        'Writing vague messages like "Fixes" or "Changes".',
        'Putting multiple unrelated changes into a single commit.',
        'Explaining *how* the code works instead of *why* the change was necessary.',
        'Writing long, rambling subject lines that get cut off.',
        'Ignoring established conventions like the imperative mood.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Writing <span className="text-primary-600 dark:text-primary-400">Good</span> Commit Messages
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A well-crafted Git commit message is a form of communication. It tells a story of your project's history, making it easier for you and your team to understand why a change was made, debug issues, and collaborate effectively. Adopting a clear and consistent style is one of the hallmarks of a professional developer.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Insight: </strong>
                        Treat your commit messages as documentation for the future. Your primary audience is your future self and your teammates who need to understand the "why" behind a change, not just the "what."
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The 7 Rules of a Great Commit Message</h2>
                    <div className="space-y-4">
                        {rules.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.rule}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Good vs. Bad Examples</h2>
                    <div className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-red-500 dark:text-red-400 mb-2">Bad 👎</h4>
                                        <CodeBlock code={example.bad} language="bash" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-500 dark:text-green-400 mb-2">Good 👍</h4>
                                        <CodeBlock code={example.good} language="bash" />
                                    </div>
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Pro Tip: Use Conventional Commits</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        For a more structured approach, consider the <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Conventional Commits</a> specification. It provides a lightweight convention on top of commit messages, making them easier to automate and understand.
                    </p>
                    <CodeBlock
                        code={`<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

# Example:
# feat(api): send email to user on registration
#
# Adds a new transactional email triggered after a new user
# successfully completes the signup flow.
#
# Closes: T-452`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default GoodCommitMessages;