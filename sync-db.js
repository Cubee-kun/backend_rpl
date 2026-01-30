const { sequelize } = require('./models');

async function syncDatabase() {
  try {
    console.log('Syncing database...');
    
    // Force sync - CAUTION: This will drop and recreate tables
    await sequelize.sync({ force: false, alter: true });
    
    console.log('Database synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();