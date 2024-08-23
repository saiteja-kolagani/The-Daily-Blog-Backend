const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const authenticateToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
