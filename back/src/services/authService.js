require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService');

const singin = async ({ email, password }) => {

  if(!hasValidAuthInput({ email, password })){
    return Promise.reject(Error('Invalid signin inputs'));
  }

  const user = await userService.getUser({ email });

  if(!user) return Promise.reject(Error('User not found'));

  try {
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return Promise.reject(Error('Incorrect credentials'));

  } catch (error) {
    return Promise.reject(Error('Generic error'));
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

  if(!hasValidAuthInput({ name, email, password })){
    return Promise.reject(Error('Invalid signup inputs'));
  }

  const user = await userService.getUser({ email });
  if(user) return Promise.reject(Error('User already created'));

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return userService.createUser({ name, email, password: hashedPassword });
}

const hasValidAuthInput = (values) => {
  return !Object.values(values).some(el => !el);
}

module.exports = {
  singin,
  signup
}
