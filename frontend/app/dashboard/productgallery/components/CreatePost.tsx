"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";

export default function CreateGallery() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
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
      await axios.post("http://localhost:5000/api/productgallry", {
        ...formData,
      });

      alert("Gallery created successfully");

      setFormData({
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create hero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Image URL</Label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Add Hero"}
        </Button>
      </form>
    </CardContent>
  );
}
