require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const models = require('./src/models'); // טעינת המודלים והקשרים
const userRoutes = require('./src/routes/userRoutes');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// סנכרון בסיס הנתונים והרצת השרת
sequelize.sync({ force: false }) // force: false שומר על הנתונים הקיימים
  .then(() => {
    console.log('Database connected and synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  app.use('/api/users', userRoutes);