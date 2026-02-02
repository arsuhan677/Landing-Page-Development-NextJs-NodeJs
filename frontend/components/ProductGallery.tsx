"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OrderButton from './OrderButton';

type Productimg = {
  id: string;
  image: string;
};

const ProductGallery = () => {
  const [products, setProducts] = useState<Productimg[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/productgallry");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center relative">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">প্রোডাক্ট গ্যালারি</h2>
          <p className="text-gray-500">আমাদের প্রিমিয়াম স্কিনকেয়ার প্রোডাকশন কালেকশন দেখুন</p>
        </div>

        {/* Slider Container */}
        <div className="relative group px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            navigation={{ nextEl: '.prev-btn', prevEl: '.next-btn' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-orange-50 aspect-square flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt="Product Image"
                      className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="next-btn absolute left-0 top-1/2 -translate-y-12 z-10 bg-white p-2 rounded-full shadow-md text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button className="prev-btn absolute right-0 top-1/2 -translate-y-12 z-10 bg-white p-2 rounded-full shadow-md text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
            <ChevronRight size={24} />
          </button>

          {/* Custom Pagination (Dots) */}
          <div className="custom-pagination flex justify-center gap-2 mt-4" />
        </div>

        {/* CTA Button */}
        <OrderButton className='mt-8' />
      </div>

      {/* Custom Styles for Pagination Dots */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background: #fdba74;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #F37021;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default ProductGallery;
