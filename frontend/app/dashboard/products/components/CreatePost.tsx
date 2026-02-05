"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";

export default function CreatePost() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    image: "",
    description: "",
    stock: true,
    is_active: true,
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
      await axios.post("http://localhost:5000/api/products", {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
      });

      alert("Product added successfully");

      setFormData({
        name: "",
        price: "",
        discount: "",
        image: "",
        description: "",
        stock: true,
        is_active: true,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Card className="max-w-xl mx-auto mt-10">
    //   <CardHeader>
    //     <CardTitle>Create Product</CardTitle>
    //   </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
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

          {/* Discount */}
          <div>
            <Label>Discount</Label>
            <Input
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div>
            <Label>Image URL</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Stock Option */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="stock"
              checked={formData.stock}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  stock: Boolean(checked),
                }))
              }
            />
            <Label
              htmlFor="stock"
              className={formData.stock ? "text-green-600" : "text-red-600"}
            >
              {formData.stock ? "In Stock" : "Out of Stock"}
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </CardContent>

  );
}
