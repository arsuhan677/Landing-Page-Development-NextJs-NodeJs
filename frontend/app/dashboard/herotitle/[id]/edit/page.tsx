"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Hero } from "@/types/hero";

export default function EditHeroPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Hero | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hero/${id}`)
      .then((res) => setFormData(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/hero/${id}`, {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        rating: Number(formData.rating),
      });

      alert("Hero updated successfully");
      router.push("/dashboard/herotitle");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-center">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-4 max-w-xl">

      <div>
        <Label>Hero Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <Label>Subtitle</Label>
        <Input name="subtitle" value={formData.subtitle} onChange={handleChange} />
      </div>

      <div>
        <Label>Price</Label>
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Discount</Label>
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
        <Input name="image" value={formData.image} onChange={handleChange} />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <Button disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Hero"}
      </Button>
    </form>
  );
}
