"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function EditHero() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch("http://localhost:5000/api/hero")
      .then(res => res.json())
      .then(data => setForm(data.find((h: any) => h.id === id)));
  }, [id]);

  const submit = async () => {
    await fetch(`http://localhost:5000/api/hero/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard/herotitle");
  };

  return (
    <div className="space-y-4 max-w-xl">
      <Input value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
      <Input value={form.subtitle || ""} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
      <Button onClick={submit}>Update</Button>
    </div>
  );
}
