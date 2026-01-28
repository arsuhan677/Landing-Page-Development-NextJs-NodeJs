const jwt = require("jsonwebtoken");

// Admin middleware
const adminAuth = (req, res, next) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Role check
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only" });
    }

    // 5️⃣ Attach admin info to request
    req.admin = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role,
    };

    // ✅ next middleware
    next();

  } catch (error) {
    console.log("Admin Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = adminAuth;



// import admin from "./firebaseAdmin.js";
// import { Admin } from "./AdminModel.js";

// export const adminOnly = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token" });
//     }

//     const decoded = await admin.auth().verifyIdToken(token);

//     const adminUser = await Admin.findOne({
//       uid: decoded.uid,
//       isActive: true,
//     });

//     if (!adminUser) {
//       return res.status(403).json({ message: "Not an admin" });
//     }

//     req.admin = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

