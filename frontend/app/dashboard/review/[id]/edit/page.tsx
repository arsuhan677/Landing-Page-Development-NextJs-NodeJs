"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types/review";
import { CardContent } from "@/components/ui/card";

export default function EditReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Review | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/review/${id}`)
      .then((res) => setFormData(res.data)) // <-- corrected
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) =>
      p ? { ...p, [name]: name === "rating" ? parseFloat(value) : value } : p
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/review/${id}`, {
        ...formData,
      });

      alert("Review updated");
      router.push("/dashboard/review");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-center">Loading...</p>;

  return (
    <CardContent className="py-4">
      <div className="py-6">
        <h2 className="text-2xl font-bold">Update for review</h2>
        <p>this is update the review</p>
      </div>

    <form onSubmit={handleSubmit} className="mx-auto space-y-4 w-full">
      <div className="">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Textarea
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
        />
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

      <Button disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update review"}
      </Button>
    </form>
    </CardContent>
  );
}
