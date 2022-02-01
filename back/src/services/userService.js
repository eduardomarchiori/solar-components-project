const userData = require('../data/userData');

const createUser = ({ name, email, password }) => userData.createUser({ name, email, password });

const getUser = ({ email }) => userData.getUser({ email }).then((res) => {
  const [ user ] = res;
  return user;
});

module.exports = {
  createUser,
  getUser
}
