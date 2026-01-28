// const db = require("../config/firebase");
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/admin");

// const adminController = {};

// adminController.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const response = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
//       {
//         email,
//         password,
//         returnSecureToken: true,
//       }
//     );

//     const uid = response.data.localId;

//     const adminDocRef = db.collection("admins").doc(uid);
//     let adminDoc = await adminDocRef.get();

//     if (!adminDoc.exists) {
//       const newAdmin = new Admin({ uid, email, role: "admin" });
//       await adminDocRef.set(newAdmin.toPlainObject());
//       adminDoc = await adminDocRef.get();
//     }

//     const adminData = adminDoc.data();

//     if (adminData.role !== "admin") {
//       return res.status(401).json({ success: false, message: "Only admin allowed" });
//     }

//     const token = jwt.sign(
//       { uid, email, role: adminData.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       uid,
//       email,
//       role: adminData.role,
//       token,
//       message: "Admin logged in successfully",
//     });

//   } catch (error) {
//     console.log("Firebase Login Error:", error.response?.data || error.message);
//     res.status(401).json({ success: false, message: "Invalid email or password" });
//   }
// };

// module.exports = adminController;
