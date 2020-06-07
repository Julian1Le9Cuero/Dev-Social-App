const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json("No token, provide valid credentials.");
  }
  try {
    const decoded = jwt.verify(token, config.get("jsonSecret"));

    req.user = decoded.user.id;
    next();
  } catch (error) {
    return res.status(401).json("Invalid token, provide valid credentials.");
  }
};

module.exports = auth;
