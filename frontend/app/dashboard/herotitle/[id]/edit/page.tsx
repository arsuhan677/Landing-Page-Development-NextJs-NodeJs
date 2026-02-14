"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Hero } from "@/types/hero";
import { CardContent } from "@/components/ui/card";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
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

  if (!formData) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <CardContent className="py-6">
      <h2 className="text-2xl font-bold">Update for hero title</h2>
      <p>this is update for the hero title</p>
      <form onSubmit={handleSubmit} className="space-y-4 w-full py-6">
        <div>
          <Label className="font-semibold">Hero Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="This is title"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="font-semibold">Subtitle</Label>
          <Input
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="This is subtitle"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="font-semibold">Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="font-semibold">Discount %</Label>
            <Input
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="font-semibold">Rating</Label>
            <Input
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="font-semibold">Image URL</Label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL here"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="font-semibold">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="This is description"
            className="mt-1 h-32 resize-none"
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update HeroTitle"}
        </Button>
      </form>
    </CardContent>
  );
}
