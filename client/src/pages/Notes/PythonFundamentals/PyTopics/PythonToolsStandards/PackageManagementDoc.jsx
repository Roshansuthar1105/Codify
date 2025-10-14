/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function PackageManagementDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Package Management</span>
      </h1>

      {/* ✅ Intro */}
      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Managing packages efficiently is crucial for any Python project. This guide covers tools, workflows, and best practices for installing, updating, and maintaining Python packages.
      </p>

      {/* ✅ Section 1 - pip Basics */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          pip Basics
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            pip is Python's default package manager. It allows you to install packages from the Python Package Index (PyPI) or other repositories.
          </p>
        </div>

        <CodeBlock
          code={`# Install a package
pip install requests

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests`}
        />
      </section>

      {/* ✅ Section 2 - Managing Requirements */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Managing Requirements
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <p className="text-green-700 dark:text-green-300">
            Use <code>requirements.txt</code> to list project dependencies. This ensures reproducible environments for development and deployment.
          </p>
        </div>

        <CodeBlock
          code={`# Freeze current environment packages
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt`}
        />
      </section>

      {/* ✅ Section 3 - Virtual Environment Integration */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Integrating with Virtual Environments
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            Packages should always be installed inside a virtual environment to avoid conflicts and ensure isolation.
          </p>
        </div>

        <CodeBlock
          code={`# Create a virtual environment
python -m venv venv

# Activate and install packages
source venv/bin/activate
pip install requests`}
        />
      </section>

      {/* ✅ Section 4 - Using Alternative Package Managers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Alternative Package Managers
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <p className="text-purple-700 dark:text-purple-300">
            Tools like <code>poetry</code> and <code>pipenv</code> provide enhanced dependency management and project isolation.
          </p>
        </div>

        <CodeBlock
          code={`# Poetry: Initialize a project
poetry init

# Install a dependency
poetry add requests

# Install all dependencies
poetry install

# Pipenv: Create environment and install
pipenv install requests`}
        />
      </section>

      {/* ✅ Section 5 - Package Version Management */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Package Version Management
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-300">
            Specify exact versions to ensure consistent behavior across environments.
          </p>
        </div>

        <CodeBlock
          code={`# Install specific version
pip install requests==2.31.0

# Upgrade within version range
pip install 'requests>=2.30,<3.0'`}
        />
      </section>

      {/* ✅ Section 6 - Listing & Searching Packages */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Listing & Searching Packages
        </h2>
        <CodeBlock
          code={`# List installed packages
pip list

# Search for a package
pip search requests`}
        />
      </section>

      {/* ✅ Section 7 - Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Practices
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-6 text-green-700 dark:text-green-300 space-y-2">
            <li>Always use a virtual environment per project</li>
            <li>Use <code>requirements.txt</code> or <code>poetry.lock</code> to freeze dependencies</li>
            <li>Prefer specific package versions over latest for production</li>
            <li>Keep your package manager updated</li>
            <li>Document any manual installation steps in README</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 8 - Quick Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Workflow
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ol className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>1. Create project folder and virtual environment</li>
            <li>2. Activate environment</li>
            <li>3. Install required packages via pip/poetry/pipenv</li>
            <li>4. Save dependencies (<code>pip freeze &gt; requirements.txt</code>)</li>
            <li>5. Track changes in version control</li>
            <li>6. Deactivate environment when done</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 9 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Python package management ensures consistent dependencies across environments.</li>
            <li>Use pip, pipenv, or poetry depending on project needs.</li>
            <li>Always isolate packages in virtual environments.</li>
            <li>Freeze dependencies to guarantee reproducibility.</li>
            <li>Follow best practices for version control, documentation, and updates.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
