"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderButton from "./OrderButton";

type Item = {
  id: string;
  before: string;
  after: string;
};

const BeforeAfterSection = () => {
  const [images, setImages] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/afterbefor");
        setImages(res.data); // <-- এখানেই fix
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <p className="text-center py-10">Loading images...</p>;

  return (
    <section className="py-2 lg:py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">
            Before/After
          </h2>
          <p className="text-gray-600 text-base">
            আমাদের সন্তুষ্ট গ্রাহকদের ফলাফল দেখুন
          </p>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-500">কোনো ছবি পাওয়া যায়নি</p>
        ) : (
          images.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-[2rem] shadow-sm mb-6"
            >
              <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[1.5rem]">
                {/* Before Image */}
                <div className="relative">
                  <img
                    src={item.before}
                    alt="Before"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    Before
                  </div>
                </div>

                {/* After Image */}
                <div className="relative">
                  <img
                    src={item.after}
                    alt="After"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#F37021]/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm font-bold">
                    After
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <p className="text-gray-500 text-sm mb-10">
          * ফলাফল ব্যক্তিভেদে পরিবর্তন হতে পারে
        </p>

        <OrderButton />
      </div>
    </section>
  );
};

export default BeforeAfterSection;
