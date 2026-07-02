const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// הגדרת הנתיב - POST כי אנחנו שולחים מידע (שם וטלפון)
router.post('/login', userController.login);

module.exports = router;