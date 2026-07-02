const aiService = require('../services/aiService');
const { Prompt, SubCategory, Category } = require('../models');

// יצירת שיעור חדש ושמירתו ב-DB
exports.generateLesson = async (req, res) => {
    try {
        const { userId, categoryId, subCategoryId } = req.body;

        if (!userId || !categoryId || !subCategoryId) {
            return res.status(400).json({ error: 'נא לספק userId, categoryId ו-subCategoryId' });
        }

        // שליפת שמות הקטגוריה וסאב-קטגוריה
        const subCategory = await SubCategory.findByPk(subCategoryId, {
            include: [{ model: Category }]
        });

        if (!subCategory) {
            return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        }

        const categoryName = subCategory.Category.name;
        const subCategoryName = subCategory.name;

        // שליחה ל-AI
        const content = await aiService.generateLearningContent(categoryName, subCategoryName);

        // שמירה ב-DB
        const prompt = await Prompt.create({
            user_id: userId,
            category_id: categoryId,
            sub_category_id: subCategoryId,
            prompt: `הסבר על ${subCategoryName} מתוך ${categoryName}`,
            response: content
        });

        res.status(200).json({
            success: true,
            promptId: prompt.id,
            topic: subCategoryName,
            data: content
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// שליפת היסטוריית למידה של משתמש
exports.getHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        const history = await Prompt.findAll({
            where: { user_id: userId },
            include: [
                { model: SubCategory, attributes: ['name'] },
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({ success: true, history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};