"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";

export default function CreateReview() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    rating: "",
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
      await axios.post("http://localhost:5000/api/review", {
        ...formData,
      });

      alert("Review added successfully");

      setFormData({
        name: "",
        title: "",
        description: "",
        rating: "",
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
        <div>
          <Label>Review Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>title</Label>
          <Textarea
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
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

        {/* Submit */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Add Review"}
        </Button>
      </form>
    </CardContent>
  );
}
