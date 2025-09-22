const jwt = require('jsonwebtoken');

function signToken(userId){
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
}

module.exports = { signToken };
