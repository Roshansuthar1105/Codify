import { useEffect } from "react";
import { useLocation } from "react-router";

const gitRoutesAndTitles = {
    // Introduction
    "/notes/git": "Master Git & Version Control | Codify",
    "/notes/git/what-is-version-control": "What is Version Control? | Codify",
    "/notes/git/benefits-of-version-control": "Benefits of Version Control | Codify",
    "/notes/git/centralized-vs-distributed-version-control": "Centralized vs Distributed Version Control | Codify",

    // Getting Started with Git
    "/notes/git/installing-git": "Installing Git | Codify",
    "/notes/git/configuring-git-(username,-email,-editor)": "Configuring Git (Username, Email, Editor) | Codify",
    "/notes/git/understanding-git-architecture": "Understanding Git Architecture | Codify",
    "/notes/git/initializing-a-repository-(git-init)": "Initializing a Repository (git init) | Codify",

    // Basic Git Commands
    "/notes/git/git-status": "Git Status | Codify",
    "/notes/git/git-add": "Git Add | Codify",
    "/notes/git/git-commit": "Git Commit | Codify",
    "/notes/git/git-log": "Git Log | Codify",
    "/notes/git/git-diff": "Git Diff | Codify",
    "/notes/git/git-reset": "Git Reset | Codify",

    // Branching and Merging
    "/notes/git/creating-branches-(git-branch,-git-checkout--b)": "Creating Branches (git branch, git checkout -b) | Codify",
    "/notes/git/merging-branches-(git-merge)": "Merging Branches (git merge) | Codify",
    "/notes/git/fast-forward-vs-three-way-merge": "Fast-forward vs Three-way merge | Codify",
    "/notes/git/resolving-merge-conflicts": "Resolving Merge Conflicts | Codify",
    "/notes/git/deleting-branches-(git-branch--d)": "Deleting Branches (git branch -d) | Codify",

    // Remote Repositories
    "/notes/git/what-is-a-remote-repository": "What is a Remote Repository? | Codify",
    "/notes/git/git-remote-add": "Git Remote Add | Codify",
    "/notes/git/git-push-and-git-pull": "Git Push and Git Pull | Codify",
    "/notes/git/git-fetch": "Git Fetch | Codify",
    "/notes/git/tracking-branches": "Tracking Branches | Codify",

    // Collaboration Workflows
    "/notes/git/cloning-a-repository-(git-clone)": "Cloning a Repository (git clone) | Codify",
    "/notes/git/forking-workflow": "Forking Workflow | Codify",
    "/notes/git/pull-requests": "Pull Requests | Codify",
    "/notes/git/code-review-basics": "Code Review Basics | Codify",

    // Undoing Changes
    "/notes/git/git-checkout-vs-git-restore": "Git Checkout vs Git Restore | Codify",
    "/notes/git/git-revert": "Git Revert | Codify",
    "/notes/git/git-reset-(soft,-mixed,-hard)": "Git Reset (soft, mixed, hard) | Codify",

    // Stashing and Tagging
    "/notes/git/git-stash-save-&-git-stash-pop": "Git Stash Save & Git Stash Pop | Codify",
    "/notes/git/git-stash-list": "Git Stash List | Codify",
    "/notes/git/creating-tags-(git-tag)": "Creating Tags (git tag) | Codify",
    "/notes/git/annotated-vs-lightweight-tags": "Annotated vs Lightweight Tags | Codify",

    // Advanced Git
    "/notes/git/rebasing-(git-rebase)": "Rebasing (git rebase) | Codify",
    "/notes/git/cherry-picking-(git-cherry-pick)": "Cherry-picking (git cherry-pick) | Codify",
    "/notes/git/git-hooks": "Git Hooks | Codify",
    "/notes/git/interactive-rebase": "Interactive Rebase | Codify",
    "/notes/git/squashing-commits": "Squashing Commits | Codify",

    // Git Best Practices
    "/notes/git/writing-good-commit-messages": "Writing Good Commit Messages | Codify",
    "/notes/git/branch-naming-conventions": "Branch Naming Conventions | Codify",
    "/notes/git/keeping-repositories-clean": "Keeping Repositories Clean | Codify",
    "/notes/git/avoiding-large-binary-files": "Avoiding Large Binary Files | Codify"
};



const GitPageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        const pageTitle = gitRoutesAndTitles[location.pathname] || "Codify";
        document.title = pageTitle;
    }, [location]);

    return null;
}

export default GitPageTitleManager