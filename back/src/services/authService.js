require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService');

const singin = async ({ email, password }) => {
  const user = await userService.getUser({ email });

  if(!user) return Promise.reject(Error('User not found.'));

  try {
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return Promise.reject(Error('Incorrect credentials.'))

  } catch (error) {
    return Promise.reject(Error('User invalid.'));
  }

  const accessToken = jwt.sign({ email, userId: user['user_id'] }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 50000});
  return { 
    accessToken, 
    user: { 
      userId: user['user_id'],
      name: user.name,
      email: user.email
    }
  }
}

const signup = async ({ name, email, password }) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return userService.createUser({ name, email, password: hashedPassword });
}

module.exports = {
  singin,
  signup
}
