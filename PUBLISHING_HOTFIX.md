# Publishing a Hotfix for NGX Skeleton Loader

> This guide outlines the steps to publish a hotfix for the NGX Skeleton Loader package for older versions - if necessary.

A hotfix addresses critical issues that need immediate attention without waiting for the next scheduled release cycle.

## Prerequisites

Please make sure you're using the correct NodeJS and NPM versions, as described below - and also in `.nvmrc` file.

> **Note** requires node v20.x.x or higher and npm 10.x.x.

## Hotfix Process

### 1. Identify the Issue

Clearly define the issue that needs a hotfix. Use the following steps:

Open an issue on GitHub, detailing the problem and its urgency.

Reference the issue number in all subsequent commits and documentation.

### 2. Create a Hotfix Branch

Create a new branch based on the latest stable release tag.

# Clone the package and fetch the latest tags and branches

```bash
git clone https://github.com/willmendesneto/ngx-skeleton-loader.git
cd ngx-skeleton-loader
git fetch --all
```

# Check out the latest stable release without the issue in specific

```bash
# By running `git checkout <latest-stable-tag>`
# you will be in a detached head state. E.G:
git checkout v1.1.0
```

# Create and switch to a hotfix branch

```bash
# create new branch based on detached head state
git checkout -b hotfix/<issue-key>
```

### 3. Implement the Fix

Modify the necessary files in the codebase.

Run tests to confirm the fix resolves the issue without introducing new bugs.

### 4. Update the Version Number

Use npm to bump the patch version. The new version follows semantic versioning:

```bash
npm version patch
```

This updates the version in package.json and creates a Git tag for the new version.

### 5. Add a Changelog Entry

Update the `CHANGELOG.md` file with details of the hotfix:

```bash
## [x.y.z] - YYYY-MM-DD
### Fixed
- [#issue-number] Description of the hotfix.
```

### 6. Push Changes to the Repository

Push the hotfix branch and the updated tag to the remote repository:

```bash
git push origin hotfix/<issue-key>
git push origin --tags
```

### 7. Create a Pull Request

Open a pull request (PR) from the hotfix branch to the main branch.If it's not against main, please make sure you're pointing to the right branch - and add all relevant reviewers.

Include a link to the issue being resolved and the changelog entry.

### 8. Merge and Publish the Package Fix

Once the PR is reviewed and merged, the updated package will be published to npm by following the [Publish steps as described on `README.md` file.](https://github.com/willmendesneto/ngx-skeleton-loader?tab=readme-ov-file#publish)


## Notes

Testing: Always run the full test suite before merging and publishing a hotfix.

Documentation: Maintain up-to-date documentation for future contributors.

By following these steps, you ensure a smooth and reliable hotfix process for the NGX Skeleton Loader package.
