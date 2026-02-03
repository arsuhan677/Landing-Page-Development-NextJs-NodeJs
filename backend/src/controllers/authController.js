const { getAdminByEmail } = require("../models/adminModel");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await getAdminByEmail(email);
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Successful login
    res.status(200).json({ message: `Welcome ${admin.email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
