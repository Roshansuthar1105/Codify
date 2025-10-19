import CodeBlock from '../../../components/CodeBlock';

const GitVersionControl = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What is <span className="text-primary-600 dark:text-primary-400">Version Control?</span>
            </h1>

            {/* Intro */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Version control is a system that helps you track changes to your files over time.
                It allows developers to collaborate, experiment, and manage their code efficiently
                without losing work or overwriting each other’s changes.
            </p>

            {/* Why it's Important */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Why is Version Control Important?
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Tracks every change made to your project files.</li>
                    <li>Makes it easy to revert to a previous version if something goes wrong.</li>
                    <li>Enables multiple developers to collaborate on the same project.</li>
                    <li>Supports branching, so you can work on new features without breaking the main code.</li>
                </ul>
            </div>

            {/* Example */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Example with Git
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Let’s say you create a project and want to track changes with Git.
                Here’s a simple workflow:
            </p>

            <CodeBlock
                code={`# Initialize a new Git repository
git init

# Add files to staging area
git add .

# Save a snapshot of your changes
git commit -m "First commit"

# Check your project history
git log`}
            />

            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                With these commands, you’ve already started version-controlling your project!
            </p>

            {/* Summary */}
            <div className="mt-10 bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                    In short:
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                    Version control, and especially Git, gives you the power to manage your project’s history,
                    collaborate effectively, and experiment without fear of losing work.
                </p>
            </div>
        </div>
    );
};

export default GitVersionControl;
