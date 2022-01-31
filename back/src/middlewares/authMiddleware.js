const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-authorization'];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.email = decoded.email;
    next();
  })
}

module.exports = {
  verifyJWT
}