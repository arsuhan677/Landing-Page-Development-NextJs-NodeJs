"use client";

import { Check, Star, MessageCircle, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import OrderButton from "./OrderButton";
import { api } from "@/utils/api";

type Hero = {
  id: string;
  title: string;
  subtitle: string;
  rating: string;
  description: string;
  image: string;
  price: number;
  discount?: number;
};

const ProductHero = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get("/hero");
        setHero(res.data[0] || null);
      } catch (error) {
        console.error("Hero fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!hero) {
    return <p className="text-center py-20 text-red-500">No product found</p>;
  }

  const discountedPrice = hero.discount
    ? Math.round(hero.price - (hero.price * hero.discount) / 100)
    : hero.price;

  return (
    <section className="min-h-[500px] flex items-center justify-center p-4 md:p-12 font-sans">
      <div className="container mx-auto px-0 lg:px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-28 items-center">
        {/* LEFT */}
        <div className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-[#333]">
              {hero.title} <br />
              <span className="text-[#F37021]">{hero.subtitle}</span>
            </h1>
          </header>

          {/* Benefits */}
          <ul className="space-y-3">
            {hero.description.split(",").map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700 font-medium"
              >
                <Check className="text-[#F37021] w-4 h-4" strokeWidth={3} />
                {benefit}
              </li>
            ))}
          </ul>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-gray-800">{hero.rating}/5</span>
          </div>

          {/* Pricing */}
          <div className="bg-white flex rounded-3xl w-full px-6 py-4 gap-4 shadow-sm">
            <span className="text-xl lg:text-3xl font-bold text-[#F37021]">
              ৳ {discountedPrice}
            </span>

            {hero.discount && (
              <>
                <span className="text-gray-400 line-through text-lg">
                  ৳ {hero.price}
                </span>
                <span className="bg-orange-100 text-[#F37021] px-3 py-1 rounded-full items-center justify-center flex text-sm font-bold">
                  {hero.discount}% ছাড়
                </span>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <OrderButton />

            <button className="bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all">
              <MessageCircle size={20} />
              WhatsApp এ কথা বলুন
            </button>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm italic">
            <Truck size={18} className="text-red-500" />
            দ্রুত ডেলিভারি • ৩-৫ দিনের মধ্যে
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center items-center">
          <div className="bg-white p-8 rounded-sm shadow-xl w-full max-w-lg aspect-square flex items-center justify-center animate-float">
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProductHero;
