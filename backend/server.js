// 1. ייבוא ספריות חיצוניות
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. טעינת משתני הסביבה מקובץ .env (חייב לקרות לפני השימוש ב-process.env)
dotenv.config();

// 3. ייבוא הגדרות בסיס הנתונים והמודלים
const sequelize = require('./src/config/db');
const models = require('./src/models');// טעינת המודלים והקשרים

// 4. יצירת האפליקציה של Express
const app = express();

// 5. הגדרת Middleware בסיסיים
app.use(cors());
app.use(express.json()); // מאפשר לקרוא בקשות JSON

// 6. ייבוא הראוטרים (הנתיבים)
const userRoutes = require('./src/routes/userRoutes');
const learningRoutes = require('./src/routes/learningRoutes');

// 7. חיבור הראוטרים לאפליקציה (רק אחרי ש-app וגם הראוטרים הוגדרו!)
app.use('/api/users', userRoutes);
app.use('/api/learning', learningRoutes);

const PORT = process.env.PORT || 5000;

// 8. סנכרון בסיס הנתונים והרצת השרת
sequelize.sync({ force: false }) // force: false שומר על הנתונים הקיימים
  .then(() => {
    console.log('Database connected and synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("OpenAI Key Loaded:", process.env.OPENAI_API_KEY ? "Yes (starts with " + process.env.OPENAI_API_KEY.substring(0, 7) + ")" : "No");
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });