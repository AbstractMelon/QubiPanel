const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');

const appsDir = path.join(__dirname, '..', '..', 'apps');

async function cloneRepo(repoUrl) {
  const repoName = path.basename(repoUrl, '.git');
  const appPath = path.join(appsDir, repoName);

  // Remove if the folder already exists
  await fs.remove(appPath);

  // Clone the repository
  const git = simpleGit();
  await git.clone(repoUrl, appPath);

  return appPath;
}

module.exports = { cloneRepo };
