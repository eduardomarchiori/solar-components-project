const userData = require('../data/userData');

const createUser = ({ name, email, password }) => userData.createUser({ name, email, password });

const getUser = ({ email }) => userData.getUser({ email });

module.exports = {
  createUser,
  getUser
}
