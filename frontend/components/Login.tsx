// // src/components/LoginForm.tsx
// "use client"; // if using Next.js app directory

// import React, { useState } from "react";
// import { auth } from "@/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { adminLogin } from "./AdminLogin";

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null);
//   setLoading(true);

//   try {
//     // 1️⃣ Firebase login
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);

//     // 2️⃣ Get Firebase ID token
//     const token = await userCredential.user.getIdToken();

//     // 3️⃣ Verify admin on backend
//     const res = await fetch("http://localhost:5000/api/admin/dashboard", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       // 4️⃣ Not an admin → logout
//       await auth.signOut();
//       setError("You are not admin");
//       return;
//     }

//     console.log("Admin logged in");
//     alert(`Welcome ${userCredential.user.email}`);
//   } catch (err: any) {
//     console.error(err);
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4"
//     >
//       <h2 className="text-2xl font-bold text-center">Login</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//         required
//       />

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-all active:scale-95"
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
