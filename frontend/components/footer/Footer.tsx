"use client"

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-orange-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#F37021]">REVO</h2>
            <p className="text-white text-sm leading-relaxed">
              আমরা দিচ্ছি প্রিমিয়াম কোয়ালিটির স্কিনকেয়ার সলিউশন। আমাদের লক্ষ্য আপনার প্রাকৃতিক সৌন্দর্যকে আরও ফুটিয়ে তোলা।
            </p>
            <div className="flex gap-4">
              <Link href="#" className="bg-[#FFF5ED] p-2 rounded-full text-[#F37021] hover:bg-[#F37021] hover:text-white transition-all">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="bg-[#FFF5ED] p-2 rounded-full text-[#F37021] hover:bg-[#F37021] hover:text-white transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="bg-[#FFF5ED] p-2 rounded-full text-[#F37021] hover:bg-[#F37021] hover:text-white transition-all">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">প্রয়োজনীয় লিংক</h3>
            <ul className="space-y-3">
              <li><Link href="#ingredients" className="text-white hover:text-[#F37021] transition-colors">উপাদানসমূহ</Link></li>
              <li><Link href="#usage" className="text-white hover:text-[#F37021] transition-colors">ব্যবহার বিধি</Link></li>
              <li><Link href="#order" className="text-white hover:text-[#F37021] transition-colors">অর্ডার করুন</Link></li>
              <li><Link href="#faq" className="text-white hover:text-[#F37021] transition-colors">প্রশ্ন ও উত্তর</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">যোগাযোগ</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white">
                <Phone size={18} className="text-[#F37021]" />
                <span>+880 1701635619</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <Mail size={18} className="text-[#F37021]" />
                <span>aminurrahmansuhan@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <MapPin size={18} className="text-[#F37021]" />
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">পলিসি</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-white hover:text-[#F37021] transition-colors">প্রাইভেসি পলিসি</Link></li>
              <li><Link href="#" className="text-white hover:text-[#F37021] transition-colors">রিটার্ন ও রিফান্ড</Link></li>
              <li><Link href="#" className="text-white hover:text-[#F37021] transition-colors">শর্তাবলী</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-[#F37021] font-bold">REVO</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs italic">Developed by</span>
            <span className="text-gray-600 font-semibold text-sm">A R Suhan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;