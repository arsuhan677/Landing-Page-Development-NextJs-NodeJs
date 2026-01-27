// components/CTAButton.jsx
import React from "react";
import { ShoppingCart } from "lucide-react";

const CTAButton = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#F37021] hover:bg-orange-600 text-white cursor-pointer font-bold py-4 px-10 rounded-2xl flex items-center gap-3 shadow-lg shadow-orange-200 transition-transform active:scale-95 ${className}`}
    >
      <ShoppingCart size={22} />
      {children}
    </button>
  );
};

export default CTAButton;
