"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";

import { Product } from "@/types/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [formData, setFormData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setFormData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleCheckboxChange = (
    field: "stock" | "is_active",
    value: boolean,
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      await api.put(`/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
      });

      alert("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (err: any) {
      console.error("Update failed:", err);
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-center mt-10">Loading product...</p>;

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
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </CardContent>
  );
}