"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/types/gallery";
import GalleryPage from "./components/Gallery";

export default function GallaeryPage() {
  const [gallery, setGallery] = useState<ProductGallery[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch("http://localhost:5000/api/productgallry");
      const data: ProductGallery[] = await res.json();
      setGallery(data);
    };

    fetchGallery();
  }, []);

  return (
    <div className="space-y-4">
      {gallery.map((item) => (
        <GalleryPage productGallery={item} key={item.id} />
      ))}

      <Link href="/dashboard/productgallery/create">
        <Button>Add Product Gallery</Button>
      </Link>
    </div>
  );
}
