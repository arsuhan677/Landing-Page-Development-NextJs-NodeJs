"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Navbar */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold">REVO</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="text-white/80 hover:text-white">হোম</Link>
            <Link href="/উৎপাদন" className="text-white/80 hover:text-white">উৎপাদন</Link>
            <Link href="/usage" className="text-white/80 hover:text-white">ব্যবহার বিধি</Link>
            <Link href="/review" className="text-white/80 hover:text-white">রিভিউ</Link>
            <Link href="/faq" className="text-white/80 hover:text-white">FAQ</Link>
          </nav>

          {/* Order Button (Desktop) */}
          <Link
            href="/order"
            className="hidden md:flex items-center gap-2 border-2 border-white text-white px-4 py-2 rounded-2xl hover:bg-white hover:text-orange-500 transition"
          >
            🛒 অর্ডার করুন
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Trusted Bar */}
      <div className="bg-orange-700 text-center py-1 text-white text-sm">
        🛡️ Trusted · COD Available
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-orange-500 text-white overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-4 font-medium">
          <Link onClick={() => setOpen(false)} href="/" className="text-white/80 hover:text-white">হোম</Link>
          <Link onClick={() => setOpen(false)} href="/products" className="text-white/80 hover:text-white">উৎপাদন</Link>
          <Link onClick={() => setOpen(false)} href="/usage" className="text-white/80 hover:text-white">ব্যবহার বিধি</Link>
          <Link onClick={() => setOpen(false)} href="/review" className="text-white/80 hover:text-white">রিভিউ</Link>
          <Link onClick={() => setOpen(false)} href="/faq" className="text-white/80 hover:text-white">FAQ</Link>

          <Link
            onClick={() => setOpen(false)}
            href="/order"
            className="mt-2 w-max border border-white px-5 py-2 rounded-full"
          >
            🛒 অর্ডার
          </Link>
        </nav>
      </div>
    </header>
  );
}
