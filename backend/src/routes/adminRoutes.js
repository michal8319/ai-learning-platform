const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// שליפת כל המשתמשים עם היסטוריה
router.get('/users', adminController.getAllUsers);

module.exports = router;
