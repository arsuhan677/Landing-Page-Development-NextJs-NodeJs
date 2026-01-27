import React from 'react';
import { Droplets, Clock, Sparkles, Moon, ShoppingCart } from 'lucide-react';
import OrderButton from './OrderButton';

const UsageSteps = () => {
  const steps = [
    { id: 1, title: "মুখ পরিষ্কার করুন", description: "প্রথমে ফেসওয়াশ দিয়ে মুখ ধুয়ে শুকিয়ে নিন", icon: <Droplets className="text-[#F37021] w-8 h-8" /> },
    { id: 2, title: "৩-৪ ফোঁটা নিন", description: "হাতে ৩-৪ ফোঁটা সিরাম নিন", icon: <Clock className="text-[#F37021] w-8 h-8" /> },
    { id: 3, title: "মুখে লাগান", description: "আলতো করে মুখে ম্যাসাজ করুন", icon: <Sparkles className="text-[#F37021] w-8 h-8" /> },
    { id: 4, title: "রাতে ব্যবহার করুন", description: "সেরা ফলাফলের জন্য রাতে ব্যবহার করুন", icon: <Moon className="text-[#F37021] w-8 h-8" /> },
  ];

  return (
    <section className="bg-[#FFF5ED] py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">ব্যবহার বিধি</h2>
          <p className="text-gray-500 text-base">সঠিক ফলাফলের জন্য নিচের ধাপগুলো অনুসরণ করুন</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="relative pt-4">
              {/* Number Badge */}
              <div className="absolute top-0 left-6 z-10 bg-[#F37021] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {step.id}
              </div>

              {/* Step Card */}
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                {/* Icon Container */}
                <div className="bg-[#FFF5ED] p-4 rounded-2xl mb-6">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-[#333] mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default UsageSteps;
