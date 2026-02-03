"use client"

import React, { useEffect, useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import OrderButton from './OrderButton';

type Review = {
  id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/review");
        const data: Review[] = await res.json();
        
        setReviews(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching review:", error);
        setLoading(false);
      }
    };

    fetchReview();
  }, []);

  if (loading) return <p className="text-center py-10">Loading reviews...</p>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header with Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">কাস্টমার রিভিউ</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-gray-700 font-bold">৪.৮/৫ রেটিং</span>
              <span className="text-gray-400 text-sm">(২৪৩০+ রিভিউ)</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-[#F37021] text-white px-6 py-2 rounded-full text-sm font-medium">সব রিভিউ</button>
            <button className="bg-white text-gray-600 px-6 py-2 rounded-full text-sm font-medium border border-gray-100">ফটো সহ</button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden flex flex-col">
              {/* Rating */}
              <div className="flex text-orange-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? "currentColor" : "none"} 
                    className={i < review.rating ? "" : "text-gray-200"}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                "{review.description}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-bold text-[#333]">{review.name}</h4>
                  <p className="text-gray-400 text-xs">{review.title}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                  <CheckCircle size={12} />
                  ভেরিফাইড
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <OrderButton />
      </div>
    </section>
  );
};

export default CustomerReviews;
