"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { AfterBefor } from "@/types/afterbefor";
import { api } from "@/utils/api";

export default function EditAfterBeforPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AfterBefor | null>(null);

  useEffect(() => {
    api
      .get(`/afterbefor/${id}`)
      .then((res) => setFormData(res.data))
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
      await api.put(`/afterbefor/${id}`, formData);

      alert("After-Before entry updated successfully");
      router.push("/dashboard/beforafter");
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
        <h2 className="text-2xl font-bold">Update After-Before Entry</h2>
        <p>Edit the before and after images for this entry</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Before Image URL</Label>
          <Input
            className="mt-2"
            name="before"
            value={formData.before}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>After Image URL</Label>
          <Input
            className="mt-2"
            name="after"
            value={formData.after}
            onChange={handleChange}
            required
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update After-Before"}
        </Button>
      </form>
    </CardContent>
  );
}
