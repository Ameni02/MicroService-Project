const { sequelize } = require('./config/database');
const { Thread, Reply } = require('./models');

async function initializeDatabase() {
  try {
    // Force sync will drop and recreate all tables
    await sequelize.sync({ force: true });
    console.log('Database initialized successfully');
    
    // Create a test thread
    const testThread = await Thread.create({
      title: 'Welcome to the Discussion Forum',
      content: 'This is a test thread. Feel free to reply!',
      author: 'System'
    });
    
    console.log('Test thread created:', testThread.toJSON());
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 