"use client";

import { useState } from "react";
import { api } from "@/utils/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      setMessage(res.data.message);

      if (res.status === 200) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error(err);

      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Admin Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full border border-gray-300 cursor-pointer bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors"
        >
          Login
        </button>

        {/* Message */}
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
