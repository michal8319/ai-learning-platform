const { Category, SubCategory } = require('../models');

// שליפת כל הקטגוריות
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [['name', 'ASC']] });
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// שליפת סאב-קטגוריות לפי קטגוריה
exports.getSubCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const subCategories = await SubCategory.findAll({
            where: { category_id: categoryId },
            order: [['name', 'ASC']]
        });

        res.status(200).json({ success: true, subCategories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
