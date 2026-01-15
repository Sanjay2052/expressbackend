const JWT = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decoded = JWT.verify(token,"secret");

    req.userid = decoded.userid;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = auth;
