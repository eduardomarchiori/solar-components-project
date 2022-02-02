const { Sequelize } = require('sequelize');
const db = require('./db');

const LogisticsDimension = db.define('logistics_dimension', {
  logistic_dimension_id : {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  height: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  width: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  depth: {
    type: Sequelize.DECIMAL(10, 2),
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

module.exports = LogisticsDimension;

