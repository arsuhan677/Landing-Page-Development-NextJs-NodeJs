import React from "react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import OrderButton from "./OrderButton";

const TrustIndicators = () => {
  const points = [
    { text: "১০০% অরিজিনাল প্রোডাক্ট গ্যারান্টি" },
    { text: "সারা দেশে ক্যাশ অন ডেলিভারি" },
    { text: "ফ্রি কুরিয়ার (৩-৫ দিন)" },
    { text: "২৪/৭ কাস্টমার সাপোর্ট" },
    { text: "ফেরত নীতি (৩ দিন)" },
    { text: "প্রিমিয়াম প্যাকেজিং" },
  ];

  return (
    <section className="bg-[#FFF5ED] py-4 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333]">
            কেন আমাদের থেকে কিনবেন
          </h2>
        </div>

        {/* White Card with Checklist */}
        <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {points.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#F37021] w-6 h-6 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-lg">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <OrderButton className="mt-8" />
      </div>
    </section>
  );
};

export default TrustIndicators;
