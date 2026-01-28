const admin = require("firebase-admin");
require("dotenv").config();

// Service Account from .env
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore database
const db = admin.firestore();

module.exports = db;











// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDOYBqeSLd5lX_lsSLyPtiOP9iikKv2FUQ",
//   authDomain: "landing-page-ecbf4.firebaseapp.com",
//   projectId: "landing-page-ecbf4",
//   storageBucket: "landing-page-ecbf4.firebasestorage.app",
//   messagingSenderId: "306137026937",
//   appId: "1:306137026937:web:42005be1b668e1295ddfa8",
//   measurementId: "G-7WZG26XQG5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
