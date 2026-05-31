const sequelize = require('../config/db');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

const data = [
  {
    name: 'מדע',
    subCategories: ['חלל וחקר הכוכבים', 'פיזיקה קוונטית', 'ביולוגיה תאית', 'כימיה אורגנית', 'גנטיקה ו-DNA']
  },
  {
    name: 'טכנולוגיה',
    subCategories: ['בינה מלאכותית', 'פיתוח Web', 'אבטחת סייבר', 'מסדי נתונים', 'ענן וDevOps']
  },
  {
    name: 'היסטוריה',
    subCategories: ['מלחמת העולם השנייה', 'האימפריה הרומית', 'המהפכה התעשייתית', 'תולדות עם ישראל', 'ציוויליזציות קדומות']
  },
  {
    name: 'מתמטיקה',
    subCategories: ['אלגברה לינארית', 'חשבון דיפרנציאלי', 'סטטיסטיקה והסתברות', 'תורת הגרפים', 'מספרים מרוכבים']
  },
  {
    name: 'שפות',
    subCategories: ['אנגלית עסקית', 'ספרדית למתחילים', 'צרפתית', 'ערבית', 'יפנית']
  },
  {
    name: 'כלכלה ועסקים',
    subCategories: ['שוק ההון', 'יזמות וסטארטאפ', 'שיווק דיגיטלי', 'ניהול פיננסי', 'כלכלה מאקרו']
  }
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    await sequelize.sync({ force: false });

    for (const cat of data) {
      const [category, created] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: { name: cat.name }
      });

      console.log(`${created ? '➕' : '⏭️ '} Category: ${cat.name}`);

      for (const subName of cat.subCategories) {
        const [, subCreated] = await SubCategory.findOrCreate({
          where: { name: subName, category_id: category.id },
          defaults: { name: subName, category_id: category.id }
        });
        console.log(`   ${subCreated ? '➕' : '⏭️ '} SubCategory: ${subName}`);
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
