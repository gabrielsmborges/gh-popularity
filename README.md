# GitHub Popularity API

This is a simple API that returns the popularity of a GitHub repository. It is based on the [GitHub API](https://developer.github.com/v3/).

### Usage
 - Run `npm install` to install the dependencies.
 - Run `npm serve` to start the server.
 - GET `/popularity?repoName=repo/owner` to get the popularity of a repository.    
   Example: `http://localhost:3000/popularity?repoName=facebook/react`


*A **GITHUB_TOKEN** environment variable is required to use this API. You can get one [here](https://github.com/settings/tokens).*
