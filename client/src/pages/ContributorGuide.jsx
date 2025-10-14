import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, ChevronUp, Github, ExternalLink, Copy, Check, GitBranch, GitCommit, GitPullRequest, Users, Heart, Book, Terminal, MessageSquare, FileText, Eye, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

const ContributorGuide = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const copyToClipboard = (text, commandId) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandId);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const commands = [
    {
      id: 'clone',
      title: 'Clone your fork',
      command: 'git clone https://github.com/<YOUR-USERNAME>/Codify',
      description: 'Replace YOUR-USERNAME with your GitHub username and REPO-NAME with the repository name'
    },
    {
      id: 'branch',
      title: 'Create a new branch',
      command: 'git checkout -b feature/your-feature-name',
      description: 'Create and switch to a new branch for your changes'
    },
    {
      id: 'add',
      title: 'Stage your changes',
      command: 'git add .',
      description: 'Add all modified files to staging area'
    },
    {
      id: 'commit',
      title: 'Commit your changes',
      command: 'git commit -m "Add: your descriptive commit message"',
      description: 'Commit your staged changes with a clear message'
    },
    {
      id: 'push',
      title: 'Push to your fork',
      command: 'git push origin feature/your-feature-name',
      description: 'Push your branch to your forked repository on GitHub'
    }
  ];

  const steps = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Fork the Repository',
      description: 'Click the "Fork" button on the GitHub repository page to create your own copy.',
      details: 'This creates a personal copy of the project in your GitHub account that you can freely modify.'
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Clone Locally',
      description: 'Download your forked repository to your computer using git clone.',
      details: 'This creates a local working copy where you can make and test your changes.'
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Create a Branch',
      description: 'Create a new branch for your feature or bug fix.',
      details: 'Branches keep your changes organized and separate from the main codebase.'
    },
    {
      icon: <GitCommit className="w-6 h-6" />,
      title: 'Make Changes',
      description: 'Edit files, add features, or fix bugs in your local repository.',
      details: 'Take your time to write clean, well-documented code that follows the project standards.'
    },
    {
      icon: <GitCommit className="w-6 h-6" />,
      title: 'Commit & Push',
      description: 'Save your changes and upload them to your GitHub fork.',
      details: 'Write clear commit messages that explain what changes you made and why.'
    },
    {
      icon: <GitPullRequest className="w-6 h-6" />,
      title: 'Open Pull Request',
      description: 'Submit your changes for review by creating a pull request.',
      details: 'Describe your changes clearly and be open to feedback from maintainers.'
    }
  ];

  const prSteps = [
    {
      icon: <GitPullRequest className="w-7 h-7" />,
      title: 'Navigate to Pull Requests',
      description: 'Go to your forked repository on GitHub and click the "Pull requests" tab.',
      tip: 'You might also see a yellow banner suggesting to create a PR after pushing your branch!'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Click "New Pull Request"',
      description: 'Click the green "New pull request" button to start creating your PR.',
      tip: 'Make sure you\'re comparing your branch to the correct base repository and branch.'
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: 'Review Your Changes',
      description: 'GitHub will show you a diff of all the changes you\'ve made. Review them carefully.',
      tip: 'This is your last chance to spot any issues before submitting. Look for typos or debugging code!'
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Write a Descriptive Title',
      description: 'Create a clear, concise title that summarizes what your PR accomplishes.',
      tip: 'Good: "Add dark mode toggle to header". Bad: "Updated some files".'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Add Detailed Description',
      description: 'Explain what changes you made, why you made them, and how to test them.',
      tip: 'Include screenshots for UI changes and mention any breaking changes or dependencies.'
    },
    {
      icon: <CheckCircle2 className="w-7 h-7" />,
      title: 'Submit Your PR',
      description: 'Click "Create pull request" to submit your contribution for review!',
      tip: 'Congratulations! You\'ve just made your first contribution. The maintainers will review it soon.'
    }
  ];

  const faqs = [
    {
      question: 'What is a fork?',
      answer: 'A fork is your personal copy of someone else\'s repository. It allows you to freely experiment with changes without affecting the original project. You can later submit your changes back to the original project through a pull request.',
      category: 'basics',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      question: 'What is a pull request?',
      answer: 'A pull request (PR) is a way to propose changes to a repository. It lets you tell others about changes you\'ve pushed to a GitHub repository and request that your changes be reviewed and potentially merged into the main project.',
      category: 'basics',
      icon: <GitPullRequest className="w-5 h-5" />
    },
    {
      question: 'What should I name my branch?',
      answer: 'Use descriptive names like "feature/user-authentication", "fix/login-bug", or "docs/readme-update". Avoid generic names like "my-changes" or "patch". The name should clearly indicate what the branch contains.',
      category: 'workflow',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      question: 'How do I write good commit messages?',
      answer: 'Start with a verb like "Add", "Fix", "Update", or "Remove". Keep it under 50 characters for the title. Example: "Add user profile validation" or "Fix header responsive design issue".',
      category: 'workflow',
      icon: <GitCommit className="w-5 h-5" />
    },
    {
      question: 'What if my PR gets rejected?',
      answer: 'Don\'t take it personally! Rejections often happen due to timing, project direction, or minor issues that can be fixed. Read the feedback carefully, ask questions if unclear, and use it as a learning opportunity.',
      category: 'troubleshooting',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      question: 'How do I handle merge conflicts?',
      answer: 'Merge conflicts occur when your changes conflict with recent updates to the main branch. Pull the latest changes, resolve conflicts manually in your editor, then commit the resolution. Many IDEs have built-in tools to help with this.',
      category: 'troubleshooting',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      question: 'What if I make a mistake?',
      answer: 'Don\'t worry! Git is designed to handle mistakes. You can always create new commits to fix issues, or ask for help in the project\'s discussion forums. The maintainers are usually happy to help newcomers.',
      category: 'troubleshooting',
      icon: <Heart className="w-5 h-5" />
    },
    {
      question: 'How long do pull requests take to review?',
      answer: 'Review times vary by project and maintainer availability. Some PRs are reviewed within hours, others may take days or weeks. Be patient and don\'t hesitate to politely follow up if there\'s no response after a reasonable time.',
      category: 'process',
      icon: <Eye className="w-5 h-5" />
    },
    {
      question: 'Should I create an issue before making a PR?',
      answer: 'For significant changes or new features, yes! Create an issue first to discuss your idea with maintainers. For small bug fixes or typos, you can usually go straight to a PR.',
      category: 'process',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      question: 'How do I update my PR after feedback?',
      answer: 'Simply make the requested changes in your local branch, commit them, and push to the same branch. Your PR will automatically update with the new commits.',
      category: 'process',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];

  const faqCategories = {
    basics: { 
      name: 'Getting Started', 
      bgColor: isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
    },
    workflow: { 
      name: 'Git Workflow', 
      bgColor: isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
    },
    process: { 
      name: 'Review Process', 
      bgColor: isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
    },
    troubleshooting: { 
      name: 'Common Issues', 
      bgColor: isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
    }
  };

  const resources = [
    {
      title: 'GitHub\'s Official Guide',
      description: 'Comprehensive documentation for GitHub beginners',
      url: 'https://docs.github.com/en/get-started',
      icon: <Book className="w-5 h-5" />
    },
    {
      title: 'Git Handbook',
      description: 'Learn the basics of Git version control',
      url: 'https://guides.github.com/introduction/git-handbook/',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      title: 'First Contributions',
      description: 'Hands-on tutorial for your first open source contribution',
      url: 'https://firstcontributions.github.io/',
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'
    }`}>
      {/* Hero Section */}
      <div className={`bg-primary text-white py-16 ${
        isDark ? 'text-dark-text-primary' : 'text-white'
      }`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 mr-3 text-red-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Welcome, Future Contributor!</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            We're thrilled you want to contribute! Let's make your first contribution smooth and enjoyable.
          </p>
          <div className={`backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border ${
            isDark ? 'bg-dark-bg-secondary/50 border-dark-border' : 'bg-white/10 border-white/20'
          }`}>
            <p className="text-lg">
              Every expert was once a beginner. This guide will walk you through everything you need to know 
              to make your first contribution with confidence. You've got this! 🚀
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Step-by-Step Guide */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Your Contribution Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className={`rounded-xl shadow-lg p-6 border-l-4 border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'bg-dark-bg-secondary border border-dark-border' 
                  : 'bg-light-bg-secondary border border-light-border'
              }`}>
                <div className="flex items-center mb-4">
                  <div className="bg-primary p-3 rounded-full mr-4 text-white">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary">STEP {index + 1}</span>
                    <h3 className={`text-lg font-bold ${
                      isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>{step.title}</h3>
                  </div>
                </div>
                <p className={`mb-3 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>{step.description}</p>
                <p className={`text-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>{step.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Git Commands Cheat Sheet */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Essential Git Commands
          </h2>
          <div className={`w-full rounded-xl p-4 md:p-6 shadow-xl border ${
            isDark 
              ? 'bg-dark-bg-tertiary border-dark-border' 
              : 'bg-gray-900 border-gray-700'
          }`}>
            <div className="space-y-4">
              {commands.map((cmd) => (
                <div key={cmd.id} className={`rounded-lg p-3 md:p-4 border ${
                  isDark 
                    ? 'bg-dark-bg-secondary border-dark-border' 
                    : 'bg-gray-800 border-gray-700'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                    <h4 className="text-primary font-semibold text-sm md:text-base">{cmd.title}</h4>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className={`flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-all duration-300 hover:scale-105 self-start sm:self-center ${
                        isDark 
                          ? 'bg-dark-bg-tertiary hover:bg-dark-bg-primary text-dark-text-primary border border-dark-border' 
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {copiedCommand === cmd.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCommand === cmd.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-primary block mb-2 font-mono text-sm md:text-base break-all">{cmd.command}</code>
                  <p className={`text-xs md:text-sm ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-400'
                  }`}>{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pull Request Creation Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Creating Your Pull Request
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Once you've pushed your changes, it's time to create a pull request. This is where your contribution 
              gets reviewed and potentially merged into the main project!
            </p>
          </div>

          <div className={`rounded-2xl p-4 md:p-8 shadow-xl border ${
            isDark 
              ? 'bg-dark-bg-secondary border-dark-border' 
              : 'bg-light-bg-secondary border-light-border'
          }`}>
            <div className="space-y-6 md:space-y-8">
              {prSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 group">
                  <div className="flex-shrink-0 self-center md:self-start">
                    <div className="bg-primary p-3 md:p-4 rounded-full text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                      {step.icon}
                    </div>
                    <div className="hidden md:block w-px h-12 bg-primary/30 mx-auto mt-4 last:hidden"></div>
                  </div>
                  <div className={`flex-1 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border ${
                    isDark 
                      ? 'bg-dark-bg-tertiary border-dark-border' 
                      : 'bg-light-bg-tertiary border-light-border'
                  }`}>
                    <div className="flex items-center mb-3">
                      <span className="text-primary font-bold text-sm">
                        STEP {index + 1}
                      </span>
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>{step.title}</h3>
                    <p className={`mb-4 text-sm md:text-base ${
                      isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>{step.description}</p>
                    <div className={`rounded-lg p-3 border-l-4 border-primary ${
                      isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
                    }`}>
                      <p className={`text-xs md:text-sm ${
                        isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                      }`}>
                        <span className="font-semibold">💡 Pro tip:</span> {step.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-lg ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Got questions? We've got answers! Click on any question to expand it.
            </p>
          </div>

          {/* FAQ Groups */}
          {Object.entries(faqCategories).map(([categoryKey, categoryInfo]) => {
            const categoryFaqs = faqs.filter(faq => faq.category === categoryKey);
            
            return (
              <div key={categoryKey} className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {categoryInfo.name}
                </h3>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, index) => {
                    const faqIndex = faqs.indexOf(faq);
                    return (
                      <div key={faqIndex} className={`rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300 ${
                        isDark 
                          ? 'bg-dark-bg-secondary border-dark-border' 
                          : 'bg-light-bg-secondary border-light-border'
                      }`}>
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === faqIndex ? null : faqIndex)}
                          className={`w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-300 group ${
                            isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary p-2 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                              {faq.icon}
                            </div>
                            <h3 className={`text-lg font-semibold group-hover:text-primary transition-colors duration-300 ${
                              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                            }`}>
                              {faq.question}
                            </h3>
                          </div>
                          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                            {expandedFAQ === faqIndex ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>
                        {expandedFAQ === faqIndex && (
                          <div className={`px-6 pb-6 border-t ${
                            isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-light-bg-tertiary border-light-border'
                          }`}>
                            <div className={`rounded-lg p-4 mt-4 backdrop-blur-sm border ${
                              isDark 
                                ? 'bg-dark-bg-secondary border-dark-border' 
                                : 'bg-light-bg-secondary border-light-border'
                            }`}>
                              <p className={`leading-relaxed ${
                                isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                              }`}>{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Helpful Resources */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Learning Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group border ${
                  isDark 
                    ? 'bg-dark-bg-secondary border-dark-border' 
                    : 'bg-light-bg-secondary border-light-border'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary p-3 rounded-full mr-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <ExternalLink className={`w-4 h-4 group-hover:text-primary transition-colors duration-300 ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 ${
                  isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>{resource.title}</h3>
                <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>{resource.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className={`bg-primary rounded-xl p-8 text-center text-white shadow-xl ${
          isDark ? 'text-dark-text-primary' : 'text-white'
        }`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make Your First Contribution?</h2>
          <p className="text-lg mb-8 opacity-90">
            You're all set! Remember, the community is here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={() => window.open("https://github.com/Roshansuthar1105/Codify", "_blank")}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center transform hover:-translate-y-0.5 ${
                  isDark 
                    ? 'bg-dark-bg-secondary text-primary border border-dark-border hover:bg-dark-bg-tertiary' 
                    : 'bg-white text-primary hover:bg-gray-100'
                }`}
            >
              <Github className="w-5 h-5 mr-2" />
              Continue to GitHub
            </button>
          </div>
          <p className={`text-sm mt-6 opacity-80 ${
            isDark ? 'text-dark-text-secondary' : 'text-white/80'
          }`}>
            💡 Pro tip: Don't hesitate to ask questions in our community channels. We're all here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributorGuide;