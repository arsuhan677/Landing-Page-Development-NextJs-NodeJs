// ==========================================
// MIDDLEWARE - Token Verify
// ==========================================
// Protected routes এর আগে এটা run হবে।
// Token valid কিনা চেক করবে।

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token নেই।",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // decoded info টা req এ রাখি
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token Invalid।",
    });
  }
};

module.exports = { verifyToken };
