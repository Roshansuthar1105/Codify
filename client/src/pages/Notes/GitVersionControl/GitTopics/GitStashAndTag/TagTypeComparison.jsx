import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const TagTypesComparison = () => {
    const tagDetails = [
        {
            type: 'Lightweight Tags',
            description: 'Think of a lightweight tag as a simple "sticky note" on a commit. It is a direct pointer to a commit hash and stores no other information. It\'s just a name for a commit.',
            code: `# Create a lightweight tag
git tag v1.2.0-lw

# Showing the tag only displays the commit information
git show v1.2.0-lw

# --- Output ---
# commit 9fceb02a33dcb...
# Author: Your Name <your.email@example.com>
# Date:   Thu Oct 2 11:30:00 2025 +0530
#
#    Fix critical bug in API`
        },
        {
            type: 'Annotated Tags',
            description: 'An annotated tag is like an "official plaque." It\'s a full Git object that contains its own metadata, including the tagger\'s name, email, date, and a specific tagging message, separate from the commit message.',
            code: `# Create an annotated tag
git tag -a v1.2.0 -m "Version 1.2.0 Release"

# Showing the tag displays tag metadata first, then the commit
git show v1.2.0

# --- Output ---
# tag v1.2.0
# Tagger: Your Name <your.email@example.com>
# Date:   Fri Oct 3 20:23:40 2025 +0530
#
# Version 1.2.0 Release
#
# commit 9fceb02a33dcb...`
        }
    ];

    const comparison = [
        {
            aspect: 'Metadata',
            lightweight: 'None. It\'s just a name for a commit.',
            annotated: 'Stores tagger name, email, date, and a tagging message.'
        },
        {
            aspect: 'Use Case',
            lightweight: 'Private or temporary labels, personal bookmarks.',
            annotated: 'Official releases, public milestones, shared tags.'
        },
        {
            aspect: 'Creation Command',
            lightweight: '`git tag <tag-name>`',
            annotated: '`git tag -a <tag-name> -m "message"`'
        },
        {
            aspect: 'GPG Signing',
            lightweight: 'Cannot be signed.',
            annotated: 'Can be signed using the `-s` flag for verification.'
        },
        {
            aspect: 'Storage in Git',
            lightweight: 'A file in `.git/refs/tags/` containing a commit hash.',
            annotated: 'A full tag object in the Git database with its own hash.'
        }
    ];
    
    const whenToUse = [
        {
            type: 'Choose Lightweight When...',
            reasons: [
                'You need a temporary label for personal use.',
                'You are creating a quick, disposable bookmark for a commit.',
                'The context (who, when, why) of the tag is irrelevant.',
                'You are the only person who will ever see or use the tag.'
            ]
        },
        {
            type: 'Choose Annotated When...',
            reasons: [
                'You are marking an official release (e.g., v1.0.0).',
                'The tag needs to be shared with a team or the public.',
                'You need to include details, like release notes, in the tag message.',
                'The tag needs to be signed for security and verification.'
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Tags:</span> Annotated vs. Lightweight
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Git offers two types of tags, and understanding the difference is crucial for effective versioning and release management. While they both point to a specific commit, how they store information and their intended use cases are very different. Choosing the right one ensures your project history is both clear and professional.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Insight: </strong>
                        The fundamental difference is **metadata**. Annotated tags are rich objects with an author, date, and message, while lightweight tags are simple, nameless pointers. For any shared work, annotated is the way to go.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Two Tag Types Explained</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {tagDetails.map((tag, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{tag.type}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{tag.description}</p>
                                <CodeBlock code={tag.code} language="bash" />
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lightweight Tag</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Annotated Tag</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparison.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.aspect}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.lightweight}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.annotated}</td>
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
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TagTypesComparison;