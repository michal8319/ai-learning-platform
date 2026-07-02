const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

// יצירת שיעור חדש
router.post('/generate-lesson', learningController.generateLesson);

// היסטוריית למידה של משתמש
router.get('/history/:userId', learningController.getHistory);

module.exports = router;