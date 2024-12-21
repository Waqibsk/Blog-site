const JWT = require("jsonwebtoken");
const secret = "batman";

function CreateToken(user) {
  const payload = {
    fullname: user.fullname,
    email: user.email,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function VerifyToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification error:", err);
    throw err;
  }
}

module.exports = {
  CreateToken,
  VerifyToken,
};
