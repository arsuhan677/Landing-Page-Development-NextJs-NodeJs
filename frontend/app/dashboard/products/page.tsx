// import React from "react";
// import { ProductCard } from "./components/ProductCard";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default async function page() {
//   const res = await fetch("http://localhost:5000/api/products");
//   const products = await res.json();
//   console.log("data", products);

//   return (
//     <div>
//       {products.map((product, id) => {
//         return <ProductCard product={product} key={id} />;
//       })}
//     <Button asChild>
//        <Link href="/admin/products/create">
//            Create Products
//        </Link>
//    </Button>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}

      <Link href="/dashboard/products/create">
        <Button>Create Products</Button>
      </Link>
    </div>
  );
}
