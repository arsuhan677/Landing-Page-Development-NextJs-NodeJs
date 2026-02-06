"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ingredient } from "@/types/ingredient";

export default function EditIngredientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Ingredient | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/ingredient/${id}`)
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
      await axios.put(`http://localhost:5000/api/ingredient/${id}`, {
        ...formData,
        // price: Number(formData.price),
        // discount: Number(formData.discount),
        // rating: Number(formData.rating),
      });

      alert("Ingredient updated successfully");
      router.push("/dashboard/ingredient");
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
        <Label>Ingredient Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />
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
        {loading ? "Updating..." : "Update Ingredient"}
      </Button>
    </form>
  );
}
