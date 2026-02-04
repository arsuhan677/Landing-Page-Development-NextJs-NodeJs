"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/products";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: "0",
    discount: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product তৈরি সফল!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Create error:", error);
      alert("Product তৈরিতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/products")}
          className="mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-muted-foreground">নতুন Product যোগ করুন</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. REVO Vitamin C Glow Serum"
            required
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price (৳) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 577"
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Skincare, Furniture"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product এর বিস্তারিত বর্ণনা লিখুন"
            rows={4}
          />
        </div>

        {/* Image URL */}
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Rating */}
        <div>
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        {/* Discount */}
        <div>
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              তৈরি হচ্ছে...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </form>
    </div>
  );
}
