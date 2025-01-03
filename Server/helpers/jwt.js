const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signToken = (payLoad) => {
  return jwt.sign(payLoad, secretKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { signToken, verifyToken };
