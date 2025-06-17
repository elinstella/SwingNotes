const sequelize = require('./config/database');
const app = require('./app');

const User = require('./models/User');
const Note = require('./models/Note');

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Ansluten till databasen!');

    return sequelize.sync({ alter: true }); // Skapa/uppdatera tabeller
  })
  .then(() => {
    console.log('🛠 Databas synkroniserad!');
    app.listen(PORT, () => {
      console.log(`🚀 Servern körs på http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB-fel:', err);
  });
