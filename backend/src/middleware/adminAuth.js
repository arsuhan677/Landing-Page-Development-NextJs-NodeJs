const jwt = require("jsonwebtoken");
const db = require("../config/firebase");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const adminDoc = await db.collection("admins").doc(decoded.uid).get();

    if (!adminDoc.exists) return res.status(401).json({ message: "Not authorized" });

    const adminData = adminDoc.data();

    if (adminData.role !== "admin") return res.status(401).json({ message: "Only admin" });

    req.admin = adminData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = adminAuth;
