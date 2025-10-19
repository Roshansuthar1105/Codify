import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitDiff = () => {
    const commonCommands = [
        {
            command: 'git diff',
            description: 'Shows changes in your working directory that have not yet been staged for the next commit. This is what you have changed but not yet told Git you want to save.',
            code: `# Shows all unstaged changes
git diff

# Shows unstaged changes for a specific file
git diff path/to/your/file.js`
        },
        {
            command: 'git diff --staged',
            description: 'Displays the changes that are staged (added to the index with `git add`) but not yet committed. This shows exactly what will be included in your next commit.',
            code: `# Shows all staged changes
git diff --staged

# You can also use --cached, which is a synonym
git diff --cached`
        },
        {
            command: 'git diff HEAD',
            description: 'Compares your working directory (both staged and unstaged changes) against the most recent commit (HEAD). It gives a complete picture of everything you\'ve done since your last save point.',
            code: `# Shows all changes (staged and unstaged) since the last commit
git diff HEAD`
        },
        {
            command: 'git diff <branch1>..<branch2>',
            description: 'Shows the differences between the tips of two branches. This is extremely useful for reviewing changes before merging a feature branch into your main branch.',
            code: `# Compare the 'main' branch with your 'feature' branch
git diff main..feature-branch`
        }
    ];

    const diffOutputExplanation = `diff --git a/style.css b/style.css
index 1a2b3c4..5d6e7f8 100644
--- a/style.css
+++ b/style.css
@@ -1,4 +1,5 @@
 body {
     font-family: Arial, sans-serif;
-    line-height: 1.5;
+    line-height: 1.6;
+    background-color: #f0f0f0; /* Added a background color */
 }`;

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git Diff:</span> Understanding the Changes
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git diff` command is one of the most important and frequently used tools in Git. It allows you to see the exact changes between different states of your project, such as the differences between your current work and the last commit, between two branches, or between two commits. Mastering `git diff` is crucial for writing clean commits and understanding your project's history.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Function: </strong>
                        `git diff` answers the fundamental question: "What has changed?" It's your primary tool for reviewing your work before you save it.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common `git diff` Commands</h2>
                    <div className="space-y-6">
                        {commonCommands.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.command}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                                <CodeBlock code={item.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Read `diff` Output</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">The output can look intimidating at first, but it's quite simple once you know what to look for.</p>
                        <CodeBlock code={diffOutputExplanation} language="diff" />
                        <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">--- a/style.css</code>: This represents the "old" version of the file.</li>
                            <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">+++ b/style.css</code>: This represents the "new" version of the file.</li>
                            <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">@@ -1,4 +1,5 @@</code>: This is the "hunk header." It tells you where the changes are located. Here, it means "starting at line 1, show 4 lines from the old file" and "starting at line 1, show 5 lines from the new file."</li>
                            <li><strong className="text-red-500">- (minus sign)</strong>: A line that was removed from the old file.</li>
                            <li><strong className="text-green-500">+ (plus sign)</strong>: A line that was added to the new file.</li>
                            <li>A line starting with a space is an unchanged line, shown for context.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Useful Flags</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">--stat</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Provides a summary of changes (files modified, lines added/deleted) instead of the full line-by-line diff.</p>
                            <CodeBlock code={`git diff --stat HEAD~3`} language="bash" />
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">--color-words</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Shows an inline diff, highlighting only the specific words that have changed within a line.</p>
                            <CodeBlock code={`git diff --color-words`} language="bash" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitDiff;