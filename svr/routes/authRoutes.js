const express = require('express');
const { login, renewToken } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/renew-token', renewToken);

module.exports = router;
