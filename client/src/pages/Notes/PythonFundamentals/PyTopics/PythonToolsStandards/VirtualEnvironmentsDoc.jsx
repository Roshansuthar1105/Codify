/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function VirtualEnvironmentsDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Virtual Environments</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Virtual environments are isolated Python spaces that help you manage dependencies for different projects. 
        Think of them as separate containers where each project can have its own packages, avoiding conflicts between projects.
      </p>

      {/* ✅ Section 1 - What is a Virtual Environment */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is a Virtual Environment?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            A virtual environment is an isolated Python installation that prevents package conflicts between projects.
          </p>
        </div>

        <CodeBlock
          code={`# Without virtual environments (problems):
# Project A needs Django 3.0
# Project B needs Django 4.0
# Conflict! Only one version can be installed globally

# With virtual environments (solution):
# Project A has its own environment with Django 3.0
# Project B has its own environment with Django 4.0
# No conflicts!`}
        />
      </section>

      {/* ✅ Section 2 - Creating Virtual Environments */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Creating Virtual Environments
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Using venv (Built-in)</h4>
          <CodeBlock
            code={`# Create a virtual environment
python -m venv myproject_env

# On Windows
python -m venv myproject_env

# On Mac/Linux  
python3 -m venv myproject_env`}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Activating the Environment</h4>
          <CodeBlock
            code={`# Windows
myproject_env\\Scripts\\activate

# Mac/Linux
source myproject_env/bin/activate

# When activated, your prompt shows: (myproject_env) C:\\>`}
          />
        </div>
      </section>

      {/* ✅ Section 3 - Working with Packages */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Working with Packages
        </h2>

        <CodeBlock
          code={`# After activating your environment

# Install packages (only affects this environment)
pip install requests
pip install django==4.0

# List installed packages
pip list

# Save package list to file
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt`}
        />
      </section>

      {/* ✅ Section 4 - Deactivating Environment */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Deactivating Environment
        </h2>

        <CodeBlock
          code={`# Deactivate current environment
deactivate

# Your prompt returns to normal: C:\\>`}
        />
      </section>

      {/* ✅ Section 5 - Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Practices
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>Create one virtual environment per project</li>
            <li>Always activate before installing packages</li>
            <li>Use requirements.txt to track dependencies</li>
            <li>Add virtual environment folder to .gitignore</li>
            <li>Use descriptive names for environments</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 6 - Quick Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Workflow
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ol className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>1. Create: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">python -m venv env</code></li>
            <li>2. Activate: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">env\\Scripts\\activate</code></li>
            <li>3. Install: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">pip install package_name</code></li>
            <li>4. Work on your project</li>
            <li>5. Deactivate: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">deactivate</code></li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 7 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Virtual environments isolate Python projects to prevent package conflicts.</li>
            <li>Use <code>venv</code> to create an environment for each project.</li>
            <li>Always activate the environment before installing packages.</li>
            <li>Track dependencies with <code>requirements.txt</code>.</li>
            <li>Deactivate when done and follow best practices for naming and git.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
