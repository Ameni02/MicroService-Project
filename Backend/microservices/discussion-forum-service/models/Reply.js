const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Reply = sequelize.define('Reply', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'replies',
        timestamps: true
    });

    return Reply;
}; 