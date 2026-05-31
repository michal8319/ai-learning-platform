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
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName: 'sub_categories',
    timestamps: false
});

module.exports = SubCategory;