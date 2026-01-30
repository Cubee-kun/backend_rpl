require('dotenv').config();
const express = require('express');
const bodyParser = require('express').json;
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser());
app.use('/uploads', express.static('uploads'));

// simple health endpoint for dev and for Vite proxy checks
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected and synced');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to DB (continuing without DB):', err && err.message ? err.message : err);
    console.log('Starting server without DB connection (development only)');
    app.listen(PORT, () => console.log(`Server running on ${PORT} (DB not connected)`));
  }
}
start();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
