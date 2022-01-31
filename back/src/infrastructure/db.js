const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  user: 'postgres',
  password: '654321',
  database: 'solar-project',
  port: 5001
});

module.exports = db;