const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

// נתיב לקבלת שיעור מה-AI
router.post('/generate-lesson', learningController.generateLesson);

module.exports = router;