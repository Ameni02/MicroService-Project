const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Sync all models with alter option to preserve data
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

// Import models
const Thread = require('./Thread')(sequelize);
const Reply = require('./Reply')(sequelize);

// Define relationships
Thread.hasMany(Reply, {
    foreignKey: 'threadId',
    onDelete: 'CASCADE'
});
Reply.belongsTo(Thread, {
    foreignKey: 'threadId'
});

module.exports = {
    sequelize,
    testConnection,
    Thread,
    Reply
}; 