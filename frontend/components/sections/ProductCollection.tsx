"use client";

import { useEffect, useState } from "react";
import OrderButton from "./OrderButton";
  type Product = {
  id: string; 
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: boolean;
  description: string;
  is_active: boolean;
}

const ProductCollection = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        // Active products filter
        const activeProducts = data.filter(p => p.is_active);
        setProducts(activeProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-20">Loading products...</p>;

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
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center p-2"
            >
              {/* Product Image Wrapper */}
              <div className="bg-[#FFF5ED] w-full rounded-lg flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="w-full p-1 text-left">
                <h3 className="font-bold text-[#333] text-sm lg:text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg lg:text-xl font-bold text-[#F37021]">
                    ৳ {product.price - product.discount}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      ৳ {product.price}
                    </span>
                  )}
                </div>
                <p className={`mb-2 text-sm ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock ? "In Stock" : "Out of Stock"}
                </p>

                {/* Card Button */}
                <button
                  disabled={!product.stock}
                  className={`w-full ${
                    product.stock ? "bg-[#F37021] hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
                  } text-white lg:font-bold py-2 lg:py-3 rounded-2xl transition-colors cursor-pointer`}
                >
                  অর্ডার করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttn */}
        <OrderButton />
      </div>
    </section>
  );
};

export default ProductCollection;


