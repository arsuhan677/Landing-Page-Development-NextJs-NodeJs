const db = require("../config/firebase");
const jwt = require("jsonwebtoken");
const adminAuthController = {};

adminAuthController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Auth sign in
    const firebaseAdmin = require("firebase-admin");
    const user = await firebaseAdmin
      .auth()
      .getUserByEmail(email)
      .catch(() => null);

    if (!user) return res.status(401).json({ message: "Admin not found" });

    // Check in Firestore admins collection
    const adminDoc = await db.collection("admins").doc(user.uid).get();

    if (!adminDoc.exists) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const adminData = adminDoc.data();

    if (adminData.role !== "admin") {
      return res.status(401).json({ message: "Only admin allowed" });
    }

    // JWT generate
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      role: adminData.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminAuthController;
