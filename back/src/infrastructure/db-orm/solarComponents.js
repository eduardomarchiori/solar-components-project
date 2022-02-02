const { Sequelize } = require('sequelize');
const db = require('./db');
const User = require('./users');
const LogisticsDimensions = require('./logisticsDimensions');

const SolarComponent = db.define('solar_component', {
  solar_component_id : {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  gtim: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  sector: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  component_group: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  gross_weight: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  net_weight: {
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

SolarComponent.belongsTo(LogisticsDimensions, {
  constraint: true,
  foreignKey: 'logistic_dimension_id'
});

SolarComponent.belongsTo(User, {
  constraint: true,
  foreignKey: 'user_id'
});

module.exports = SolarComponent;