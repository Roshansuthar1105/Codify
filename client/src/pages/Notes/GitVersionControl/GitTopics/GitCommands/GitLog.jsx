import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitLog = () => {
    const formattingOptions = [
        {
            title: '--oneline',
            description: 'Condenses each commit to a single line, showing just the commit hash and the message title.',
            code: `git log --oneline

# Output:
# c8b4a2f (HEAD -> main) Add user authentication
# 3a9e1d8 Add initial project structure
# f7b2c5e Initial commit`
        },
        {
            title: '--graph',
            description: 'Displays an ASCII art graph showing the branch and merge history alongside the log output.',
            code: `git log --graph --oneline

# Output:
# * c8b4a2f (HEAD -> main) Merge branch 'feature'
# |\\  
# | * 1a2b3c4 (feature) Add new feature
# * | 3a9e1d8 Add initial project structure
# |/  
# * f7b2c5e Initial commit`
        },
        {
            title: '--stat',
            description: 'Shows which files were changed in each commit and the relative number of lines that were added or deleted.',
            code: `git log --stat -1

# Output:
# commit c8b4a2f...
# Author: Alex <alex@example.com>
# Date:   Fri Sep 26 21:45:00 2025 +0530
#
#     Add user authentication
#
#  src/auth.js | 58 +++++++++++++++++++-
#  src/index.js|  2 +-
#  2 files changed, 59 insertions(+), 1 deletion(-)`
        },
        {
            title: '--pretty=format',
            description: 'Allows for complete customization of the log output using placeholders.',
            code: `git log --pretty=format:"%h %s (%an, %ar)" -3

# Output:
# c8b4a2f Add user authentication (Alex, 2 minutes ago)
# 3a9e1d8 Add initial project structure (Alex, 1 hour ago)
# f7b2c5e Initial commit (Alex, 3 hours ago)`
        }
    ];

    const filteringOptions = [
        {
            title: 'By Number',
            description: 'Limit the number of commits shown.',
            code: `# Show only the last 3 commits
git log -3`
        },
        {
            title: 'By Author',
            description: 'Show commits made by a specific person.',
            code: `# Show commits by authors matching "Alex"
git log --author="Alex"`
        },
        {
            title: 'By Date',
            description: 'Filter commits to a specific time frame.',
            code: `# Show commits since yesterday
git log --since="yesterday"

# Show commits from the last 2 weeks
git log --since="2.weeks"`
        },
        {
            title: 'By File or Path',
            description: 'Show only commits that affected a specific file or directory.',
            code: `# Show history for the README.md file
git log -- README.md

# Show history for the entire 'src/components' directory
git log -- src/components`
        },
        {
            title: 'By Message Content',
            description: 'Search for commits with a specific keyword in their message.',
            code: `# Find commits that mention "bugfix"
git log --grep="bugfix"`
        },
        {
            title: 'By Content Change',
            description: 'Show commits that introduced or removed a specific line of code.',
            code: `# Find when the string "useState" was added
git log -S "useState"`
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Exploring History with</span> Git Log
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The `git log` command is your window into the project's history. It lets you view the chronological sequence of commits for a repository, showing who made changes, what they changed, and when. Mastering `git log` is crucial for understanding how your project has evolved, debugging issues, and working effectively with your team.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Takeaway: </strong>
                        By default, `git log` can be overwhelming. The real power comes from using its many flags and options to format and filter the output to find exactly what you're looking for.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Formatting the Output</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {formattingOptions.map((option, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{option.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{option.description}</p>
                                <CodeBlock code={option.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Filtering the History</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteringOptions.map((option, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{option.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{option.description}</p>
                                <CodeBlock code={option.code} language="bash" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practical Recipes</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        You can combine flags to create powerful, specific queries. Here are a couple of common examples.
                    </p>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recipe 1: A Clean, Visual Team History</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">See the last 10 commits with a graph, condensed to one line, showing the author and relative date.</p>
                            <CodeBlock code={`git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' -10`} language="bash" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recipe 2: Find Who Changed a Specific Function</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">Track the history of a specific function (`handleLogin`) within a file to see who has modified it.</p>
                            <CodeBlock code={`git log -L :handleLogin:src/auth.js`} language="bash" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GitLog;