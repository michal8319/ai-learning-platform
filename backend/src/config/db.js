const { Sequelize } = require('sequelize');
require('dotenv').config();

// התחברות למסד הנתונים לפי הכתובת ב-.env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // מונע הצפה של הטרמינל בלוגים
});

module.exports = sequelize;
