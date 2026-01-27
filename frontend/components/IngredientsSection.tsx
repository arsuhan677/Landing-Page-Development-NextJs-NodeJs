import React from 'react';
import { Sun, Droplets, Leaf, FlaskConical, Sparkles, ShoppingCart, ShieldCheck, Beaker } from 'lucide-react';
import OrderButton from './OrderButton';

const IngredientsSection = () => {
  const ingredients = [
    { name: "ভিটামিন সি", benefit: "ত্বক উজ্জ্বল ও গ্লোয়িং করে", icon: <Sun className="text-[#F37021] w-6 h-6" /> },
    { name: "হায়ালুরোনিক অ্যাসিড", benefit: "ত্বকে আর্দ্রতা ধরে রাখে", icon: <Droplets className="text-[#F37021] w-6 h-6" /> },
    { name: "অ্যালোভেরা", benefit: "ত্বককে প্রাকৃতিকভাবে সুরক্ষা দেয়", icon: <Leaf className="text-[#F37021] w-6 h-6" /> },
    { name: "নিয়াসিনামাইড", benefit: "পোর্স ছোট করে ও দাগ কমায়", icon: <FlaskConical className="text-[#F37021] w-6 h-6" /> },
    { name: "ভিটামিন ই", benefit: "এন্টি-এজিং এফেক্ট দেয়", icon: <Sparkles className="text-[#F37021] w-6 h-6" /> },
  ];

  return (
    <section id='উপাদান' className="py-4 lg:py-10">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-4">উপাদান</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            প্রিমিয়াম মানের উপাদান দিয়ে তৈরি, যা আপনার ত্বকের জন্য সম্পূর্ণ নিরাপদ
          </p>
        </div>

        {/* Ingredients Cards - Responsive Grid with consistent spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-sm"
            >
              <div className="bg-[#FFF5ED] p-3 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#333] mb-1 text-sm">{item.name}</h3>
              <p className="text-gray-500 text-[11px] leading-tight">{item.benefit}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 border border-orange-200 rounded-full bg-white text-xs font-medium text-gray-700">
            <ShieldCheck size={14} className="text-[#F37021]" />
            Paraben-Free
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-orange-200 rounded-full bg-white text-xs font-medium text-gray-700">
            <Beaker size={14} className="text-[#F37021]" />
            Dermatology Tested
          </div>
        </div>

        {/* CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default IngredientsSection;
