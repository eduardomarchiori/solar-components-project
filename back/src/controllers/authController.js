const authService = require('../services/authService')

const signup = async (req, res, next) => {
  const { email = '', name = '', password = '' } = req.body;

  try {
    await authService.signup({ name, email, password });
    console.log(`Usuário ${email} criado com sucesso.`);
    res.sendStatus(201);
    next();
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
}


const signin = async (req, res, next) => {
  const { email = '', password = '' } = req.body;
  
  try {
    const response = await authService.singin({ email, password });
    console.log(`Sessão do usuário ${email} iniciada com sucesso.`);
    res.json(response);
    next()
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
}

module.exports = {
  signin,
  signup
}