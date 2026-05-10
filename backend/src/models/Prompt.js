const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Prompt = sequelize.define('Prompt', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    category_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    sub_category_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    prompt: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    response: { 
        type: DataTypes.TEXT // כאן תישמר התשובה שנקבל מה-AI
    },
    created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, { 
    tableName: 'prompts', 
    timestamps: false 
});

module.exports = Prompt;
