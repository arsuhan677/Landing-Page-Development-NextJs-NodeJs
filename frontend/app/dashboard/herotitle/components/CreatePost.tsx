"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";

export default function CreateHero() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/hero", {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        rating: Number(formData.rating),
      });

      alert("Hero created successfully");

      setFormData({
        title: "",
        subtitle: "",
        description: "",
        price: "",
        discount: "",
        rating: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create hero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Hero Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Subtitle</Label>
          <Input
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Discount (%)</Label>
          <Input
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Rating</Label>
          <Input
            name="rating"
            type="number"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Add Hero"}
        </Button>
      </form>
    </CardContent>
  );
}
