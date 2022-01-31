var uuid = require('uuid');
const db = require('../infrastructure/db');

const createUser = ({ name, email, password }) => {
  return db.query('INSERT INTO users (user_id, name, email, password, created_at, updated_at) values($1, $2, $3, $4, $5, $6)', [
    uuid.v4(),
    name, 
    email, 
    password,
    new Date().toISOString(),
    new Date().toISOString()
  ]);
}

const getUser = ({ email }) => {
  return db.query('select * from users where email = $1', [ email ]);
}

module.exports = {
  getUser,
  createUser
}