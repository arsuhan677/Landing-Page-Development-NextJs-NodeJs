"use client";
import React, { useEffect, useState } from "react";
import { Droplets, Clock, Sparkles, Moon } from "lucide-react";
import OrderButton from "./OrderButton";

const icons = [
  <Droplets className="text-[#F37021] w-8 h-8" />,
  <Clock className="text-[#F37021] w-8 h-8" />,
  <Sparkles className="text-[#F37021] w-8 h-8" />,
  <Moon className="text-[#F37021] w-8 h-8" />,
];

type Steps = {
  id: string;
  title: string;
  description: string;
};

const UsageSteps = () => {
  const [steps, setSteps] = useState<Steps[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/usageguideline")
      .then((res) => res.json())
      .then((data) => setSteps(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-[#FFF5ED] py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">
            ব্যবহার বিধি
          </h2>
          <p className="text-gray-500 text-base">
            সঠিক ফলাফলের জন্য নিচের ধাপগুলো অনুসরণ করুন
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12">
          {steps.map((steps, index) => (
            <div key={steps.id} className="relative pt-4">
              {/* Number Badge */}
              <div className="absolute top-0 left-6 z-10 bg-[#F37021] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                {/* Icon */}
                <div className="bg-[#FFF5ED] p-4 rounded-2xl mb-6">
                  {icons[index % icons.length]}
                </div>

                <h3 className="text-xl font-bold text-[#333] mb-3">
                  {steps.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {steps.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <OrderButton />
      </div>
    </section>
  );
};

export default UsageSteps;

