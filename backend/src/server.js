const app = require("./app");
const PORT = process.env.PORT || 5000;
console.log("hello server")

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));



// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const admin = require("firebase-admin");
// const productRoutes = require("./routes/productRoutes");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




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