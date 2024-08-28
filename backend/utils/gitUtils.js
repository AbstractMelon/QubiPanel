const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');

const appsDir = path.join(__dirname, '..', '..', 'apps');

async function cloneRepo(repoUrl) {
  const repoName = path.basename(repoUrl, '.git');
  const appPath = path.join(appsDir, repoName);

  try {
    console.log(`Cloning repo: ${repoUrl}`);
    console.log(`Target path: ${appPath}`);

    // Remove if the folder already exists
    if (await fs.pathExists(appPath)) {
      console.log(`Removing existing directory: ${appPath}`);
      await fs.remove(appPath);
    }

    // Clone the repository
    const git = simpleGit();
    await git.clone(repoUrl, appPath);

    console.log(`Successfully cloned ${repoUrl} to ${appPath}`);
    return appPath;
  } catch (error) {
    console.error(`Failed to clone repo: ${repoUrl}`, error);
    throw error; // Re-throw to allow higher-level handling
  }
}

module.exports = { cloneRepo };
