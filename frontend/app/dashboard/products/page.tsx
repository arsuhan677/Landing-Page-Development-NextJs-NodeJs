"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { DeleteProductButton } from "./DeleteProductButton";

interface Product {
  id: string; 
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: boolean;
  description: string;
  is_active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <Image src={p.image} alt={p.name} width={40} height={40} className="rounded" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}
                </td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock ? "In Stock" : "Out of Stock"}</td>
                <td>{p.is_active ? "Active" : "Inactive"}</td>
                <td className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/products/${p.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteProductButton id={p.id} onDeleted={fetchProducts} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
