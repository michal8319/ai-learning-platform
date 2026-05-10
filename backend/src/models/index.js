const User = require('./User');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Prompt = require('./Prompt');

// הגדרת קשרים (Associations) לפי דרישות המשימה:

// 1. קטגוריה אחת מכילה הרבה סאב-קטגוריות
Category.hasMany(SubCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

// 2. משתמש יכול ליצור הרבה פרומפטים (היסטוריה)
User.hasMany(Prompt, { foreignKey: 'userId' });
Prompt.belongsTo(User, { foreignKey: 'userId' });

// 3. כל פרומפט שייך לסאב-קטגוריה מסוימת
SubCategory.hasMany(Prompt, { foreignKey: 'subCategoryId' });
Prompt.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });

module.exports = {
  User,
  Category,
  SubCategory,
  Prompt
};