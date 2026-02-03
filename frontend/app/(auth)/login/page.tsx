"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Admin Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button className="w-full border border-gray-300 cursor-pointer bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors">
          Login
        </button>
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </form>
    </div>
    </>
  );
}
