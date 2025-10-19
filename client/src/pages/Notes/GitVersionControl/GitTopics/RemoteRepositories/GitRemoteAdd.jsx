import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const GitRemoteAdd = () => {
    const whyUseRemotes = [
        {
            title: 'Collaboration',
            description: 'Remotes act as a central point for a team. Everyone can push their changes to it and pull updates from others, ensuring everyone is working with the latest code.'
        },
        {
            title: 'Backup & Redundancy',
            description: 'Hosting your code on a remote server (like GitHub) means you have a secure backup. If your local machine crashes, your project and its entire history are safe.'
        },
        {
            title: 'Accessibility',
            description: 'You can clone your repository from the remote onto any machine, allowing you to work from different locations without manually copying files.'
        },
        {
            title: 'Automation (CI/CD)',
            description: 'Remotes are the trigger for Continuous Integration/Continuous Deployment pipelines. Pushing to a remote can automatically build, test, and deploy your application.'
        }
    ];

    const originVsUpstream = [
        {
            name: 'origin',
            description: 'This is the default, conventional name for the primary remote repository. When you <code>git clone</code> a repository, Git automatically creates a remote named <code>origin</code> pointing to the URL you cloned from. It\'s where you push your personal work.'
        },
        {
            name: 'upstream',
            description: 'This is a common convention for the original repository that you forked. You add an <code>upstream</code> remote to be able to fetch updates from the original project and keep your fork in sync.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Connecting to</span> Remote Repositories
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    So far, all your Git work has been on your local machine. To collaborate or back up your code, you need to connect your local repository to a remote one. A "remote" is simply a version of your project hosted on the internet or a network, typically on a service like GitHub, GitLab, or Bitbucket. The <code>git remote</code> command is your tool for managing these connections.
                </p>

                <div className="mb-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong>
                        A remote in Git is just a nickname or a bookmark for a URL. The <code>git remote add</code> command creates a new bookmark, giving a memorable name to a remote repository's URL.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Do You Need Remotes?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whyUseRemotes.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Managing Remote Connections</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3"><code>git remote add</code>: Connecting to a Remote</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                This is the command used to create a new connection to a remote repository. You give the remote a short nickname (by convention, the first one is usually <code>origin</code>) and specify the URL of the remote repository.
                            </p>
                            <CodeBlock language="bash" code={`# Syntax: git remote add <nickname> <url>

# Example: Adding a GitHub repository as a remote named "origin"
git remote add origin https://github.com/your-username/your-project.git`} />
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3"><code>git remote -v</code>: Viewing Your Remotes</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                Use this command to list all the remote connections your local repository knows about. The <code>-v</code> (verbose) flag shows the URLs for both fetching (downloading) and pushing (uploading).
                            </p>
                            <CodeBlock language="bash" code={`# List all configured remotes with their URLs
git remote -v

# Example Output:
# origin  https://github.com/your-username/your-project.git (fetch)
# origin  https://github.com/your-username/your-project.git (push)`} />
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Remote Nicknames: <span className='font-semibold text-primary-600 dark:text-primary-400'>origin</span> vs <span className='font-semibold text-primary-600 dark:text-primary-400'>upstream</span></h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {originVsUpstream.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{item.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default GitRemoteAdd;
