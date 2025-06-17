const sequelize = require('./config/database');
const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');

const User = require('./models/User');
const Note = require('./models/Note');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.authenticate()
  .then(() => {
    console.log('✅ Ansluten till databasen!');

    return sequelize.sync({ alter: true }); // Skapa/uppdatera tabeller vid behov
  })
  .then(() => {
    console.log('🛠 Databas synkroniserad!');
    app.listen(PORT, () => {
      console.log(`🚀 Servern körs på http://localhost:${PORT}`);
      console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ DB-fel:', err);
  });
