const User = require('./User');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Prompt = require('./Prompt');

// הגדרת קשרים (Associations) לפי דרישות המשימה:

// 1. קטגוריה אחת מכילה הרבה סאב-קטגוריות
Category.hasMany(SubCategory, { foreignKey: 'category_id', onDelete: 'CASCADE' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

// 2. משתמש יכול ליצור הרבה פרומפטים (היסטוריה)
User.hasMany(Prompt, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Prompt.belongsTo(User, { foreignKey: 'user_id' });

// 3. כל פרומפט שייך לסאב-קטגוריה מסוימת
SubCategory.hasMany(Prompt, { foreignKey: 'sub_category_id', onDelete: 'CASCADE' });
Prompt.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

module.exports = {
  User,
  Category,
  SubCategory,
  Prompt
};