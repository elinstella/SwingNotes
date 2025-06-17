const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  modifiedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relation: en användare har flera anteckningar
User.hasMany(Note, { foreignKey: 'userId', onDelete: 'CASCADE' });
Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
