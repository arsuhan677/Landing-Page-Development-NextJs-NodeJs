"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Usage } from "@/types/usage";
import { CardContent } from "@/components/ui/card";

export default function EditIngredientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Usage | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/usageguideline/${id}`)
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
      await axios.put(`http://localhost:5000/api/usageguideline/${id}`, {
        ...formData,
      });

      alert("Usage updated successfully");
      router.push("/dashboard/usage");
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
      <div className="py-6"><h2 className="text-2xl font-bold">Update For Usage</h2></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Usages Title</Label>
          <Input className="mt-2"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea className="mt-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Ingredient"}
        </Button>
      </form>
    </CardContent>
  );
}
