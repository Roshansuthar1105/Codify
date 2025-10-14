import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import { Shield, Brain, Scale, Handshake, CheckCircle, AlertCircle } from 'lucide-react';

const CodeReviewBasics = () => {
    const corePrinciples = [
        {
            title: 'Improve Code Quality',
            description: 'The primary goal is to find and fix bugs, architectural problems, and logical errors before they reach production.',
            icon: <Shield className="w-6 h-6 text-primary-500 inline-block" />
        },
        {
            title: 'Share Knowledge',
            description: 'Reviews are a great way to spread knowledge about the codebase, share new techniques, and mentor junior developers.',
            icon: <Brain className="w-6 h-6 text-primary-500 inline-block" />
        },
        {
            title: 'Maintain Consistency',
            description: 'Enforce team-wide coding standards, styles, and patterns, leading to a more maintainable and predictable codebase.',
            icon: <Scale className="w-6 h-6 text-primary-500 inline-block" />
        },
        {
            title: 'Foster Collaboration',
            description: 'Encourages a culture of collective ownership and teamwork where everyone is responsible for the quality of the product.',
            icon: <Handshake className="w-6 h-6 text-primary-500 inline-block" />
        }
    ];

    const authorChecklist = [
        'Write a clear and descriptive Pull Request (PR) title and summary.',
        'Keep PRs small and focused on a single issue.',
        'Self-review your code first to catch obvious mistakes.',
        'Provide context: link to the ticket, explain the "why" behind your changes.',
        'Ensure all automated checks (linting, tests) are passing before requesting a review.',
        'Suggest specific reviewers who have context on the changes.'
    ];

    const reviewerChecklist = [
        'Does the code solve the intended problem? Check the ticket requirements.',
        'Is the code clear, readable, and easy to understand?',
        'Are there any potential bugs or edge cases that are not handled?',
        'Are the tests sufficient, and do they cover the new logic?',
        'Does the code follow established patterns and style guides?',
        'Is there a simpler or more efficient way to achieve the same result?',
        'Is the documentation (comments, READMEs) updated accordingly?'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Code Review</span> Basics: A Practical Guide
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Code review is a systematic examination of source code by developers other than the original author. It's a critical process in software development that enhances code quality, promotes team collaboration, and prevents bugs from making their way into the final product.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Principle: </strong>
                        A code review is a professional conversation, not a personal judgment. The goal is the collaborative improvement of the code and the team. Always provide constructive, respectful, and actionable feedback.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Principles of Code Review</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {corePrinciples.map((principle, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    {principle.icon} {principle.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">For the Author: Preparing a PR</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                {authorChecklist.map((item, index) => (
                                    <li key={`author-${index}`} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">For the Reviewer: Checklist</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                {reviewerChecklist.map((item, index) => (
                                    <li key={`reviewer-${index}`} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Providing Effective Feedback</h2>
                    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The way you phrase your feedback is crucial. Aim to be helpful and objective. Ask questions instead of making demands, and explain the "why" behind your suggestions.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Unhelpful Feedback</h4>
                                <CodeBlock
                                    language="bash"
                                    code={`// This is inefficient. Rewrite it.

// Wrong.

// Why did you do this?`}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-green-500 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Constructive Feedback</h4>
                                <CodeBlock
                                    language="bash"
                                    code={`// This logic is repeated in a few places. Could we extract it into a helper function to keep it DRY?

// Nitpick: Could we add a comment here explaining this complex regular expression?

// I'm having trouble understanding this part. Could you walk me through the logic here? I'm wondering if a different approach might be clearer.`}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CodeReviewBasics;