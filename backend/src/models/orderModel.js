// const db = require('../firebase');

// const UnconfirmedOrders = db.collection("unconfirmedOrders");
// const ConfirmedOrders = db.collection("confirmedOrders");

// class Order {
//   static async saveUnconfirmed(orderData) {
//     const docRef = UnconfirmedOrders.doc();
//     await docRef.set({
//       ...orderData,
//       status: "unconfirmed",
//       createdAt: new Date().toISOString()
//     });
//     return docRef.id;
//   }

//   static async saveConfirmed(orderData) {
//     const docRef = ConfirmedOrders.doc();
//     await docRef.set({
//       ...orderData,
//       status: "confirmed",
//       createdAt: new Date().toISOString()
//     });
//     return docRef.id;
//   }

//   static async moveToConfirmed(orderId, confirmedData) {
//     // Unconfirmed থেকে ডেটা নিয়ে Confirmed-এ সেট করা
//     const unconfirmedDoc = UnconfirmedOrders.doc(orderId);
//     const doc = await unconfirmedDoc.get();
//     if (!doc.exists) throw new Error("Unconfirmed order not found");

//     await ConfirmedOrders.doc(orderId).set({
//       ...doc.data(),
//       ...confirmedData,
//       status: "confirmed",
//       confirmedAt: new Date().toISOString()
//     });

//     await unconfirmedDoc.delete();
//   }
// }

// module.exports = Order;
