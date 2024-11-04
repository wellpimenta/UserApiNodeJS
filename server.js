const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');
const sequelize = require('./src/config/db');

app.use(express.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
