"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    // sticky top-0 এবং z-50 নিশ্চিত করে এটি সবসময় উপরে থাকবে
    <header className="w-full sticky top-0 z-50 shadow-md"> 
      {/* Top Navbar */}
      <div className="bg-[#F37021]"> 
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold tracking-tight">REVO</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="text-white/80 hover:text-white transition">হোম</Link>
            <Link href="#উপাদান" className="text-white/80 hover:text-white transition">উপাদান</Link>
            <Link href="#ব্যবহার বিধি" className="text-white/80 hover:text-white transition">ব্যবহার বিধি</Link>
            <Link href="#রিভিউ" className="text-white/80 hover:text-white transition">রিভিউ</Link>
            <Link href="#FAQ" className="text-white/80 hover:text-white transition">FAQ</Link>
          </nav>

          {/* Order Button (Desktop) */}
          <Link
            href="#order"
            className="hidden md:flex items-center gap-2 border-2 border-white text-white px-5 py-2 rounded-2xl hover:bg-white hover:text-[#F37021] transition font-bold"
          >
            🛒 অর্ডার করুন
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl focus:outline-none"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Trusted Bar */}
      <div className="bg-[#d65d13] text-center py-1.5 text-white text-xs font-medium tracking-wide">
        🛡️ Trusted • COD Available
      </div>

      {/* Mobile Menu Overlay */}
      {/* h-screen এবং fixed ব্যবহার করা হয়েছে যাতে মোবাইল মেনু ওপেন হলে স্ক্রল লক থাকে */}
      <div
        className={`absolute top-full left-0 w-full bg-[#F37021] text-white shadow-2xl transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6 font-medium bg-[#F37021]">
          <Link onClick={() => setOpen(false)} href="/" className="text-white py-4 border-b border-white/10 text-lg">হোম</Link>
          <Link onClick={() => setOpen(false)} href="#ingredients" className="text-white py-4 border-b border-white/10 text-lg">উপাদান</Link>
          <Link onClick={() => setOpen(false)} href="#usage" className="text-white py-4 border-b border-white/10 text-lg">ব্যবহার বিধি</Link>
          <Link onClick={() => setOpen(false)} href="#reviews" className="text-white py-4 border-b border-white/10 text-lg">রিভিউ</Link>
          <Link onClick={() => setOpen(false)} href="#faq" className="text-white py-4 border-b border-white/10 text-lg">FAQ</Link>

          <div className="mt-8 pb-10">
            <Link
              onClick={() => setOpen(false)}
              href="#order"
              className="block w-full bg-white text-[#F37021] text-center py-4 rounded-2xl font-bold shadow-lg text-lg"
            >
              🛒 এখনই অর্ডার করুন
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}