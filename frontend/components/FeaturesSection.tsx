import React from "react";
import { Truck, ShieldCheck, Box, Headset, ShoppingCart } from "lucide-react";
import CTAButton from "./OrderButton";
import OrderButton from "./OrderButton";
// import CTAButton from "./CTAbutton";

const FeaturesSection = () => {
  const features = [
    {
      title: "ক্যাশ অন ডেলিভারি",
      description: "পণ্য হাতে পেয়ে পেমেন্ট",
      icon: <Truck className="text-[#F37021] w-8 h-8" />,
    },
    {
      title: "নিরাপদ ডেলিভারি",
      description: "সারাদেশে নিরাপদ পৌঁছায়",
      icon: <ShieldCheck className="text-[#F37021] w-8 h-8 hover:bg-blue-400" />,
    },
    {
      title: "অরিজিনাল প্রোডাক্ট",
      description: "১০০% খাঁটি পণ্যের গ্যারান্টি",
      icon: <Box className="text-[#F37021] w-8 h-8" />,
    },
    {
      title: "২৪/৭ সাপোর্ট",
      description: "যেকোনো সমস্যায় পাশে আছি",
      icon: <Headset className="text-[#F37021] w-8 h-8" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-12">
          কেন আমাদের থেকে কিনবেন
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="bg-[#FFF5ED] p-4 rounded-2xl mb-6">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg lg:text-xl font-bold text-[#333] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default FeaturesSection;
