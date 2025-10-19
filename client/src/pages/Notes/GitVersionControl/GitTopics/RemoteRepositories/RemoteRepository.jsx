import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const RemoteRepository = () => {
    const whyUseRemote = [
        {
            title: 'Central Hub for Collaboration',
            description: 'It provides a single source of truth for your team. Everyone can push their changes to it and pull updates from others, ensuring all members are synchronized.'
        },
        {
            title: 'Powerful Backup',
            description: 'A remote repository acts as a secure, offsite backup of your entire project and its history. If your local machine crashes, your work is not lost.'
        },
        {
            title: 'Access from Anywhere',
            description: 'You can clone your repository onto any machine, allowing you to work from different locations without manually transferring files.'
        },
        {
            title: 'Enables Automation (CI/CD)',
            description: 'Remotes are the trigger point for Continuous Integration and Continuous Deployment pipelines, automating testing, building, and deploying your application.'
        }
    ];

    const popularServices = [
        { name: 'GitHub', description: 'The most popular platform, known for its strong community features and extensive integrations.' },
        { name: 'GitLab', description: 'Offers a complete DevOps platform in a single application, including powerful built-in CI/CD.' },
        { name: 'Bitbucket', description: 'Made by Atlassian, it integrates well with other products like Jira and Trello.' }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">What Is a</span> Remote Repository?
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    While you can use Git entirely on your local machine, its true power is unlocked when you collaborate with others. A **remote repository** is a version of your project that is hosted on the internet or a network. It's a shared space where team members can push their changes and pull updates from others. Think of it as the central hub for your project.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong>
                        Your local repository is your private workspace. The remote repository is the public, shared space. You synchronize between the two to collaborate.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use a Remote Repository?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whyUseRemote.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Commands for Interaction</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git clone`: Get a Local Copy</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                This is the first command you use to download a full copy of an existing remote repository to your local machine. It also automatically sets up a connection to the remote, named `origin` by default.
                            </p>
                            <CodeBlock language="bash" code={`# Clone a repository from a URL (e.g., from GitHub)
git clone https://github.com/user/project.git`} />
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git push`: Send Changes to Remote</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                After you've committed your changes locally, `push` uploads them to the remote repository, making them available to your collaborators.
                            </p>
                            <CodeBlock language="bash" code={`# Push commits from your local 'main' branch to the 'origin' remote
git push origin main`} />
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">`git pull`: Get Changes from Remote</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                This command fetches the latest changes from the remote repository and merges them into your current local branch. It's how you stay up-to-date with your team's work.
                            </p>
                            <CodeBlock language="bash" code={`# Fetch and merge changes from the 'origin' remote's 'main' branch
git pull origin main`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Popular Hosting Services</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {popularServices.map((service, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">{service.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default RemoteRepository;