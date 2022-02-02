const { Sequelize } = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  user_id : {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  disabled_at: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

module.exports = User;
