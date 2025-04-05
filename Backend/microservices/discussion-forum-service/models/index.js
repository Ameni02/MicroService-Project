const Thread = require('./Thread');
const Reply = require('./Reply');

// Define the relationships
Thread.hasMany(Reply, { foreignKey: 'threadId' });
Reply.belongsTo(Thread, { foreignKey: 'threadId' });

module.exports = {
  Thread,
  Reply
}; 