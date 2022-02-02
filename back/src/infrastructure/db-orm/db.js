const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('solar-project', 'postgres', '654321', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5001
});

module.exports = sequelize;