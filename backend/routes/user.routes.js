// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const requireAuth = require('../middleware/auth');

router.get('/privacy', requireAuth, userController.getPrivacySetting);
router.put('/privacy', requireAuth, userController.updatePrivacySetting);

module.exports = router;
