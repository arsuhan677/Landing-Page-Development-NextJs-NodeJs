import React from 'react';
import { ShoppingCart } from 'lucide-react';
import OrderButton from './OrderButton';

const ProductCollection = () => {
  const products = [
    {
      id: 1,
      name: "ভিটামিন সি সিরাম",
      price: 500,
      originalPrice: 1000,
      image: "/images/single.jpeg",
    },
    {
      id: 2,
      name: "হায়ালুরোনিক সিরাম",
      price: 650,
      originalPrice: 1200,
      image: "/images/single.jpeg",
    },
    {
      id: 3,
      name: "অ্যালোভেরা জেল",
      price: 450,
      originalPrice: 900,
      image: "/images/single.jpeg",
    },
    {
      id: 4,
      name: "নিয়াসিনামাইড সিরাম",
      price: 700,
      originalPrice: 1300,
      image: "/images/single.jpeg",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-3">
            প্রোডাক্ট কালেকশন
          </h2>
          <p className="text-gray-600">
            আমাদের সকল প্রোডাক্ট দেখুন এবং আপনার পছন্দের পণ্য বেছে নিন
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col items-center p-2"
            >
              {/* Product Image Wrapper */}
              <div className="bg-[#FFF5ED] w-full rounded-lg flex items-center justify-center p-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="w-full p-1 text-left">
                <h3 className="font-bold text-[#333] text-sm lg:text-lg mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg lg:text-xl font-bold text-[#F37021]">
                    ৳ {product.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ৳ {product.originalPrice}
                  </span>
                </div>

                {/* Card Button */}
                <button className="w-full bg-[#F37021] hover:bg-orange-600 text-white lg:font-bold py-2 lg:py-3 rounded-2xl transition-colors">
                  অর্ডার করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Button */}
        <OrderButton />
      </div>
    </section>
  );
};

export default ProductCollection;
