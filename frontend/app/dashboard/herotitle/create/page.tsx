"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateHeroPage() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    image: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Hero Created Successfully ✅");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Hero Section</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Title" onChange={handleChange} />
          <Input name="subtitle" placeholder="Subtitle" onChange={handleChange} />
          <Textarea name="description" placeholder="Description" onChange={handleChange} />
          <Input name="price" placeholder="Price" onChange={handleChange} />
          <Input name="discount" placeholder="Discount" onChange={handleChange} />
          <Input name="rating" placeholder="Rating" onChange={handleChange} />
          <Input name="image" placeholder="Image URL" onChange={handleChange} />

          <Button className="w-full">Save Hero</Button>
        </form>
      </CardContent>
    </Card>
  );
}
