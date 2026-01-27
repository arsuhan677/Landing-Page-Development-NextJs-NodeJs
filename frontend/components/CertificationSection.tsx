import React from "react";
import { Award, FileCheck, QrCode, ShoppingCart } from "lucide-react";
import OrderButton from "./OrderButton";

const CertificationSection = () => {
  const certifications = [
    {
      title: "ISO সার্টিফাইড",
      description: "আন্তর্জাতিক মান নিশ্চিতকরণ",
      icon: <Award className="text-[#F37021] w-8 h-8" />,
    },
    {
      title: "BSTI অনুমোদিত",
      description: "বাংলাদেশ স্ট্যান্ডার্ড অনুমোদিত",
      icon: <FileCheck className="text-[#F37021] w-8 h-8" />,
    },
    {
      title: "QR ভেরিফিকেশন",
      description: "অরিজিনাল প্রোডাক্ট যাচাই করুন",
      icon: <QrCode className="text-[#F37021] w-8 h-8" />,
    },
  ];

  return (
    <section className="py-4 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-3">
            সার্টিফিকেট ও অনুমোদন
          </h2>
          <p className="text-gray-500">
            আমাদের পণ্য বিভিন্ন মান নিয়ন্ত্রণ সংস্থা দ্বারা অনুমোদিত
          </p>
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] p-10 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow border border-orange-50/50"
            >
              {/* Icon Container */}
              <div className="bg-[#FFF5ED] p-5 rounded-2xl mb-6">
                {cert.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-[#333] mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-500 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default CertificationSection;
