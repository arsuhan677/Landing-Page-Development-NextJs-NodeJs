"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductGallery } from "@/types/gallery";
import { CardContent } from "@/components/ui/card";
import { api } from "@/utils/api";

export default function EditGalleryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductGallery | null>(null);

  useEffect(() => {
    api
      .get(`productgallry/${id}`)
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
      await api.put(`/productgallry/${id}`, {
        ...formData,
      });

      alert("Gallery updated successfully");
      router.push("/dashboard/productgallery");
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
      <div className="py-6">
        <h2 className="text-2xl font-bold">Update For Product Gallery</h2>
        <p>This is the prodduct gallaery page</p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Image URL</Label>
          <Input className="mt-2"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Gallery"}
        </Button>
      </form>
    </CardContent>
  );
}
