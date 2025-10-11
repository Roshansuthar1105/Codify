import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const PullRequests = () => {
    const coreConcepts = [
        {
            title: 'What is a Pull Request?',
            description: 'A Pull Request (PR) is a mechanism for a developer to notify team members that they have completed a feature or a fix. It allows others to review the code, discuss the changes, and suggest improvements before merging the code into the main codebase (like the `main` or `develop` branch).',
            code: `# A PR isn't a command, but a feature in platforms like GitHub, GitLab, or Bitbucket.
# It represents a request to "pull" your changes from your feature branch into another branch.

# Core idea:
# 1. You work on a separate branch.
# 2. You push your branch to the remote repository.
# 3. You open a Pull Request to merge your branch into the target branch.`,
        },
        {
            title: 'The Standard PR Workflow',
            description: 'The typical workflow involves creating a new branch for your work, making commits, pushing the branch to the remote repository, and then opening a pull request.',
            code: `# 1. Start on the main branch and make sure it's up to date
git checkout main
git pull origin main

# 2. Create a new branch for your feature or fix
git checkout -b new-feature-branch

# 3. Make your code changes, then stage and commit them
git add .
git commit -m "Implement the new feature"

# 4. Push your new branch to the remote repository
git push -u origin new-feature-branch

# 5. Go to GitHub/GitLab and open a Pull Request from 'new-feature-branch' to 'main'.`,
        },
        {
            title: 'Anatomy of a Pull Request',
            description: 'A good PR provides context for the reviewer. It typically includes a clear title, a detailed description of the changes, a link to the relevant issue or ticket, and screenshots or GIFs for UI changes.',
            code: `// A PR Description Template (often in a .github/pull_request_template.md file)

## Description
A clear and concise description of the changes.

## Related Issue
- Closes #123

## Changes
- Added a new component for user login.
- Refactored the authentication service.
- Updated documentation.

## How to Test
1. Check out this branch.
2. Run 'npm install' and 'npm start'.
3. Navigate to '/login' and verify the new form appears.`,
        }
    ];

    const bestPractices = [
        'Keep PRs small and focused on a single issue.',
        'Write a clear, descriptive title and a thorough description.',
        'Reference the original issue/ticket in your PR description.',
        'Ensure your branch is up-to-date with the target branch before creating the PR.',
        'Add comments to your own PR to explain complex parts of the code.',
        'Request reviews from relevant team members.',
        'Make sure all automated checks (CI/CD, tests, linting) are passing.'
    ];

    const commonMistakes = [
        'Creating a massive PR with thousands of lines of changes.',
        'Writing a vague title like "Update" or "Fixes".',
        'Forgetting to explain *why* a change was made.',
        'Mixing unrelated changes (e.g., bug fixes and new features) in one PR.',
        'Ignoring feedback from code reviews.',
        'Merging a PR with failing automated checks.',
        'Not deleting the feature branch after the PR is merged.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Git</span>: Understanding Pull Requests
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Pull Requests are the heart of collaboration in modern software development. They provide a structured way to propose, review, and discuss code changes before they are integrated into the main project. Mastering the art of the pull request is essential for effective teamwork and maintaining code quality.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover-border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        A Pull Request is not just about merging code; it's a conversation. It's an opportunity to share knowledge, improve quality, and ensure changes align with the project's goals.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Pull Request Process</h2>
                    <div className="space-y-6">
                        {coreConcepts.map((concept, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{concept.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{concept.description}</p>
                                <CodeBlock code={concept.code} language="bash"/>
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Responding to Feedback</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        After you create a PR, reviewers will leave comments. It's important to respond to this feedback constructively. If you make changes based on a comment, push the new commits to the same feature branch; the PR will update automatically.
                    </p>
                    <CodeBlock
                        code={`# After getting feedback, make more changes in your local branch
# ...edit files...

# Add and commit the changes
git add .
git commit -m "Address review comments from team lead"

# Push the new commit(s) to the same branch
git push origin new-feature-branch

# The Pull Request on GitHub will automatically show the new commits.`}
                        language="bash"
                    />
                </div>
            </div>
        </div>
    );
};

export default PullRequests;