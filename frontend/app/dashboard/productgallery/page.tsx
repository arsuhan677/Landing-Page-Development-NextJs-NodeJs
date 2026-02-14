"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/types/gallery";
import GalleryPage from "./components/Gallery";
import { api } from "@/utils/api";

export default function GallaeryPage() {
  const [gallery, setGallery] = useState<ProductGallery[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/productgallry");
        setGallery(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Products Gallery</h2>
          <p className="text-sm">This is the all product gallery's</p>
        </div>
        <div>
          <Link href="/dashboard/productgallery/create">
            <Button>Add Product Gallery</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {gallery.map((item) => (
          <GalleryPage productGallery={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
