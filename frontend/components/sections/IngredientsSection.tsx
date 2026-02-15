"use client"

import React, { useEffect, useState } from 'react';
import { Sun, Droplets, Leaf, FlaskConical, Sparkles, ShieldCheck, Beaker } from 'lucide-react';
import OrderButton from './OrderButton';
import { api } from '@/utils/api';

type Ingredient = {
  id: string;
  title: string;
  description: string;
};

const IngredientsSection = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const res = await api.get("/ingredient");
        // const data: Ingredient[] = await res.json();
        setIngredients(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      }
    };

    fetchIngredient();
  }, []);

  const icons = [
    <Sun className="text-[#F37021] w-6 h-6" />,
    <Droplets className="text-[#F37021] w-6 h-6" />,
    <Leaf className="text-[#F37021] w-6 h-6" />,
    <FlaskConical className="text-[#F37021] w-6 h-6" />,
    <Sparkles className="text-[#F37021] w-6 h-6" />,
  ];

  if (loading) return <p className="text-center py-10">Loading ingredients...</p>;

  return (
    <section id="উপাদান" className="py-4 lg:py-10">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-4">উপাদান</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            প্রিমিয়াম মানের উপাদান দিয়ে তৈরি, যা আপনার ত্বকের জন্য সম্পূর্ণ নিরাপদ
          </p>
        </div>

        {/* Ingredients Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-sm"
            >
              <div className="bg-[#FFF5ED] p-3 rounded-full mb-4">
                {icons[index % icons.length]} {/* Static icon */}
              </div>
              <h3 className="font-bold text-[#333] mb-1 text-sm">{ingredient.title}</h3>
              <p className="text-gray-500 text-[11px] leading-tight">{ingredient.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default IngredientsSection;
