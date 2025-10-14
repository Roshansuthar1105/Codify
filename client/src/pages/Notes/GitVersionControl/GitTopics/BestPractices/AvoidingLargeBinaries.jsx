import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const AvoidingLargeBinaries = () => {
    const problemsAndSolutions = [
        {
            title: 'The Problem with Large Files',
            code: `# A typical repo might contain source code and assets
project/
├── src/
│   └── main.js       # Text, diffs well
├── assets/
│   └── design.psd    # Binary, 250MB, does NOT diff well
└── README.md         # Text, diffs well`,
            explanation: 'Git is optimized for text files, where it can efficiently store the differences (deltas) between versions. For binary files (images, videos, executables), any small change often forces Git to store a complete new copy of the file, causing the repository size to grow extremely fast.'
        },
        {
            title: 'The Consequences of a Bloated Repository',
            list: [
                '🐌 Slow Operations: `git clone`, `fetch`, and `pull` become painfully slow for the entire team.',
                '💾 Excessive Disk Usage: The `.git` directory can become many times larger than the actual project files.',
                '🚫 Hosting Limits: Services like GitHub have repository size limits (e.g., a 100MB file limit) that you can easily exceed.',
                '😩 Difficult to Fix: Removing large files from a repository\'s history is a complex and destructive process.'
            ],
            explanation: 'A large repository impacts the productivity of every single person who works with it.'
        },
        {
            title: 'The Solution: Git Large File Storage (LFS)',
            code: `# Step 1: Tell LFS which file patterns to track
git lfs track "*.psd"

# Step 2: Add the tracking configuration file to git
git add .gitattributes

# When you add a PSD, Git stores a tiny POINTER, not the 250MB file
git add assets/design.psd

# The actual file is uploaded to a separate LFS server on push
git push`,
            explanation: 'Git LFS solves this by storing large files on a separate server. It replaces them in your repository with small text pointers. When you check out a branch, LFS downloads the files you need.'
        }
    ];

    const bestPractices = [
        'Set up Git LFS (`git lfs track`) *before* you add any large files to the repository.',
        'Always make sure the `.gitattributes` file is committed so the rules are shared with your team.',
        'Use `.gitignore` for files that should never be tracked at all (e.g., build outputs, dependency folders).',
        'Regularly audit what is being tracked by LFS using the `git lfs ls-files` command.',
        'Educate your entire team on how LFS works to prevent accidental commits of large files.'
    ];

    const commonMistakes = [
        'Forgetting to run `git lfs install` on a new machine, causing LFS to not work correctly.',
        'Committing a large file first, and *then* trying to track it. This requires rewriting history to fix.',
        'Not committing the `.gitattributes` file, leading to inconsistent tracking across the team.',
        'Tracking file types that change often but are not necessarily large, adding unnecessary LFS overhead.',
        'Ignoring storage and bandwidth quotas on your Git host, which can lead to billing issues.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Good Practices:</span> Avoiding Large Binary Files
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    One of the most important rules for maintaining a healthy and efficient Git repository is to avoid committing large binary files directly. Git is a version control system for source code, not a file storage service for large assets. Committing them leads to a bloated repository that becomes slow and difficult to work with for everyone.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        The modern solution is **Git Large File Storage (LFS)**. Instead of storing large files in your repository, you store lightweight text *pointers*. The actual file data is stored on a dedicated server, keeping your repository small and fast.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why & How to Handle Large Files</h2>
                    <div className="space-y-6">
                        {problemsAndSolutions.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                {item.code && <CodeBlock code={item.code} language="bash" />}
                                {item.list && (
                                    <ul className="space-y-2 my-4 text-gray-700 dark:text-gray-300">
                                        {item.list.map((listItem, i) => <li key={i} className="text-sm">{listItem}</li>)}
                                    </ul>
                                )}
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{item.explanation}</p>
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">What If I Already Committed a Large File?</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If a large file is already in your commit history, tracking it with LFS won't fix the problem. You must rewrite the repository's history to remove the file. This is an advanced and potentially destructive operation. Tools like `git lfs migrate` are designed for this.
                    </p>
                    <CodeBlock
                        code={`# This is an advanced command that REWRITES history.
# Always back up your repository before running it.

# Example: Convert all existing .mp4 files in your history to LFS pointers
git lfs migrate import --include="*.mp4" --everything`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default AvoidingLargeBinaries;