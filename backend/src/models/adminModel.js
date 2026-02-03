const db = require("../config/firebase");

const ADMIN_COLLECTION = "admins";

const getAdminByEmail = async (email) => {
  const snapshot = await db.collection(ADMIN_COLLECTION).where("email", "==", email).get();
  if (snapshot.empty) return null;
  let adminData;
  snapshot.forEach((doc) => {
    adminData = { id: doc.id, ...doc.data() };
  });
  return adminData;
};

module.exports = { getAdminByEmail };
