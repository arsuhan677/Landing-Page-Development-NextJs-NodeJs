import React from "react";
import { ProductCard } from "./components/ProductCard";

export default async function page() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();
  console.log("data", products);

  return (
    <div>
      {products.map((product, id) => {
        return <ProductCard product={product} key={id} />;
      })}
    </div>
  );
}
