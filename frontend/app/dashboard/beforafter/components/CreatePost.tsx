"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { api } from "@/utils/api";

export default function CreateAfterBefor() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    before: "",
    after: "",
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
      await api.post("/afterbefor", formData);

      alert("After-Before entry created successfully");

      setFormData({
        before: "",
        after: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Before Image URL</Label>
          <Input
            name="before"
            value={formData.before}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>After Image URL</Label>
          <Input
            name="after"
            value={formData.after}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Add After-Before"}
        </Button>
      </form>
    </CardContent>
  );
}
