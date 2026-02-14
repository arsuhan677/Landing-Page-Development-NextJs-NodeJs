"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";
import { api } from "@/utils/api";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Products</h2>
          <p className="text-sm">
            This is the all product collection's
          </p>
        </div>
        <div>
          <Link href="/dashboard/products/create">
            <Button>Create Products</Button>
          </Link>
        </div>
      </div>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}
