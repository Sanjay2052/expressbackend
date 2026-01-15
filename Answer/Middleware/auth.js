const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    // 1️⃣ Read Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token, "secret"
    );

    req.userId =decoded.userid

    if (!req.userId) {
      console.error("JWT payload missing userId:", decoded);
      return res.status(401).json({
        message: "UserId is missing from request",
      });
    }

    // 5️⃣ Continue to next middleware / controller
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = auth;
