const aiService = require('../services/aiService');

exports.generateLesson = async (req, res) => {
    try {
        const { category, subCategory } = req.body;

        if (!category?.trim() || !subCategory?.trim()) {
            return res.status(400).json({ error: 'נא לספק קטגוריה ותת-קטגוריה' });
        }

        // קריאה לשירות ה-AI שכתבנו קודם
        const content = await aiService.generateLearningContent(category, subCategory);

        res.status(200).json({
            success: true,
            topic: subCategory,
            data: content
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};