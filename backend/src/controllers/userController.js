const User = require('../models/User');

// פונקציה להתחברות או הרשמה של משתמש
exports.login = async (req, res) => {
    try {
        const { name, phone } = req.body;

        // בדיקה בסיסית שקיבלנו נתונים
        if (!name || !phone) {
            return res.status(400).json({ error: 'נא לספק שם ומספר טלפון' });
        }

        // שימוש ב-findOrCreate של Sequelize
        const [user, created] = await User.findOrCreate({
            where: { phone: phone },
            defaults: { name: name }
        });

        res.status(200).json({
            message: created ? 'משתמש חדש נוצר בהצלחה' : 'ברוך הבא שוב',
            user: user
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'שגיאה פנימית בשרת' });
    }
};