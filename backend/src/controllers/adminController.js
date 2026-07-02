const { User, Prompt, SubCategory, Category } = require('../models');

// שליפת כל המשתמשים עם היסטוריית הפרומפטים שלהם
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Prompt,
                include: [{ model: SubCategory, attributes: ['name'] }]
            }],
            order: [['id', 'ASC']]
        });

        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
