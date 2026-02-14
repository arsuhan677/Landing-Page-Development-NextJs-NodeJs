"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";

export default function CreateUsage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      await axios.post("http://localhost:5000/api/usageguideline", {
        ...formData,
      });

      alert("Usage created successfully");

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create usage");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label>Usages Title</Label>
          <Input className="mt-2" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea className="mt-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Add Usage"}
        </Button>
      </form>
    </CardContent>
  );
}
