const userService = require('../services/userService');

const getUser = async (req, res, next) => {
  const { email = '' } = req;
  
  try {
    const response = await userService.getUser({ email });
    res.json({ 
      user: { 
        id: response['user_id'], 
        name: response.name, 
        email: response.email
      } 
    });
    next();
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
}

module.exports = {
  getUser,
}