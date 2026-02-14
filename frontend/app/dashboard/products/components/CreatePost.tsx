"use client";

import React, { useState } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";

interface ProductFormData {
  name: string;
  price: number | string;
  discount?: number | string;
  image: string;
  description: string;
  stock: boolean;
  is_active: boolean;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    discount: "",
    image: "",
    description: "",
    stock: true,
    is_active: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    field: "stock" | "is_active",
    value: boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
      });

      alert("Product added successfully!");

      setFormData({
        name: "",
        price: "",
        discount: "",
        image: "",
        description: "",
        stock: true,
        is_active: true,
      });
    } catch (error: any) {
      console.error("Failed to add product:", error);
      alert(error?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Discount</Label>
            <Input
              name="discount"
              type="number"
              value={formData.discount ?? ""}
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
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="stock"
            checked={formData.stock}
            onCheckedChange={(checked) =>
              handleCheckboxChange("stock", Boolean(checked))
            }
          />
          <Label
            htmlFor="stock"
            className={formData.stock ? "text-green-600" : "text-red-600"}
          >
            {formData.stock ? "In Stock" : "Out of Stock"}
          </Label>
        </div>

        {/* BTNN */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </CardContent>

    // <CardContent>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     {/* Product Name */}
    //     <div>
    //       <Label>Product Name</Label>
    //       <Input
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Price */}
    //     <div>
    //       <Label>Price</Label>
    //       <Input
    //         name="price"
    //         type="number"
    //         value={formData.price}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Discount */}
    //     <div>
    //       <Label>Discount</Label>
    //       <Input
    //         name="discount"
    //         type="number"
    //         value={formData.discount || ""}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     {/* Image */}
    //     <div>
    //       <Label>Image URL</Label>
    //       <Input
    //         name="image"
    //         value={formData.image}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Description */}
    //     <div>
    //       <Label>Description</Label>
    //       <Textarea
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     {/* Stock */}
    //     <div className="flex items-center gap-3">
    //       <Checkbox
    //         id="stock"
    //         checked={formData.stock}
    //         onCheckedChange={(checked) =>
    //           handleCheckboxChange("stock", Boolean(checked))
    //         }
    //       />
    //       <Label
    //         htmlFor="stock"
    //         className={formData.stock ? "text-green-600" : "text-red-600"}
    //       >
    //         {formData.stock ? "In Stock" : "Out of Stock"}
    //       </Label>
    //     </div>

    //     {/* btn*/}
    //     <Button type="submit" disabled={loading} className="w-full">
    //       {loading ? "Saving..." : "Add Product"}
    //     </Button>
    //   </form>
    // </CardContent>
  );
}
