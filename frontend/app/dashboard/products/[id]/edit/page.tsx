"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Product } from "@/types/types"; 
import { CardContent } from "@/components/ui/card";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setFormData(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => (p ? { ...p, [name]: value } : p));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : undefined,
      });

      alert("Product updated");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-center">Loading...</p>;

  return (
    <CardContent>
    <form onSubmit={handleSubmit} className="mx-auto space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="image">Image</Label>
        <Input id="image" name="image" value={formData.image} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="stock"
          checked={formData.stock}
          onCheckedChange={(v) =>
            setFormData((p) => (p ? { ...p, stock: Boolean(v) } : p))
          }
        />
        <Label htmlFor="stock">In Stock</Label>
      </div>

      <Button disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Product"}
      </Button>
    </form>
    </CardContent>
  );
}
