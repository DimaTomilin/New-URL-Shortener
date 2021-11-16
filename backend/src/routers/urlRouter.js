const express = require('express');
const router = express.Router();
const { isURLExist } = require('../middleware/errorHandler');
const { createShotren, showStatistic } = require('../controllers/urlShorten');
const { authenticateToken } = require('../controllers/user');
const { validateURL } = require('../middleware/validation');

// user middleware error handler
router.use(authenticateToken);

router.put('/create', validateURL, isURLExist, createShotren);

router.get('/statistic', showStatistic);

module.exports = router;
