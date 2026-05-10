const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category'); // חשוב לייבא את הקטגוריה כדי ליצור את הקשר

const SubCategory = sequelize.define('SubCategory', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    category_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', // שם הטבלה כפי שהוגדר ב-Category.js
            key: 'id'
        }
    }
}, { 
    tableName: 'sub_categories', 
    timestamps: false 
});

// הגדרת הקשרים (Relationships) - זה חלק קריטי בדרישות הפרויקט 
Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = SubCategory;