"use client";
import React, { useState } from 'react';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import OrderButton from './OrderButton';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "এটা কি সব ধরনের স্কিনে ব্যবহার করা যাবে?",
      answer: "হ্যাঁ, আমাদের Vitamin C Serum সব ধরনের স্কিনের জন্য উপযুক্ত। তবে সেনসিটিভ স্কিনের জন্য প্রথমে অল্প পরিমাণে প্যাচ টেস্ট করে নেওয়া ভালো।"
    },
    {
      question: "কত দিনে ফলাফল দেখতে পাবো?",
      answer: "নিয়মিত ব্যবহারে সাধারণত ২-৪ সপ্তাহের মধ্যে ত্বকের উজ্জ্বলতা এবং পরিবর্তন লক্ষ্য করা যায়।"
    },
    {
      question: "দিনে কয়বার ব্যবহার করব?",
      answer: "সেরা ফলাফলের জন্য প্রতিদিন রাতে একবার ব্যবহার করার পরামর্শ দেওয়া হয়।"
    },
    {
      question: "এটা কি প্রেগন্যান্সিতে নিরাপদ?",
      answer: "আমাদের পণ্য প্রাকৃতিক উপাদান দিয়ে তৈরি, তবে প্রেগন্যান্সির সময় যেকোনো নতুন প্রোডাক্ট ব্যবহারের আগে ডাক্তারের পরামর্শ নেয়া ভালো।"
    },
    {
      question: "ক্যাশ অন ডেলিভারি কি সারাদেশে আছে?",
      answer: "হ্যাঁ, আমরা সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি।"
    },
    {
      question: "অর্ডার করার পর কতদিনে ডেলিভারি পাবো?",
      answer: "ঢাকা সিটির ভেতরে ১-২ দিন এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে ডেলিভারি সম্পন্ন করা হয়।"
    },
    {
      question: "প্রোডাক্ট কি অরিজিনাল?",
      answer: "জি, আমরা ১০০% অরিজিনাল এবং সার্টিফাইড প্রোডাক্টের গ্যারান্টি দিচ্ছি।"
    }
  ];

  return (
    <section className="bg-[#FFF5ED] py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333] mb-2">FAQ</h2>
          <p className="text-gray-500">সচরাচর জিজ্ঞাসিত প্রশ্নাবলী</p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-orange-50/30"
              >
                <span className="font-bold text-[#333] md:text-lg">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`text-[#F37021] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <OrderButton className='mt-8' />
      </div>
    </section>
  );
};

export default FAQSection;