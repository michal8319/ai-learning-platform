const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// שליפת כל הקטגוריות
router.get('/', categoryController.getAllCategories);

// שליפת סאב-קטגוריות לפי קטגוריה
router.get('/:categoryId/sub-categories', categoryController.getSubCategories);

module.exports = router;
