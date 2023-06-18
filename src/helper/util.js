const jwt = require('jsonwebtoken');
const config = require('config');

async function getToken(payload) {
  const token = await jwt.sign(payload, config.get('jwtsecret'), { expiresIn: '365d' });
  return token;
}

module.exports = {
  getToken
};
