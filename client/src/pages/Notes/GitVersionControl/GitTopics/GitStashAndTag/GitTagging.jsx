import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitTagging = () => {
    const tagTypes = [
        {
            title: 'Lightweight Tags',
            code: `# Create a lightweight tag at the current commit
git tag v1.0.0-light

# This creates a new tag but stores no extra information`,
            explanation: 'A lightweight tag is just a pointer to a specific commit. It\'s like a branch that doesn’t move. It contains no extra information, such as who created it or when.'
        },
        {
            title: 'Annotated Tags',
            code: `# Create an annotated tag with a message
git tag -a v1.0.0 -m "Release of version 1.0.0"

# View the tag's data and the commit it points to
git show v1.0.0

# --- Sample Output for "show" ---
# tag v1.0.0
# Tagger: Your Name <your.email@example.com>
# Date:   Fri Oct 3 20:22:01 2025 +0530
#
# Release of version 1.0.0
#
# commit 5d8f3b4a2b7c...
# Author: Your Name <your.email@example.com>
# Date:   Thu Oct 2 11:30:00 2025 +0530
#
#    Add user authentication`,
            explanation: 'Annotated tags are stored as full objects in the Git database. They include the tagger\'s name, email, date, and a message. They can also be signed with GPG. This is the recommended type for releases.'
        }
    ];

    const practicalExamples = [
        {
            title: 'Listing and Filtering Tags',
            code: `# List all tags in alphabetical order
git tag

# --- Sample Output ---
# v0.9.0
# v1.0.0
# v1.0.0-light

# Use a pattern to filter tags (e.g., all v1.* tags)
git tag -l "v1.*"`,
            explanation: 'You can easily list all your tags or filter for specific ones using a pattern.'
        },
        {
            title: 'Tagging an Older Commit',
            code: `# First, find the hash of the commit you want to tag
git log --oneline
# 9fceb02 Fix critical bug in API
# 5d8f3b4 Add user authentication

# Tag that specific commit using its hash
git tag -a v0.9.1 9fceb02 -m "Tagging the critical bug fix as v0.9.1"`,
            explanation: 'Tags don\'t have to point to the most recent commit. You can tag any commit in your history by providing its hash.'
        }
    ];

    const bestPractices = [
        'Prefer annotated tags (`-a`) over lightweight tags for any public or shared release.',
        'Adopt a consistent versioning scheme, such as Semantic Versioning (e.g., `v1.2.3`).',
        'Write clear, descriptive messages for your annotated tags summarizing the release.',
        'Consider signing your tags (`-s`) for important releases to make them verifiable.',
        'Tags are created locally; they are not pushed to the remote by default.'
    ];

    const commonMistakes = [
        'Forgetting to push tags to the remote repository. A `git push` does not send them.',
        'Using lightweight tags for official releases, thereby losing valuable metadata.',
        'Making a typo in a tag name that has already been pushed to a remote.',
        'Tagging the wrong commit and not realizing it until after the release.',
        'Deleting a pushed tag locally (`git tag -d`) and forgetting to delete it on the remote.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span> Tagging: Marking Milestones
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    In Git, a "tag" is a permanent pointer to a specific commit. It’s like a bookmark for a significant point in your project’s history, most commonly used to mark release points (e.g., `v1.0`, `v2.1`). Unlike branches, tags are not meant to move once created, providing a stable reference to a specific version of your code.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        Tags provide stable, human-readable names for specific commits. While a branch is a moving pointer, a tag is a fixed anchor, making it the industry standard for versioning and release management.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Lightweight vs. Annotated Tags</h2>
                    <div className="space-y-6">
                        {tagTypes.map((tag, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{tag.title}</h3>
                                <CodeBlock code={tag.code} language="bash" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{tag.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Usage</h2>
                    <div className="space-y-6">
                        {practicalExamples.map((example, index) => (
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Sharing Tags with Others</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        By default, `git push` will not transfer tags to the remote server. You must explicitly push tags to make them available to others.
                    </p>
                    <CodeBlock
                        code={`# Push a single, specific tag to the 'origin' remote
git push origin v1.0.0

# Push all of your local tags to the 'origin' remote
# (Use with caution, as this may push tags you didn't intend to share)
git push origin --tags`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default GitTagging;