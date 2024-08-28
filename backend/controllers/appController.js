const { cloneRepo } = require('../utils/gitUtils');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

exports.importApp = async (req, res) => {
  const { repoUrl } = req.body;

  try {
    const appPath = await cloneRepo(repoUrl);
    res.json({ success: true, path: appPath });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFileStructure = (req, res) => {
  const dirPath = req.query.path;
  try {
    const files = fs.readdirSync(dirPath).map(file => ({
      name: file,
      path: path.join(dirPath, file),
      isDirectory: fs.lstatSync(path.join(dirPath, file)).isDirectory()
    }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.runTerminalCommand = (req, res) => {
  const { path, command } = req.body;

  exec(command, { cwd: path }, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ success: false, output: stderr });
    } else {
      res.json({ success: true, output: stdout });
    }
  });
};
