"use client"

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface OrderButtonProps {
  text?: string;
  className?: string;
}

const OrderButton = ({ text = "এখনই অর্ডার করুন", className = "" }: OrderButtonProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <button className="bg-[#F37021] hover:bg-orange-600 cursor-pointer text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-3 shadow-lg shadow-orange-200 transition-all active:scale-95">
        <ShoppingCart size={22} />
        {text}
      </button>
    </div>
  );
};

export default OrderButton;