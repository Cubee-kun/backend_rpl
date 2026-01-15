require('dotenv').config();
const express = require('express');
const bodyParser = require('express').json;
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(bodyParser());
app.use('/uploads', express.static('uploads'));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected and synced');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
