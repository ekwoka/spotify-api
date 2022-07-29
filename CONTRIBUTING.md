# Contributing Guide

Thank you for investing your time in contributing to our project! Any contribution you make will be invaluable to improving this project ✨.

In this guide you will get an overview of the contribution workflow as well as any important standards to ensuring your contribution is handled correctly

## New contributor guide

To get an overview of the project, read the [README](https://github.com/ekwoka/spotify-api/README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

Getting started is quite simple. You can clone the repo or fork it and get to work.

Once cloned, just run `npm install`.

You will need to add a `.env` file containing the following key-value pairs:

```
REFRESH_TOKEN='a valid refresh token'
SPOTIFY_CLIENT='spotify developer client id'
SPOTIFY_SECRET='spotify developer client secret'
```

You can get these by [visiting the Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login)

> TODO: Add info about how to get a refresh token

### Issues

#### Create a new issue

The easiest way to get started is to report issues, like bugs (things not doing what they are supposed to do), unexpected behavior (things doing things in a way different than you might intuit), or important missing features (things currently not supported at all).

If you spot such a problem with the library, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/ekwoka/spotify-api/issues/new/).

#### Solve an issue

Issues are also the best way to get started contributing code if you yourself haven't found a specific thing you want to add.

Scan through our [existing issues](https://github.com/ekwoka/spotify-api/issues) to find one that interests you. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix, or add your own thoughts on a best solution

### Make Changes Locally

1.  Fork the repository.

- Using GitHub Desktop:

  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2.  Install or update to **Node.js v18**.

> Node 18.x is recommended for local development, as this library depends on the native fetch, only available in Node versions above 18.0.0. While users of the library can use their own fetch implementations, for development none will be added (DO NOT TRY TO PR ADDING ANY FETCH POLYFILL).

3.  Create a working branch and start with your changes!

> TODO: Add details of setting up testing with a Spotify Refresh Token

### Commit your update

Commit the changes once you are happy with them. This project uses the [Gitmoji](https://gitmoji.dev) spec for commit messages.

While, optional, it is recommended to then have the commit title finish the sentence `This commit...` starting with an action verb.

Example:

```
🧪 Adds tests for arrayWrap
```

Once your changes are ready, don't forget to self-review to speed up the review process⚡. Look over your own code and make sure it does what it's supposed to do and covers it's own bases.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

It is advised that you rebase your branch to the `main` before starting your PR. This ensures you can deconflict any changes that happened while you were working on your changes.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge. Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).

### Your PR is merged!

Congratulations 🎉🎉 Thank You ✨.

Once your PR is merged, it will be bundled into the next release to NPM. This amount of time can vary but should be within a week for smaller changes and bug fixes.

## Windows

While this project does it's best to cross platform development tools, the main developer experience is only validated for MacOS (and other comparable Unix systems). PRs are welcome to improve Windows DX.
