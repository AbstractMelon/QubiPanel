const express = require('express');
const { importApp, getFileStructure, runTerminalCommand } = require('../controllers/appController');
const router = express.Router();

router.post('/import', importApp);
router.get('/files', getFileStructure);
router.post('/terminal', runTerminalCommand);

module.exports = router;
